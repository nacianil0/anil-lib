Set-StrictMode -Version Latest

$script:RepoRoot = $null

function Write-Step {
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "[..] $Message" -ForegroundColor Cyan
}

function Write-Ok {
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "[UYARI] $Message" -ForegroundColor Yellow
}

function Write-Fail {
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "[HATA] $Message" -ForegroundColor Red
}

<#
.SYNOPSIS
    Depo kokunu bu modulun konumundan cozer (tools/lib -> tools -> repo root).
    Makineye ozel mutlak yol kullanmaz; temiz clone sonrasi da calisir.
#>
function Get-RepoRoot {
    if ($script:RepoRoot) { return $script:RepoRoot }

    $candidate = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
    $manifest = Join-Path $candidate "package.json"
    if (-not (Test-Path -LiteralPath $manifest)) {
        throw "Depo koku bulunamadi: '$manifest' yok. tools/ klasoru proje kokunde durmali."
    }

    $name = (Get-Content -LiteralPath $manifest -Raw | ConvertFrom-Json).name
    if ($name -ne "anil-lib-reader") {
        throw "Beklenmeyen paket adi '$name'. Bu tools klasoru anil-lib-reader icin yazildi."
    }

    $script:RepoRoot = $candidate
    return $script:RepoRoot
}

function Get-PackageVersion {
    $manifest = Join-Path (Get-RepoRoot) "package.json"
    return (Get-Content -LiteralPath $manifest -Raw | ConvertFrom-Json).version
}

<#
.SYNOPSIS
    package.json engines alanini karsilayan bir Node surumu var mi kontrol eder.
#>
function Assert-NodeRuntime {
    $node = Get-Command node -ErrorAction SilentlyContinue
    if (-not $node) {
        throw "Node.js bulunamadi. Node 20 veya ustunu kurun (https://nodejs.org)."
    }

    $raw = (& node --version)
    if ($LASTEXITCODE -ne 0) { throw "node --version calistirilamadi." }

    $major = [int]($raw.TrimStart('v').Split('.')[0])
    if ($major -lt 20) {
        throw "Node $raw bulundu; bu proje Node >=20 istiyor (package.json engines)."
    }

    Write-Ok "Node $raw"
}

<#
.SYNOPSIS
    Depoya sabitlenen pnpm surumunu (packageManager alani) calistirir.
    Once corepack denenir; boylece PATH'teki global pnpm surumu ne olursa olsun
    package.json'daki pnpm kullanilir. corepack yoksa PATH'teki pnpm'e duser.
#>
function Invoke-Pnpm {
    param(
        [Parameter(Mandatory)][string[]]$Arguments,
        [hashtable]$EnvironmentOverrides,
        [switch]$PassThruExitCode
    )

    $root = Get-RepoRoot
    $restore = @{}
    if ($EnvironmentOverrides) {
        foreach ($key in $EnvironmentOverrides.Keys) {
            $restore[$key] = [Environment]::GetEnvironmentVariable($key, 'Process')
            [Environment]::SetEnvironmentVariable($key, $EnvironmentOverrides[$key], 'Process')
        }
    }

    $previous = Get-Location
    try {
        Set-Location -LiteralPath $root

        # Native cikti Out-Host'a yonlendirilir; aksi halde fonksiyonun donus
        # degerine karisir ve cagiran taraf exit code yerine log satirlari alir.
        if (Get-Command corepack -ErrorAction SilentlyContinue) {
            & corepack pnpm @Arguments | Out-Host
        }
        elseif (Get-Command pnpm -ErrorAction SilentlyContinue) {
            Write-Warn "corepack bulunamadi; PATH'teki pnpm kullaniliyor (sabitlenen surumden farkli olabilir)."
            & pnpm @Arguments | Out-Host
        }
        else {
            throw "pnpm bulunamadi. Node 20+ ile gelen corepack'i etkinlestirin: corepack enable"
        }

        $code = $LASTEXITCODE
        if ($PassThruExitCode) { return $code }
        if ($code -ne 0) {
            throw "pnpm $($Arguments -join ' ') basarisiz oldu (exit code $code)."
        }
    }
    finally {
        Set-Location -LiteralPath $previous
        foreach ($key in $restore.Keys) {
            [Environment]::SetEnvironmentVariable($key, $restore[$key], 'Process')
        }
    }
}

function Get-PnpmVersion {
    if (Get-Command corepack -ErrorAction SilentlyContinue) {
        $value = (& corepack pnpm --version | Select-Object -Last 1)
        if ($LASTEXITCODE -eq 0 -and $value) { return $value.Trim() }
    }
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        $value = (& pnpm --version | Select-Object -Last 1)
        if ($LASTEXITCODE -eq 0 -and $value) { return $value.Trim() }
    }
    return "bilinmiyor"
}

<#
.SYNOPSIS
    node_modules yoksa veya pnpm-lock.yaml daha yeniyse bagimliliklari kurar.
    Lockfile ile package.json uyusmazsa --frozen-lockfile acikca hata verir.
#>
function Install-ProjectDependencies {
    $root = Get-RepoRoot
    $stamp = Join-Path $root "node_modules\.modules.yaml"
    $lock = Join-Path $root "pnpm-lock.yaml"

    $needsInstall = $true
    if ((Test-Path -LiteralPath $stamp) -and (Test-Path -LiteralPath $lock)) {
        $lockTime = (Get-Item -LiteralPath $lock).LastWriteTimeUtc
        $stampTime = (Get-Item -LiteralPath $stamp).LastWriteTimeUtc
        $needsInstall = $lockTime -gt $stampTime
    }

    if ($needsInstall) {
        Write-Step "Bagimliliklar kuruluyor (pnpm install --frozen-lockfile)"
        Invoke-Pnpm -Arguments @("install", "--frozen-lockfile")
        Write-Ok "Bagimliliklar hazir"
    }
    else {
        Write-Ok "Bagimliliklar guncel (node_modules)"
    }
}

function Get-DevPort {
    param([int]$Port = 0)
    if ($Port -gt 0) { return $Port }
    if ($env:PORT -and ($env:PORT -as [int])) { return [int]$env:PORT }
    return 3000
}

<#
.SYNOPSIS
    Verilen portu dinleyen surecleri dondurur. Bos sonuc = port musait.
#>
function Get-PortListener {
    param([Parameter(Mandatory)][int]$Port)

    $owners = @()
    try {
        $owners = @(Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction Stop |
            Select-Object -ExpandProperty OwningProcess -Unique)
    }
    catch {
        # Get-NetTCPConnection yoksa netstat'a dus.
        $netstatLines = @(& netstat -ano -p tcp | Select-String -Pattern "LISTENING" |
            Select-String -Pattern (":" + $Port + "\s"))
        foreach ($line in $netstatLines) {
            $parts = ($line.ToString().Trim() -split "\s+")
            if ($parts.Length -ge 5) { $owners += [int]$parts[$parts.Length - 1] }
        }
        $owners = @($owners | Select-Object -Unique)
    }

    $result = @()
    foreach ($owner in $owners) {
        if (-not $owner -or $owner -eq 0) { continue }
        $proc = Get-Process -Id $owner -ErrorAction SilentlyContinue
        if ($proc) { $result += $proc }
    }
    return $result
}

<#
.SYNOPSIS
    Depo koku altinda kalan ve adi beklenen listede olan bir klasoru siler.
    Kok disina veya beklenmeyen bir hedefe silme yapmaz.
#>
function Remove-BuildPath {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][string[]]$AllowedLeaf
    )

    if (-not (Test-Path -LiteralPath $Path)) { return }

    $full = (Resolve-Path -LiteralPath $Path).Path
    $root = (Get-RepoRoot).TrimEnd('\')
    if (-not $full.StartsWith($root + '\', [StringComparison]::OrdinalIgnoreCase)) {
        throw "Guvenlik: '$full' depo koku disinda, silinmedi."
    }
    $leaf = Split-Path -Leaf $full
    if ($AllowedLeaf -notcontains $leaf) {
        throw "Guvenlik: '$leaf' silinebilir hedefler arasinda degil, silinmedi."
    }

    Remove-Item -LiteralPath $full -Recurse -Force -ErrorAction Stop
}

<#
.SYNOPSIS
    Artifact icine yazilacak kisa surum bilgisi (secret icermez).
#>
function Get-GitDescription {
    $root = Get-RepoRoot
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { return "git yok" }

    $sha = (& git -C $root rev-parse --short HEAD)
    if ($LASTEXITCODE -ne 0 -or -not $sha) { return "git bilgisi okunamadi" }

    $branch = (& git -C $root rev-parse --abbrev-ref HEAD)
    $dirty = @(& git -C $root status --porcelain)
    $suffix = ""
    if ($dirty.Count -gt 0) { $suffix = " (dirty)" }
    return ($branch.Trim() + "@" + $sha.Trim() + $suffix)
}

Export-ModuleMember -Function Write-Step, Write-Ok, Write-Warn, Write-Fail, Get-RepoRoot,
    Get-PackageVersion, Assert-NodeRuntime, Invoke-Pnpm, Get-PnpmVersion,
    Install-ProjectDependencies, Get-DevPort, Get-PortListener, Remove-BuildPath, Get-GitDescription

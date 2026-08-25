<#
.SYNOPSIS
    anil-lib-reader'i localde gelistirme modunda baslatir (next dev).

.DESCRIPTION
    Sirayla: Node surumu -> bagimliliklar -> ortam degiskeni kontrolu ->
    port kontrolu -> next dev. Herhangi bir adim basarisiz olursa script
    sifirdan farkli exit code ile biter; hata gizlenmez.

.PARAMETER Port
    Dev sunucusunun portu. Varsayilan: PORT ortam degiskeni, yoksa 3000.

.PARAMETER NoBrowser
    Sunucu ayaga kalkinca tarayiciyi acma.
#>
[CmdletBinding()]
param(
    [int]$Port = 0,
    [switch]$NoBrowser
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Import-Module (Join-Path $PSScriptRoot "Common.psm1") -Force -DisableNameChecking

$browserJob = $null

try {
    $root = Get-RepoRoot
    Write-Host ""
    Write-Host "anil-lib-reader - Dev" -ForegroundColor White
    Write-Host "Proje: $root"
    Write-Host ""

    Assert-NodeRuntime
    Install-ProjectDependencies

    # Sifre kapisi ve Neon senkronu ortam degiskenlerine bagli. Dev'de bunlar
    # zorunlu degil (middleware production disinda acik gecer), ama eksikse
    # davranis farkli olur; sessizce gecmek yerine uyar.
    $envFiles = @(".env.local", ".env.development.local", ".env")
    $hasEnv = $false
    foreach ($file in $envFiles) {
        if (Test-Path -LiteralPath (Join-Path $root $file)) { $hasEnv = $true; break }
    }
    if (-not $hasEnv) {
        Write-Warn "Local env dosyasi yok (.env.local). Sifre kapisi ve Neon senkronu devre disi calisir."
        Write-Warn "Gerekirse .env.example dosyasini .env.local olarak kopyalayip degerleri doldurun."
    }
    else {
        Write-Ok "Local env dosyasi bulundu"
    }

    $devPort = Get-DevPort -Port $Port
    $listeners = @(Get-PortListener -Port $devPort)
    if ($listeners.Count -gt 0) {
        $describe = ($listeners | ForEach-Object { "$($_.ProcessName) (PID $($_.Id))" }) -join ", "
        throw "Port $devPort zaten kullanimda: $describe. Once tools\dev\00-Dev-Durdur.cmd calistirin veya -Port ile baska port verin."
    }
    Write-Ok "Port $devPort musait"

    $url = "http://localhost:$devPort"

    if (-not $NoBrowser) {
        # Sunucu cevap verene kadar bekleyip tarayiciyi acan kisa omurlu job.
        # Job bu PowerShell surecine bagli; konsol kapaninca birlikte biter.
        $browserJob = Start-Job -ScriptBlock {
            param($targetUrl)
            for ($i = 0; $i -lt 120; $i++) {
                Start-Sleep -Milliseconds 500
                try {
                    Invoke-WebRequest -Uri $targetUrl -UseBasicParsing -TimeoutSec 3 -MaximumRedirection 0 | Out-Null
                    Start-Process $targetUrl
                    return
                }
                catch {
                    $response = $null
                    if ($_.Exception.PSObject.Properties.Name -contains "Response") {
                        $response = $_.Exception.Response
                    }
                    if ($response) { Start-Process $targetUrl; return }
                }
            }
        } -ArgumentList $url
    }

    Write-Host ""
    Write-Step "next dev baslatiliyor -> $url"
    Write-Host "Durdurmak icin Ctrl+C." -ForegroundColor DarkGray
    Write-Host ""

    # Ctrl+C ile kapatmak normal bir cikis; sadece gercek hata kodlarinda fail et.
    $code = Invoke-Pnpm -Arguments @("dev", "--port", "$devPort") -PassThruExitCode

    Write-Host ""
    if ($code -eq 0 -or $code -eq 130 -or $code -eq 3221225786) {
        Write-Ok "Dev sunucusu kapandi."
        exit 0
    }

    Write-Fail "Dev sunucusu hata ile kapandi (exit code $code)."
    exit $code
}
catch {
    Write-Host ""
    Write-Fail $_.Exception.Message
    exit 1
}
finally {
    if ($browserJob) {
        Stop-Job -Job $browserJob -ErrorAction SilentlyContinue
        Remove-Job -Job $browserJob -Force -ErrorAction SilentlyContinue
    }
}

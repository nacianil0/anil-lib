<#
.SYNOPSIS
    anil-lib-reader icin production build alir, dagitilabilir bir paket
    olusturur ve zipler.

.DESCRIPTION
    Akis: temizlik -> kalite kapilari -> next build -> paketleme ->
    dogrulama (dosya butunlugu + gercek boot smoke) -> zip.

    Eski cikti paketlenmesin diye `.next` ve staging klasoru her calismada
    silinir; build sonrasi ciktinin bu calismada uretildigi zaman damgasiyla
    dogrulanir. Herhangi bir adim basarisiz olursa script sifirdan farkli exit
    code ile biter ve zip uretilmez.

.PARAMETER SkipChecks
    typecheck ve lint kapilarini atla (yalnizca build).

.PARAMETER StrictLint
    lint hatasini publish'i durduran hata say. Varsayilan olarak lint ciktisi
    gosterilir ama publish'i durdurmaz: proje `next build` sirasinda ESLint'i
    zaten devre disi birakiyor (next.config.mjs eslint.ignoreDuringBuilds),
    yani lint ayri bir kalite kapisi, build dogrulugunun parcasi degil.

.PARAMETER NoSmoke
    Build ciktisini gercekten baslatip HTTP ile dogrulama adimini atla.

.PARAMETER NoZip
    Zip uretme; yalnizca staging klasorunu birak.

.PARAMETER OutputRoot
    Cikti klasoru. Varsayilan: <proje>\artifacts
#>
[CmdletBinding()]
param(
    [switch]$SkipChecks,
    [switch]$StrictLint,
    [switch]$NoSmoke,
    [switch]$NoZip,
    [string]$OutputRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Import-Module (Join-Path $PSScriptRoot "Common.psm1") -Force -DisableNameChecking

function Get-FreeLoopbackPort {
    for ($port = 3900; $port -le 3999; $port++) {
        if (@(Get-PortListener -Port $port).Count -eq 0) { return $port }
    }
    throw "Smoke testi icin 3900-3999 araliginda bos port bulunamadi."
}

<#
.SYNOPSIS
    Uretilen build ciktisini gercekten `next start` ile baslatip dogrular.
.DESCRIPTION
    Depo kokunde calisir; paketlenen `.next` ciktisinin aynisini kullanir.
    Ortam degiskeni verilmedigi icin uygulama kapali modda acilir ve tum
    istekleri /login'e yonlendirir; /login'in 200 donmesi ve sayfanin
    refere ettigi statik varligin servis edilmesi, ciktinin calisir
    oldugunu gosterir.
#>
function Invoke-SmokeTest {
    param(
        [Parameter(Mandatory)][string]$Root,
        [Parameter(Mandatory)][string]$LogDir
    )

    $nextBin = Join-Path $Root "node_modules\next\dist\bin\next"
    if (-not (Test-Path -LiteralPath $nextBin)) {
        throw "next calistirilabiliri bulunamadi: $nextBin"
    }

    $port = Get-FreeLoopbackPort
    $outLog = Join-Path $LogDir "smoke-stdout.log"
    $errLog = Join-Path $LogDir "smoke-stderr.log"
    $baseUrl = "http://127.0.0.1:$port"

    $server = $null
    try {
        $server = Start-Process -FilePath "node" `
            -ArgumentList @($nextBin, "start", "--hostname", "127.0.0.1", "--port", "$port") `
            -WorkingDirectory $Root -PassThru -NoNewWindow `
            -RedirectStandardOutput $outLog -RedirectStandardError $errLog

        $loginHtml = $null
        for ($i = 0; $i -lt 60; $i++) {
            if ($server.HasExited) {
                throw "Build ciktisi baslatilamadi: next start exit code $($server.ExitCode). Log: $errLog"
            }
            Start-Sleep -Milliseconds 500
            try {
                $response = Invoke-WebRequest -Uri "$baseUrl/login" -UseBasicParsing -TimeoutSec 5
                if ($response.StatusCode -eq 200) { $loginHtml = $response.Content; break }
            }
            catch {
                # Sunucu henuz hazir degil; dongu devam etsin.
            }
        }

        if (-not $loginHtml) {
            throw "Cikti 30 saniyede $baseUrl/login adresine 200 donmedi. Log: $errLog"
        }
        Write-Ok "Smoke: GET /login -> 200"

        # Sayfanin refere ettigi ilk statik varligi da iste; bu, .next/static
        # ciktisinin gercekten servis edildigini dogrular.
        $assetMatch = [regex]::Match($loginHtml, '/_next/static/[^"'']+')
        if (-not $assetMatch.Success) {
            throw "Login HTML'inde /_next/static varligi bulunamadi; statik cikti eksik olabilir."
        }
        $asset = Invoke-WebRequest -Uri "$baseUrl$($assetMatch.Value)" -UseBasicParsing -TimeoutSec 10
        if ($asset.StatusCode -ne 200) {
            throw "Statik varlik $($assetMatch.Value) -> $($asset.StatusCode)."
        }
        Write-Ok "Smoke: statik varlik servis ediliyor"
    }
    finally {
        if ($server -and -not $server.HasExited) {
            Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
        }
    }
}

try {
    $root = Get-RepoRoot
    $version = Get-PackageVersion
    $stamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
    $startedUtc = (Get-Date).ToUniversalTime()
    $lintFailed = $false

    if (-not $OutputRoot -or $OutputRoot.Trim().Length -eq 0) {
        $OutputRoot = Join-Path $root "artifacts"
    }
    $stage = Join-Path $OutputRoot "latest"
    $nextDir = Join-Path $root ".next"

    Write-Host ""
    Write-Host "anil-lib-reader - Publish + Zip" -ForegroundColor White
    Write-Host "Proje  : $root"
    Write-Host "Surum  : $version ($(Get-GitDescription))"
    Write-Host "Cikti  : $OutputRoot"
    Write-Host ""

    Assert-NodeRuntime
    Install-ProjectDependencies

    # 1) Temizlik: eski build veya eski paket asla yeni zipe sizmasin.
    Write-Step "Onceki cikti temizleniyor"
    Remove-BuildPath -Path $nextDir -AllowedLeaf @(".next")
    Remove-BuildPath -Path $stage -AllowedLeaf @("latest")
    New-Item -ItemType Directory -Path $stage -Force | Out-Null
    Write-Ok "Temizlik tamam"

    # 2) Kalite kapilari.
    if ($SkipChecks) {
        Write-Warn "typecheck/lint atlandi (-SkipChecks)."
    }
    else {
        Write-Step "typecheck"
        Invoke-Pnpm -Arguments @("typecheck")
        Write-Ok "typecheck gecti"

        Write-Step "lint"
        $lintCode = Invoke-Pnpm -Arguments @("lint") -PassThruExitCode
        if ($lintCode -eq 0) {
            Write-Ok "lint gecti"
        }
        elseif ($StrictLint) {
            throw "lint basarisiz (exit code $lintCode) ve -StrictLint verildi."
        }
        else {
            $lintFailed = $true
            Write-Warn "lint basarisiz (exit code $lintCode). Build ESLint'e bagli olmadigi icin publish devam ediyor."
            Write-Warn "Bloklamasini istiyorsaniz -StrictLint ile calistirin."
        }
    }

    # 3) Production build.
    Write-Step "production build (next build)"
    Invoke-Pnpm -Arguments @("build")

    $buildId = Join-Path $nextDir "BUILD_ID"
    $staticDir = Join-Path $nextDir "static"
    if (-not (Test-Path -LiteralPath $buildId)) { throw "Build ciktisi eksik: $buildId yok." }
    if (-not (Test-Path -LiteralPath $staticDir)) { throw "Build ciktisi eksik: $staticDir yok." }
    if ((Get-Item -LiteralPath $buildId).LastWriteTimeUtc -lt $startedUtc) {
        throw "Build ciktisi bu calismadan eski gorunuyor; bayat cikti paketlenmeyecek."
    }
    Write-Ok "Build tamam"

    # 4) Dogrulama once: paketlenecek cikti gercekten calisiyor mu?
    if ($NoSmoke) {
        Write-Warn "Boot smoke testi atlandi (-NoSmoke)."
    }
    else {
        Write-Step "Build ciktisi baslatilip dogrulaniyor"
        Invoke-SmokeTest -Root $root -LogDir $OutputRoot
    }

    # 5) Paketleme.
    Write-Step "Paket hazirlaniyor"
    Copy-Item -Path $nextDir -Destination $stage -Recurse -Force
    # Derleyici onbellegi paketin isine yaramaz ve zipi gereksiz sisirir.
    Remove-BuildPath -Path (Join-Path $stage ".next\cache") -AllowedLeaf @("cache")

    # Icerik katmani calisma aninda process.cwd()/content altindan okunur.
    Copy-Item -Path (Join-Path $root "content") -Destination $stage -Recurse -Force

    $publicDir = Join-Path $root "public"
    if (Test-Path -LiteralPath $publicDir) {
        Copy-Item -Path $publicDir -Destination $stage -Recurse -Force
    }

    # Calistirmak icin gereken manifest ve config dosyalari (secret icermez).
    foreach ($file in @("package.json", "pnpm-lock.yaml", "next.config.mjs", ".env.example")) {
        Copy-Item -Path (Join-Path $root $file) -Destination $stage -Force
    }

    $release = @(
        "anil-lib-reader",
        "surum      : $version",
        "git        : $(Get-GitDescription)",
        "build (UTC): $($startedUtc.ToString('yyyy-MM-dd HH:mm:ss'))",
        "node       : $(& node --version)",
        "pnpm       : $(Get-PnpmVersion)",
        "",
        "Calistirma:",
        "  1. corepack pnpm install --prod --frozen-lockfile",
        "  2. .env.example icindeki degiskenleri ortama verin",
        "     (DATABASE_URL, SITE_PASSWORD_SHA256, AUTH_COOKIE_SECRET).",
        "  3. corepack pnpm start",
        "",
        "Not: SITE_PASSWORD_SHA256 ve AUTH_COOKIE_SECRET yoksa uygulama",
        "production modunda kapali kalir ve tum istekleri /login'e yonlendirir."
    )
    Set-Content -LiteralPath (Join-Path $stage "RELEASE.txt") -Value $release -Encoding utf8
    Write-Ok "Paket hazirlandi: $stage"

    # 6) Paket butunlugu.
    Write-Step "Paket dogrulaniyor"
    $required = @(".next\BUILD_ID", ".next\static", "package.json", "pnpm-lock.yaml",
        "next.config.mjs", "content\catalog.json")
    foreach ($item in $required) {
        if (-not (Test-Path -LiteralPath (Join-Path $stage $item))) {
            throw "Pakette eksik: $item"
        }
    }
    if (@(Get-ChildItem -LiteralPath (Join-Path $stage ".next\static") -Recurse -File).Count -eq 0) {
        throw "Pakette .next\static bos."
    }

    $catalog = Get-Content -LiteralPath (Join-Path $stage "content\catalog.json") -Raw | ConvertFrom-Json
    $missing = @()
    foreach ($article in $catalog.articles) {
        if (-not (Test-Path -LiteralPath (Join-Path $stage $article.path))) { $missing += $article.path }
    }
    if ($missing.Count -gt 0) {
        throw "Katalogdaki $($missing.Count) icerik dosyasi pakette yok: $($missing[0]) ..."
    }
    Write-Ok "Paket dogrulandi ($($catalog.articles.Count) icerik dosyasi)"

    # 7) Zip.
    $zipPath = $null
    if ($NoZip) {
        Write-Warn "Zip uretilmedi (-NoZip)."
    }
    else {
        $zipPath = Join-Path $OutputRoot "anil-lib-reader-$version-$stamp.zip"
        Write-Step "Zip olusturuluyor"
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::CreateFromDirectory(
            $stage, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)
        $sizeMb = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 1)
        Write-Ok "Zip hazir ($sizeMb MB)"
    }

    Write-Host ""
    Write-Ok "Publish tamamlandi."
    if ($lintFailed) { Write-Warn "lint kapisi basarisizdi; cikti dogrulandi ama lint hatalari duruyor." }
    Write-Host "  Paket: $stage"
    if ($zipPath) { Write-Host "  Zip  : $zipPath" }
    Write-Host ""
    exit 0
}
catch {
    Write-Host ""
    Write-Fail $_.Exception.Message
    Write-Fail "Publish basarisiz; zip uretilmedi."
    exit 1
}

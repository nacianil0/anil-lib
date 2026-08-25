<#
.SYNOPSIS
    Dev portunu tutan Node surecini durdurur.

.DESCRIPTION
    Konsol kapatilinca arkada kalan next dev sureci portu tutmaya devam
    edebiliyor. Bu script yalnizca verilen portu DINLEYEN ve adi node olan
    surecleri durdurur; baska surecleri hedef almaz.

.PARAMETER Port
    Temizlenecek port. Varsayilan: PORT ortam degiskeni, yoksa 3000.
#>
[CmdletBinding()]
param(
    [int]$Port = 0
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Import-Module (Join-Path $PSScriptRoot "Common.psm1") -Force -DisableNameChecking

try {
    $devPort = Get-DevPort -Port $Port
    $listeners = @(Get-PortListener -Port $devPort)

    if ($listeners.Count -eq 0) {
        Write-Ok "Port $devPort zaten bos."
        exit 0
    }

    $stopped = 0
    foreach ($proc in $listeners) {
        if ($proc.ProcessName -notin @("node", "node.exe")) {
            Write-Warn "PID $($proc.Id) ($($proc.ProcessName)) node degil; dokunulmadi."
            continue
        }
        Write-Step "Durduruluyor: $($proc.ProcessName) (PID $($proc.Id))"
        Stop-Process -Id $proc.Id -Force -ErrorAction Stop
        $stopped++
    }

    if ($stopped -eq 0) {
        throw "Port $devPort baska bir uygulama tarafindan tutuluyor; elle kontrol edin."
    }

    Start-Sleep -Milliseconds 500
    if (@(Get-PortListener -Port $devPort).Count -gt 0) {
        throw "Port $devPort hala mesgul."
    }

    Write-Ok "Port $devPort serbest ($stopped surec durduruldu)."
    exit 0
}
catch {
    Write-Host ""
    Write-Fail $_.Exception.Message
    exit 1
}

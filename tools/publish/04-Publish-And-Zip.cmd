@echo off
setlocal EnableExtensions
title anil-lib-reader - Publish + Zip
:: shift, %~dp0'i da kaydirdigi icin script dizini once sabitlenir.
set "TOOLS_DIR=%~dp0.."
:: "nopause" yalnizca bu pencerenin sonundaki pause icindir; PowerShell
:: scriptine iletilmez. Diger argumanlar aynen aktarilir.
set "PASSTHRU="
set "NOPAUSE="
:parse
if "%~1"=="" goto :run
if /i "%~1"=="nopause" (set "NOPAUSE=1") else (set "PASSTHRU=%PASSTHRU% %1")
shift
goto :parse
:run
powershell -NoProfile -ExecutionPolicy Bypass -File "%TOOLS_DIR%\lib\Invoke-Publish.ps1" %PASSTHRU%
set "COMMAND_EXIT=%ERRORLEVEL%"
if not "%COMMAND_EXIT%"=="0" echo [HATA] Publish basarisiz. Exit code: %COMMAND_EXIT%
if not defined NOPAUSE pause
exit /b %COMMAND_EXIT%

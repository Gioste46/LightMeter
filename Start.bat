@echo off

:: Check if electron.exe is running
tasklist /FI "IMAGENAME eq electron.exe" | findstr /i /c:"electron.exe" > nul

:: If electron.exe is not running, start npm start silently
if errorlevel 1 (
    cd /d "%~dp0"
    powershell -WindowStyle Hidden -Command "Start-Process npm -ArgumentList 'start' -NoNewWindow -WorkingDirectory '%CD%'"
)

exit /b

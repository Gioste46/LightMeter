@echo off

:check_electron
for /f "tokens=3 delims=" %%a in ('wmic process get name /format:list') do (
  if /i "!%%a!" == "electron.exe" goto :electron_running
)
echo Electron is not running. Starting application...
if errorlevel 1 echo Error starting application: %errorlevel%
npm start
goto :done

:electron_running
echo Electron is already running.

:done
echo Done.
pause
endlocal

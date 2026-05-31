@echo off
title The Paddock
cd /d "%~dp0"

echo The Paddock
echo ===========
echo.
echo This window runs the local game server.
echo Keep it open while you play.
echo.
echo When the server says "Local:", open this link:
echo http://127.0.0.1:5180/ThePaddockV2/
echo.
echo Starting now...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:5180/ThePaddockV2/' -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if %errorlevel%==0 (
  echo The game server is already running.
  echo Open or refresh:
  echo http://127.0.0.1:5180/ThePaddockV2/
  echo.
  start "" "http://127.0.0.1:5180/ThePaddockV2/"
  pause
  exit /b 0
)

"C:\Program Files\nodejs\npm.cmd" run dev:paddock

echo.
echo The game server stopped.
echo If there is an error above, send it to Codex.
pause

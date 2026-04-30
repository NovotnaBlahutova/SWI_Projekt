@echo off
title Boujee Eshop Starter
echo ==================================================
echo   🚀 Startuji Boujee Eshop (Windows verze)
echo ==================================================

REM 1. Kontrola Javy
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 goto NOJAVA

REM 2. Kontrola Node.js
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 goto NONODE

REM 3. Instalace frontend zavislosti
if not exist "frontend\node_modules\" (
    echo [INFO] Instaluji frontend zavislosti...
    cd frontend && call npm install && cd ..
)

REM 4. Kontrola portu 3306
netstat -an | findstr :3306 >nul
if %ERRORLEVEL% NEQ 0 (
    echo [VAROVANI] Na portu 3306 nic nebezi. Zapni MySQL!
    pause
)

REM 5. SPUSTENI
echo [INFO] Startuji Backend a Frontend...
start "Boujee BACKEND" cmd /c "cd backend && mvn spring-boot:run"
start "Boujee FRONTEND" cmd /c "cd frontend && npm run dev"

echo ==================================================
echo   ✨ Hotovo! Sleduj nove otevrena okna.
echo ==================================================
goto END

:NOJAVA
echo [CHYBA] Java neni nainstalovana nebo neni v PATH.
pause
exit /b

:NONODE
echo [CHYBA] Node.js neni nainstalovan.
pause
exit /b

:END

@echo off
chcp 65001 >nul
title Bela Lekkol - Deploiement Hostinger - blmlecolefrancaise.com
color 0A

echo.
echo ================================================================
echo  BELA LEKKOL MONTESSORI - DEPLOIEMENT HOSTINGER
echo  blmlecolefrancaise.com
echo ================================================================
echo.

cd /d "%~dp0"

REM ── Suppression verrou git si present ────────────────────────
if exist ".git\index.lock" (
    echo [INFO] Suppression du verrou git...
    del /f ".git\index.lock" 2>nul
)

REM ── ETAPE 1 : Git add + commit + push ────────────────────────
echo [1/3] Mise a jour GitHub (push)...
git add -A
git diff --cached --quiet
if %errorlevel% neq 0 (
    git commit -m "deploy: mise a jour site BLM - %date% %time:~0,5%"
)
git push origin master 2>nul
if %errorlevel% == 0 (
    echo [OK] GitHub mis a jour.
) else (
    echo [INFO] Push GitHub ignore - continuez vers Hostinger.
)
echo.

REM ── ETAPE 2 : Build Vite (si node_modules present) ───────────
echo [2/3] Build du site...
if exist "node_modules\.bin\vite" (
    call npm run build
    if errorlevel 1 (
        echo [AVERTISSEMENT] Build Vite echoue - utilisation du dist/ existant.
    ) else (
        echo [OK] Build reussi !
    )
) else (
    echo [INFO] node_modules absent - utilisation du dist/ existant.
    echo       Pour un build frais, executez d abord : npm install
)
echo.

REM ── ETAPE 3 : Ouvrir dist + Hostinger ────────────────────────
echo [3/3] Ouverture dist/ et Hostinger...
explorer "%~dp0dist"
start "" "https://hpanel.hostinger.com/hosting/blmlecolefrancaise.com/file-manager"
echo.
echo ================================================================
echo  INSTRUCTIONS UPLOAD HOSTINGER
echo ================================================================
echo.
echo  Le dossier dist\ et le gestionnaire Hostinger sont ouverts.
echo.
echo  DANS HOSTINGER GESTIONNAIRE DE FICHIERS :
echo  1. Allez dans public_html/
echo  2. Selectionnez TOUT et supprimez (sauf .htaccess si present)
echo  3. Cliquez sur Upload
echo  4. Selectionnez TOUT le contenu du dossier dist\
echo     (CTRL+A dans l explorateur, glisser-deposer)
echo.
echo  OU par FTP (FileZilla) :
echo    Hote    : ftp.blmlecolefrancaise.com
echo    Dossier : /public_html/
echo    Source  : %~dp0dist\
echo.
echo  Verification : https://blmlecolefrancaise.com
echo ================================================================
echo.
pause

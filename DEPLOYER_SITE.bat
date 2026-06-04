@echo off
chcp 65001 >nul
title DEPLOIEMENT BELA LEKKOL - GitHub - blmlecolefrancaise.com

echo.
echo  ================================================================
echo  DEPLOIEMENT BELA LEKKOL MONTESSORI
echo  GitHub Pages  -  blmlecolefrancaise.com
echo  ================================================================
echo.

cd /d "%~dp0"
echo [1/6] Repertoire : %CD%
echo.

REM Suppression du verrou git si present
if exist ".git\index.lock" (
    echo [INFO] Suppression du verrou git...
    del /f ".git\index.lock"
)

REM Verification Git disponible
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installe ou pas dans le PATH.
    pause
    exit /b 1
)

echo [2/6] Ajout de tous les fichiers modifies...
git add -A
if errorlevel 1 (
    echo [ERREUR] git add a echoue.
    pause
    exit /b 1
)

echo.
echo [3/6] Verification des changements...
git status --short
echo.

REM Verifier s'il y a quelque chose a committer
git diff --cached --quiet
if %errorlevel% == 0 (
    echo [INFO] Aucun changement a committer. Poursuite vers push...
    goto PUSH
)

REM Message de commit automatique
set MSG=deploy: mise a jour site BLM - refonte complete 2026

echo [4/6] Commit en cours...
git commit -m "%MSG%"
if errorlevel 1 (
    echo [ERREUR] git commit a echoue.
    pause
    exit /b 1
)

:PUSH
echo.
echo [5/6] Push vers GitHub master...
echo   - Declenche GitHub Actions automatiquement
echo   - Build Vite - GitHub Pages - blmlecolefrancaise.com
echo.
git push origin master
if errorlevel 1 (
    echo.
    echo [ERREUR] git push a echoue.
    echo.
    echo Solutions :
    echo   Ouvrir GitHub Desktop et faire le push depuis la interface
    echo   OU dans Git Bash taper : git push origin master
    echo.
    pause
    exit /b 1
)

echo.
echo [6/6] Succes !
echo.
echo  ================================================================
echo  DEPLOIEMENT LANCE AVEC SUCCES
echo  GitHub Actions construit le site (2-3 min)
echo  Verifier : github.com/Erdid1/web-bela-lekkol-montessori/actions
echo  Site live : blmlecolefrancaise.com
echo  ================================================================
echo.

start "" "https://github.com/Erdid1/web-bela-lekkol-montessori/actions"
start "" "https://blmlecolefrancaise.com"

echo Appuyer sur une touche pour fermer...
pause >nul

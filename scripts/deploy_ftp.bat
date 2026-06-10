@echo off
:: ================================================================
:: deploy_ftp.bat — Deploiement FTP securise (sans stocker les mdp)
:: Double-cliquer pour lancer le deploiement vers Hostinger.
:: Les identifiants sont demandes a la saisie, jamais stockes.
:: ================================================================

title Deploiement FTP — Bela Lekkol Montessori

echo.
echo  ============================================================
echo   Deploiement FTP — blmlecolefrancaise.com
echo  ============================================================
echo.

:: Valeurs par defaut (hote et user seulement, JAMAIS le mot de passe)
set FTP_HOST=194.164.74.73
set FTP_USER=u376691524

echo  Hote : %FTP_HOST%
echo  User : %FTP_USER%
echo.

:: Saisie securisee du mot de passe (PowerShell masque la frappe)
for /f "usebackq delims=" %%P in (`powershell -Command "$s=Read-Host 'Mot de passe FTP' -AsSecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))"`) do set FTP_PASS=%%P

if "%FTP_PASS%"=="" (
    echo  [ERREUR] Mot de passe vide. Annulation.
    pause
    exit /b 1
)

:: Build avant deploy
echo.
echo  [1/2] Build du site...
cd /d "%~dp0.."
call npm run build
if errorlevel 1 (
    echo  [ERREUR] Le build a echoue. Corrigez les erreurs avant de deployer.
    pause
    exit /b 1
)

:: Deploiement FTP
echo.
echo  [2/2] Deploiement FTP...
python scripts\deploy_ftp.py

:: Effacer le mot de passe de la memoire
set FTP_PASS=

echo.
pause

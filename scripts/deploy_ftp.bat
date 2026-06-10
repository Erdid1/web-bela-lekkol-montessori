@echo off
:: deploy_ftp.bat - Deploiement FTP securise
title Deploiement FTP - Bela Lekkol Montessori
set FTP_HOST=194.164.74.73
set FTP_USER=u376691524
echo.
echo  Hote : %FTP_HOST%
echo  User : %FTP_USER%
echo.
for /f "usebackq delims=" %%P in (`powershell -Command "$s=Read-Host 'Mot de passe FTP' -AsSecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))"`) do set FTP_PASS=%%P
if "%FTP_PASS%"=="" ( echo [ERREUR] Mot de passe vide. & pause & exit /b 1 )
cd /d "%~dp0.."
call npm run build
python scripts\deploy_ftp.py
set FTP_PASS=
pause

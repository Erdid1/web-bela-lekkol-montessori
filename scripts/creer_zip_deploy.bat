@echo off
title Creation ZIP - Bela Lekkol Montessori
echo.
echo  Preparation du site pour deploiement...
echo.

cd /d "%~dp0.."

:: Build
call npm run build
if errorlevel 1 ( echo [ERREUR] Build echoue. & pause & exit /b 1 )

:: Copie extras dans dist
copy /Y sitemap.xml dist\sitemap.xml >nul 2>&1
copy /Y robots.txt dist\robots.txt >nul 2>&1

:: Cree le ZIP sur le Bureau
python -c "
import zipfile, os
from pathlib import Path
dist = Path('dist')
out = Path.home() / 'Desktop' / 'site_blm_upload.zip'
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in dist.rglob('*'):
        if f.is_file():
            z.write(f, f.relative_to(dist))
size = round(out.stat().st_size / 1024 / 1024, 1)
print(f'  ZIP cree sur le Bureau : {out.name}  ({size} MB)')
print()
print('  Etapes suivantes :')
print('  1. hPanel > Gestionnaire de fichiers > public_html')
print('  2. Televerser site_blm_upload.zip')
print('  3. Clic droit > Extraire dans public_html')
print('  4. Supprimer le ZIP')
"

echo.
pause

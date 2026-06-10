"""
deploy_ftp.py - Deploiement FTP securise vers Hostinger
Lit les identifiants depuis les variables d'environnement.
N'affiche JAMAIS le mot de passe.

Usage (PowerShell) :
    $env:FTP_HOST = "194.164.74.73"
    $env:FTP_USER = "u376691524"
    $env:FTP_PASS = "votre_mot_de_passe"
    python scripts/deploy_ftp.py
"""

import os, sys, ftplib
from pathlib import Path

REMOTE_ROOT = "/domains/blmlecolefrancaise.com/public_html"
LOCAL_DIST  = Path(__file__).parent.parent / "dist"
LOCAL_ROOT  = Path(__file__).parent.parent
EXTRA_FILES = ["sitemap.xml", "robots.txt"]
IGNORE_EXT  = {".py", ".bat", ".md", ".jsonl", ".lock"}
IGNORE_DIRS = {"node_modules", ".git", ".github", "scripts", "src", "__pycache__"}


def get_credentials():
    host = os.environ.get("FTP_HOST", "194.164.74.73").strip()
    user = os.environ.get("FTP_USER", "").strip()
    pwd  = os.environ.get("FTP_PASS", "").strip()
    missing = [k for k, v in [("FTP_USER", user), ("FTP_PASS", pwd)] if not v]
    if missing:
        print(f"[ERREUR] Variables manquantes : {', '.join(missing)}")
        sys.exit(1)
    masked = pwd[:2] + "***" + pwd[-2:] if len(pwd) > 4 else "****"
    print(f"  Hote : {host}")
    print(f"  User : {user}")
    print(f"  Pass : {masked}")
    return host, user, pwd


def ftp_mkdir_p(ftp, remote_path):
    parts = [p for p in remote_path.split("/") if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass


def ftp_upload_tree(ftp, local_dir, remote_dir):
    local_dir = Path(local_dir)
    uploaded = errors = 0
    for local_file in sorted(local_dir.rglob("*")):
        if not local_file.is_file():
            continue
        if local_file.suffix.lower() in IGNORE_EXT:
            continue
        if any(part in IGNORE_DIRS for part in local_file.parts):
            continue
        rel = local_file.relative_to(local_dir)
        remote_file = remote_dir.rstrip("/") + "/" + str(rel).replace("\\", "/")
        remote_folder = "/".join(remote_file.split("/")[:-1])
        try:
            ftp_mkdir_p(ftp, remote_folder)
            with open(local_file, "rb") as f:
                ftp.storbinary(f"STOR {remote_file}", f)
            print(f"  OK {rel}")
            uploaded += 1
        except Exception as e:
            print(f"  ERR {rel} - {e}")
            errors += 1
    return uploaded, errors


def main():
    print("=" * 60)
    print("  Deploiement FTP - Bela Lekkol Montessori")
    print("=" * 60)
    if not LOCAL_DIST.exists():
        print("[ERREUR] dist/ introuvable. Lancez : npm run build")
        sys.exit(1)

    print("\n[1/3] Connexion FTP...")
    host, user, pwd = get_credentials()

    try:
        ftp = ftplib.FTP()
        ftp.connect(host, 21, timeout=30)
        ftp.set_pasv(True)
        ftp.login(user, pwd)
        print(f"  Connecte a {host}")
    except ftplib.error_perm as e:
        print(f"\n[ERREUR] Authentification refusee : {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERREUR] Connexion impossible : {e}")
        sys.exit(1)

    total_up = total_err = 0

    print(f"\n[2/3] Upload dist/ -> {REMOTE_ROOT}/")
    up, err = ftp_upload_tree(ftp, LOCAL_DIST, REMOTE_ROOT)
    total_up += up
    total_err += err

    print(f"\n[3/3] Fichiers supplementaires...")
    for fname in EXTRA_FILES:
        local_file = LOCAL_ROOT / fname
        if not local_file.exists():
            continue
        try:
            ftp_mkdir_p(ftp, REMOTE_ROOT)
            with open(local_file, "rb") as f:
                ftp.storbinary(f"STOR {REMOTE_ROOT}/{fname}", f)
            print(f"  OK {fname}")
            total_up += 1
        except Exception as e:
            print(f"  ERR {fname} - {e}")
            total_err += 1

    ftp.quit()
    print()
    print("=" * 60)
    if total_err == 0:
        print(f"  Deploiement termine : {total_up} fichiers uploades")
        print(f"  Site : https://blmlecolefrancaise.com")
    else:
        print(f"  Termine : {total_up} OK / {total_err} erreurs")
    print("=" * 60)


if __name__ == "__main__":
    main()

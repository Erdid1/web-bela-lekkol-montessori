"""
deploy_ftp.py — Déploiement FTP sécurisé vers Hostinger
========================================================
Lit les identifiants depuis les variables d'environnement.
Ne affiche JAMAIS le mot de passe.

Usage (PowerShell) :
    $env:FTP_HOST = "194.164.74.73"
    $env:FTP_USER = "u376691524"
    $env:FTP_PASS = "votre_mot_de_passe"
    python scripts/deploy_ftp.py

Usage (bash/cmd) :
    export FTP_HOST="194.164.74.73"
    export FTP_USER="u376691524"
    export FTP_PASS="votre_mot_de_passe"
    python scripts/deploy_ftp.py
"""

import os
import sys
import ftplib
from pathlib import Path

# ─── Configuration ───────────────────────────────────────────────────────────

REMOTE_ROOT = "/domains/blmlecolefrancaise.com/public_html"

# Répertoire local source : dist/ (compilé Vite) + fichiers racine supplémentaires
LOCAL_DIST  = Path(__file__).parent.parent / "dist"
LOCAL_ROOT  = Path(__file__).parent.parent

# Fichiers racine à uploader en plus du dist/
EXTRA_FILES = [
    "sitemap.xml",
    "robots.txt",
]

# Extensions à ignorer lors du parcours
IGNORE_EXT = {".py", ".bat", ".md", ".jsonl", ".lock"}
IGNORE_DIRS = {"node_modules", ".git", ".github", "scripts", "src", "__pycache__"}

# ─── Lecture des credentials ─────────────────────────────────────────────────

def get_credentials():
    host = os.environ.get("FTP_HOST", "").strip()
    user = os.environ.get("FTP_USER", "").strip()
    pwd  = os.environ.get("FTP_PASS", "").strip()

    missing = [k for k, v in [("FTP_HOST", host), ("FTP_USER", user), ("FTP_PASS", pwd)] if not v]
    if missing:
        print(f"[ERREUR] Variables d'environnement manquantes : {', '.join(missing)}")
        print()
        print("Définissez-les dans PowerShell avant de relancer :")
        print('  $env:FTP_HOST = "194.164.74.73"')
        print('  $env:FTP_USER = "votre_identifiant"')
        print('  $env:FTP_PASS = "votre_mot_de_passe"')
        sys.exit(1)

    # Masque le mot de passe dans les logs
    masked = pwd[:2] + "***" + pwd[-2:] if len(pwd) > 4 else "****"
    print(f"  Hôte : {host}")
    print(f"  User : {user}")
    print(f"  Pass : {masked}")
    return host, user, pwd


# ─── Helpers FTP ─────────────────────────────────────────────────────────────

def ftp_mkdir_p(ftp, remote_path):
    """Crée le chemin distant récursivement s'il n'existe pas."""
    parts = [p for p in remote_path.split("/") if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.mkd(current)
        except ftplib.error_perm:
            pass  # dossier déjà existant


def ftp_upload_file(ftp, local_path, remote_path):
    """Upload un fichier binaire vers le serveur FTP."""
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)


def ftp_upload_tree(ftp, local_dir, remote_dir, label=""):
    """Upload récursivement un dossier local vers un dossier distant."""
    local_dir = Path(local_dir)
    uploaded = 0
    errors = 0

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
            ftp_upload_file(ftp, local_file, remote_file)
            print(f"  OK {label}{rel}")
            uploaded += 1
        except Exception as e:
            print(f"  ERR {label}{rel}  - {e}")
            errors += 1

    return uploaded, errors


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  Déploiement FTP — Bela Lekkol Montessori")
    print("=" * 60)

    if not LOCAL_DIST.exists():
        print(f"\n[ERREUR] Le dossier dist/ est introuvable : {LOCAL_DIST}")
        print("Lancez d'abord :  npm run build")
        sys.exit(1)

    print("\n[1/3] Connexion FTP...")
    host, user, pwd = get_credentials()

    try:
        ftp = ftplib.FTP()
        ftp.connect(host, 21, timeout=30)
        ftp.login(user, pwd)
        ftp.set_pasv(True)
        print(f"  Connecté à {host}")
    except ftplib.error_perm as e:
        print(f"\n[ERREUR] Connexion refusée : {e}")
        print("Verifiez vos identifiants dans hPanel > Hebergement > FTP.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERREUR] Impossible de se connecter : {e}")
        sys.exit(1)

    total_up = total_err = 0

    print(f"\n[2/3] Upload dist/ -> {REMOTE_ROOT}/")
    up, err = ftp_upload_tree(ftp, LOCAL_DIST, REMOTE_ROOT)
    total_up += up
    total_err += err

    print(f"\n[3/3] Upload fichiers supplémentaires...")
    for fname in EXTRA_FILES:
        local_file = LOCAL_ROOT / fname
        if not local_file.exists():
            print(f"  — {fname} introuvable, ignoré")
            continue
        remote_file = REMOTE_ROOT + "/" + fname
        try:
            ftp_upload_file(ftp, local_file, remote_file)
            print(f"  OK {fname}")
            total_up += 1
        except Exception as e:
            print(f"  ERR {fname}  - {e}")
            total_err += 1

    ftp.quit()

    print()
    print("=" * 60)
    if total_err == 0:
        print(f"  Déploiement terminé : {total_up} fichiers uploadés")
        print(f"  Site : https://blmlecolefrancaise.com")
    else:
        print(f"  Terminé avec erreurs : {total_up} OK · {total_err} échecs")
    print("=" * 60)


if __name__ == "__main__":
    main()

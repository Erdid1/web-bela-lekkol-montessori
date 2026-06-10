import os, re, glob

BASE = r'c:\Users\ERIC01\Documents\18 BLM\10 WEB BELA LEKKOL MONTESSORI\bela-lekkol-montessori'

SKIP = {'gabarits_instagram.html', 'googlef8a796ea3ed46aef.html'}

pages = [f for f in glob.glob(os.path.join(BASE, '*.html'))
         if os.path.basename(f) not in SKIP]

def fix_nav(content):
    # Supprimer le lien Accueil (format plat <a ...>Accueil</a>)
    content = re.sub(
        r'\s*<a href="[./]*index\.html"[^>]*>Accueil</a>',
        '', content
    )
    # Supprimer le lien Tarifs dans la nav (format plat)
    content = re.sub(
        r'\s*<a href="[./]*admissions\.html#tarifs"[^>]*>Tarifs</a>',
        '', content
    )
    # CFP Montessori -> CFP (securite: dans nav uniquement)
    content = content.replace('>CFP Montessori</a>', '>CFP</a>')
    return content

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    fixed = fix_nav(content)
    if fixed != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fixed)
        print('OK:', os.path.basename(path))
    else:
        print('SKIP:', os.path.basename(path))

print('Termine.')

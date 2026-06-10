"""
fix_mobile_nav.py
Corrections menu mobile sur toutes les pages HTML :
  1. max-height + overflow-y sur nav.open
  2. Padding reduit sur nav a (mobile)
  3. JS : ferme le menu au clic sur un lien et au clic hors menu
"""
import os, re, glob

BASE = r'c:\Users\ERIC01\Documents\18 BLM\10 WEB BELA LEKKOL MONTESSORI\bela-lekkol-montessori'
SKIP = {'gabarits_instagram.html', 'googlef8a796ea3ed46aef.html'}

pages = [f for f in glob.glob(os.path.join(BASE, '*.html'))
         if os.path.basename(f) not in SKIP]

# 1. nav.open : ajoute max-height + overflow-y
OLD_NAVOPEN = 'nav.open { display: flex; }'
NEW_NAVOPEN = 'nav.open { display: flex; max-height: 65vh; overflow-y: auto; }'

# 2. Reduit le padding des liens mobiles
OLD_PADA = 'padding: .75rem 1rem;'
NEW_PADA = 'padding: .5rem .8rem;'

# 3. Script fermeture - insere juste avant </body>
CLOSE_JS = '''<script>
(function(){
  var nav = document.querySelector('header nav');
  var btn = document.querySelector('header .hamburger');
  if(!nav) return;
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); if(btn) btn.innerHTML='&#9776;'; });
  });
  document.addEventListener('click', function(e){
    if(nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)){
      nav.classList.remove('open');
      if(btn) btn.innerHTML='&#9776;';
    }
  });
})();
</script>
</body>'''

for path in pages:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    changed = False

    # 1. max-height sur nav.open
    if OLD_NAVOPEN in c:
        c = c.replace(OLD_NAVOPEN, NEW_NAVOPEN)
        changed = True

    # 2. Padding liens mobile (seulement dans le bloc @media)
    # On cible uniquement la section media query
    def fix_media_padding(text):
        def replace_in_media(m):
            return m.group(0).replace(OLD_PADA, NEW_PADA)
        return re.sub(r'@media \(max-width: 768px\).*?(?=@media|\Z)', replace_in_media, text, flags=re.DOTALL)

    c2 = fix_media_padding(c)
    if c2 != c:
        c = c2
        changed = True

    # 3. Script fermeture - evite les doublons
    if 'nav.classList.remove' not in c and '</body>' in c:
        c = c.replace('</body>', CLOSE_JS)
        changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        print('OK:', os.path.basename(path))
    else:
        print('SKIP:', os.path.basename(path))

print('Termine.')

import './style.css';
document.body.classList.add('js-loaded');

// ── COMPTEURS ANIMÉS ──────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const mode = el.getAttribute('data-mode');
  if (mode === 'year') { el.textContent = target; return; }
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── SWIPER GALERIE ────────────────────────────────────────
let gallerySwiper = null;

function initGallerySwiper() {
  if (gallerySwiper) { gallerySwiper.destroy(true, true); }
  gallerySwiper = new Swiper('.gallery-swiper', {
    loop: false,
    autoplay: { delay: 3500, disableOnInteraction: false },
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      640:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
  });
}

if (document.querySelector('.gallery-swiper')) {
  initGallerySwiper();

  // Filtres par catégorie
  document.querySelectorAll('.gfilter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gfilter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const wrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
      const allSlides = [...wrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')];
      // Retirer les slides filtrées du DOM pour que Swiper ne les compte pas
      if (gallerySwiper) { gallerySwiper.destroy(true, true); gallerySwiper = null; }
      wrapper.innerHTML = '';
      allSlides.forEach(slide => {
        const cat = slide.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) wrapper.appendChild(slide);
      });
      initGallerySwiper();
    });
  });
}

// ── NAVBAR SCROLL — glassmorphism dynamique ───────────────────
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── TUBELIGHT PILL — effet lumineux 21st.dev ──────────────────
function initNavPill() {
  const nav = document.getElementById('nav-links');
  if (!nav || window.innerWidth <= 968) return;

  let pill = nav.querySelector('.nav-pill');
  if (!pill) {
    pill = document.createElement('span');
    pill.className = 'nav-pill';
    nav.appendChild(pill);
  }

  const links = [...nav.querySelectorAll('li a')]
    .filter(a => !a.classList.contains('btn') && !a.classList.contains('btn-secondary'));

  const activeLink = links.find(a => a.classList.contains('nav-active')) || null;

  function moveTo(el) {
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    pill.style.left    = (elRect.left - navRect.left) + 'px';
    pill.style.width   = elRect.width + 'px';
    pill.style.opacity = '1';
  }

  // Position initiale sans animation
  if (activeLink) {
    pill.style.transition = 'none';
    moveTo(activeLink);
    requestAnimationFrame(() => { pill.style.transition = ''; });
  } else {
    pill.style.opacity = '0';
  }

  // Hover : le pill suit la souris
  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveTo(link));
    link.addEventListener('mouseleave', () => {
      if (activeLink) moveTo(activeLink);
      else pill.style.opacity = '0';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Attendre que le layout soit stable
  requestAnimationFrame(initNavPill);
  window.addEventListener('resize', initNavPill, { passive: true });
});

// ── MOBILE MENU TOGGLE ────────────────────────────────────────
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        }
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) { icon.className = 'fas fa-bars'; }
        });
    });
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            e.target !== mobileToggle &&
            !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) { icon.className = 'fas fa-bars'; }
        }
    });
}

// Lien actif dans la navigation
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) link.classList.add('nav-active');
});

// Simple Intersection Observer for AOS (Animate on Scroll)
// Fallback : rendre visibles tous les éléments après 400ms si l'observer ne déclenche pas
setTimeout(() => {
    document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(el => {
        el.classList.add('aos-animate');
    });
}, 400);

const observerOptions = {
    threshold: 0.05,
    rootMargin: '100px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Feedback visuel à la soumission des formulaires (Formspree gère l'envoi réel)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    if (!form.action || form.action.includes('YOUR_FORM_ID')) return;
    form.addEventListener('submit', () => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…'; btn.disabled = true; }
    });
});

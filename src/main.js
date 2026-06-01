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

// Navbar scroll logic
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    // Fermer le menu au clic extérieur
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileToggle && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
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

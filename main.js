// ─── MENÚ RESPONSIVE ────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

function closeMenu() { navLinks.classList.remove('active'); }

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && e.target !== hamburger) closeMenu();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// ─── SMOOTH SCROLL ──────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ─── CONTADOR ANIMADO ───────────────────────────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => counterObserver.observe(el));

// ─── BARRA DE PROGRESO DE SCROLL ────────────────────────────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

// ─── PARALLAX EN EL HERO ────────────────────────────────────────────────────
const hero = document.querySelector('.hero');

// ─── BARRA FLOTANTE CTA ─────────────────────────────────────────────────────
const floatingCTA = document.createElement('div');
floatingCTA.className = 'floating-cta';
floatingCTA.innerHTML = `
    <span class="floating-cta-text">¿Tiene un proyecto industrial?</span>
    <div class="floating-cta-actions">
        <a href="#contacto" class="btn btn-primary btn-sm">Cotizar ahora</a>
        <a href="https://wa.me/5491136292997" class="floating-cta-wa" target="_blank" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
        </a>
    </div>
`;
document.body.appendChild(floatingCTA);

// ─── LIGHTBOX ───────────────────────────────────────────────────────────────
const lightbox = document.createElement('div');
lightbox.className = 'lightbox-overlay';
lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    </button>
    <button class="lightbox-prev" aria-label="Anterior">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
        </svg>
    </button>
    <button class="lightbox-next" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
        </svg>
    </button>
    <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="">
        <p class="lightbox-caption"></p>
    </div>
    <div class="lightbox-counter"></div>
`;
document.body.appendChild(lightbox);

const lbImg     = lightbox.querySelector('.lightbox-img');
const lbCaption = lightbox.querySelector('.lightbox-caption');
const lbCounter = lightbox.querySelector('.lightbox-counter');
let lbImages = [];
let lbCurrent = 0;

function showLightboxImage() {
    lbImg.style.opacity = '0';
    setTimeout(() => {
        const { src, alt } = lbImages[lbCurrent];
        lbImg.src = src;
        lbImg.alt = alt;
        lbCaption.textContent = alt;
        lbCounter.textContent = `${lbCurrent + 1} / ${lbImages.length}`;
        lbImg.style.opacity = '1';
    }, 150);
    const hasMult = lbImages.length > 1;
    lightbox.querySelector('.lightbox-prev').style.display = hasMult ? '' : 'none';
    lightbox.querySelector('.lightbox-next').style.display = hasMult ? '' : 'none';
    lbCounter.style.display = hasMult ? '' : 'none';
}

function openLightbox(images, index) {
    lbImages = images;
    lbCurrent = index;
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    lbCurrent = (lbCurrent - 1 + lbImages.length) % lbImages.length;
    showLightboxImage();
});
lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    lbCurrent = (lbCurrent + 1) % lbImages.length;
    showLightboxImage();
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')  { lbCurrent = (lbCurrent - 1 + lbImages.length) % lbImages.length; showLightboxImage(); }
    if (e.key === 'ArrowRight') { lbCurrent = (lbCurrent + 1) % lbImages.length; showLightboxImage(); }
});

// Swipe en mobile
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend',   (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) { lbCurrent = (lbCurrent + 1) % lbImages.length; }
    else          { lbCurrent = (lbCurrent - 1 + lbImages.length) % lbImages.length; }
    showLightboxImage();
});

function initGallery(selector) {
    document.querySelectorAll(selector).forEach(container => {
        const imgs = [...container.querySelectorAll('img')];
        if (!imgs.length) return;
        const imageData = imgs.map(img => ({ src: img.src, alt: img.alt }));
        imgs.forEach((img, i) => {
            const card = img.closest('.img-card, .case-card');
            if (card) {
                card.style.cursor = 'zoom-in';
                card.addEventListener('click', () => openLightbox(imageData, i));
            }
        });
    });
}

initGallery('.cases-grid');
initGallery('.gallery-piping');
initGallery('.gallery-fab');
initGallery('.gallery-mant');

// ─── SCROLL HANDLER UNIFICADO ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;

    // Progreso
    progressBar.style.width = `${(scrolled / total) * 100}%`;

    // Floating CTA
    const contactEl = document.getElementById('contacto');
    const hideFrom  = contactEl ? contactEl.offsetTop - 300 : Infinity;
    if (scrolled > 500 && scrolled < hideFrom) {
        floatingCTA.classList.add('visible');
    } else {
        floatingCTA.classList.remove('visible');
    }

    // Parallax hero (solo desktop — evita jank en iOS Safari)
    if (hero && scrolled < window.innerHeight * 1.2 && window.innerWidth > 768) {
        hero.style.backgroundPositionY = `calc(50% + ${scrolled * 0.25}px)`;
    }
}, { passive: true });

// ===== 1. Apparition au scroll =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));


// ===== 2. Carrousel des affiches =====
const track = document.getElementById('affiches-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots');
const cards = track.querySelectorAll('.affiche-card');

// Crée un point par affiche
cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Aller à l'affiche ${i + 1}`);
  dot.addEventListener('click', () => scrollToCard(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('.dot');

function getStep() {
  const card = cards[0];
  const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
  return card.offsetWidth + gap;
}

function scrollToCard(index) {
  track.scrollTo({ left: index * getStep(), behavior: 'smooth' });
}

function currentIndex() {
  return Math.round(track.scrollLeft / getStep());
}

function updateDots() {
  const index = Math.min(currentIndex(), dots.length - 1);
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -getStep(), behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: getStep(), behavior: 'smooth' });
});

track.addEventListener('scroll', updateDots, { passive: true });
updateDots();

// Défilement automatique (se met en pause au survol)
let autoplay;
let isPaused = false;

function startAutoplay() {
  autoplay = setInterval(() => {
    if (isPaused) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 5) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    }
  }, 4000);
}

track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);
track.addEventListener('touchstart', () => isPaused = true, { passive: true });
track.addEventListener('touchend', () => isPaused = false);

startAutoplay();


// ===== 3. Lightbox (affiche en grand) =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

const affiches = Array.from(document.querySelectorAll('.affiche-card'));
let currentLb = 0;

function showLightbox(index) {
  currentLb = (index + affiches.length) % affiches.length;
  const card = affiches[currentLb];
  lbImg.src = card.dataset.full;
  lbImg.alt = card.dataset.title;
  lbCaption.textContent = card.dataset.title;
}

function openLightbox(index) {
  showLightbox(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

affiches.forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentLb - 1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentLb + 1); });

// Fermer en cliquant sur le fond
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Clavier : Échap, flèches
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox(currentLb - 1);
  if (e.key === 'ArrowRight') showLightbox(currentLb + 1);
});
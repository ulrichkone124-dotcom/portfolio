// ===== 1. DONNÉES : COMPÉTENCES =====
// Modifie le niveau (0 à 100) et l'icône Font Awesome selon tes vrais niveaux.
const skills = [
  { name: 'HTML5',      level: 90, icon: 'fa-brands fa-html5',      color: '#e34f26' },
  { name: 'CSS3',       level: 85, icon: 'fa-brands fa-css3-alt',   color: '#1572b6' },
  { name: 'JavaScript', level: 75, icon: 'fa-brands fa-js',         color: '#f7df1e' },
  { name: 'TypeScript', level: 55, icon: 'fa-solid fa-code',        color: '#3178c6' },
  { name: 'React',      level: 60, icon: 'fa-brands fa-react',      color: '#61dafb' },
  { name: 'Tailwind',   level: 80, icon: 'fa-brands fa-tailwind-css', color: '#38bdf8' },
  { name: 'Git',        level: 70, icon: 'fa-brands fa-git-alt',    color: '#f05033' },
  { name: 'Kotlin',     level: 60, icon: 'fa-brands fa-android',    color: '#a97bff' },
  { name: 'PHP',        level: 65, icon: 'fa-brands fa-php',        color: '#777bb4' },
  { name: 'Figma',      level: 65, icon: 'fa-brands fa-figma',      color: '#f24e1e' }
];

// ===== 2. DONNÉES : PROJETS =====
// github : lien vers le dépôt | demo : lien vers le site en ligne (laisse '' si absent)
// image : chemin d'une capture (ex: 'projets/projet1.jpg'), laisse '' pour afficher une icône
const projects = [
  {
    title: 'Projet 01',
    description: 'Description courte de ton projet : le problème résolu et ce que tu as réalisé.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '',
    icon: 'fa-solid fa-laptop-code',
    github: 'https://github.com/ulrichkone124-dotcom/',
    demo: ''
  },
  {
    title: 'Projet 02',
    description: 'Description courte de ton projet : le problème résolu et ce que tu as réalisé.',
    tags: ['React', 'Tailwind'],
    image: '',
    icon: 'fa-brands fa-react',
    github: 'https://github.com/ulrichkone124-dotcom/',
    demo: ''
  },
  {
    title: 'Projet 03',
    description: 'Description courte de ton projet : le problème résolu et ce que tu as réalisé.',
    tags: ['Kotlin', 'Android'],
    image: '',
    icon: 'fa-brands fa-android',
    github: 'https://github.com/ulrichkone124-dotcom/',
    demo: ''
  }
];

// ===== 3. RENDU : COMPÉTENCES =====
const skillsList = document.getElementById('skills-list');

skills.forEach((skill) => {
  const item = document.createElement('div');
  item.className = 'skill-item';
  item.innerHTML = `
    <div class="skill-head">
      <span class="skill-name">
        <i class="${skill.icon}" style="color:${skill.color}"></i>${skill.name}
      </span>
      <span class="skill-percent">${skill.level}%</span>
    </div>
    <div class="skill-track">
      <div class="skill-fill" style="--level:${skill.level}%"></div>
    </div>
  `;
  skillsList.appendChild(item);
});

// ===== 4. RENDU : PROJETS =====
const projectsGrid = document.getElementById('projects-grid');

projects.forEach((project) => {
  const media = project.image
    ? `<img src="${project.image}" alt="${project.title}">`
    : `<i class="${project.icon}"></i>`;

  const githubLink = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="link-btn">
         <i class="fa-brands fa-github"></i> Code source
       </a>`
    : `<span class="link-btn disabled"><i class="fa-brands fa-github"></i> Code source</span>`;

  const demoLink = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener" class="link-btn primary">
         <i class="fa-solid fa-arrow-up-right-from-square"></i> Voir le site
       </a>`
    : `<span class="link-btn primary disabled"><i class="fa-solid fa-arrow-up-right-from-square"></i> Bientôt en ligne</span>`;

  const tags = project.tags.map((t) => `<span>${t}</span>`).join('');

  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.innerHTML = `
    <div class="project-media">${media}</div>
    <div class="project-body">
      <div class="project-tags">${tags}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-links">
        ${githubLink}
        ${demoLink}
      </div>
    </div>
  `;
  projectsGrid.appendChild(card);
});

// ===== 5. APPARITION AU SCROLL =====
// Les éléments .reveal sont observés après le rendu des projets
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animation des barres de compétences
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach((el) => skillObserver.observe(el));

// ===== 6. CARROUSEL DES AFFICHES =====
const track = document.getElementById('affiches-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots');
const cards = track.querySelectorAll('.affiche-card');

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Aller à l'affiche ${i + 1}`);
  dot.addEventListener('click', () => scrollToCard(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('.dot');

function getStep() {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
  return cards[0].offsetWidth + gap;
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

prevBtn.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
nextBtn.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));

track.addEventListener('scroll', updateDots, { passive: true });
updateDots();

// Défilement automatique, en pause au survol ou au toucher
let isPaused = false;

setInterval(() => {
  if (isPaused) return;
  const maxScroll = track.scrollWidth - track.clientWidth;
  if (track.scrollLeft >= maxScroll - 5) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  }
}, 4000);

track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);
track.addEventListener('touchstart', () => isPaused = true, { passive: true });
track.addEventListener('touchend', () => isPaused = false);

// ===== 7. LIGHTBOX (affiche en grand) =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

const affiches = Array.from(cards);
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

affiches.forEach((card, i) => card.addEventListener('click', () => openLightbox(i)));

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentLb - 1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentLb + 1); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox(currentLb - 1);
  if (e.key === 'ArrowRight') showLightbox(currentLb + 1);
});
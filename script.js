const { useState, useEffect, useRef } = React;
const h = React.createElement;

// ===== DONNÉES =====

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#services', label: 'Services' },
  { href: '#projets', label: 'Projets' },
  { href: '#affiches', label: 'Affiches' },
  { href: '#experience', label: 'Expérience' },
  { href: '#contact', label: 'Contact' }
];

const skills = [
  { name: 'HTML5',      icon: 'fa-brands fa-html5',        color: '#e34f26' },
  { name: 'CSS3',       icon: 'fa-brands fa-css3-alt',     color: '#1572b6' },
  { name: 'JavaScript', icon: 'fa-brands fa-js',           color: '#f7df1e' },
  { name: 'TypeScript', icon: 'fa-solid fa-code',          color: '#3178c6' },
  { name: 'React',      icon: 'fa-brands fa-react',        color: '#61dafb' },
  { name: 'Angular',    icon: 'fa-brands fa-angular',      color: '#dd0031' },
  { name: 'Tailwind',   img: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: '#4479A1' },
  { name: 'Git',        icon: 'fa-brands fa-git-alt',      color: '#f05033' },
  { name: 'Docker',     icon: 'fa-brands fa-docker',       color: '#2496ed' },
  { name: 'Kotlin',     icon: 'fa-brands fa-android',      color: '#a97bff' },
  { name: 'PHP',        icon: 'fa-brands fa-php',          color: '#777bb4' },
  { name: 'Figma',      icon: 'fa-brands fa-figma',        color: '#f24e1e' },
  { name: 'Canva', letter: 'C', color: '#00C4CC'  } 
];

const services = [
  { icon: 'fa-solid fa-code', title: 'Développement Web', text: 'Sites responsives, performants et modernes.' },
  { icon: 'fa-solid fa-pen-ruler', title: 'Design UI/UX', text: 'Interfaces intuitives et agréables à utiliser.' },
  { icon: 'fa-solid fa-mobile-screen', title: 'Applications Mobiles', text: 'Applications Android natives avec Kotlin.' },
  { icon: 'fa-solid fa-gauge-high', title: 'Optimisation', text: 'Amélioration de la vitesse et du référencement.' }
];

// github : lien vers le dépôt | demo : lien vers le site ('' si pas encore en ligne)
// image : chemin d'une capture ('' pour afficher une icône)
const projects = [
  {
    title: 'Portfolio Cédric',
    description: "Realisation de son portfolio pour montrer à ses futurs collaborateurs ce qu'il a realisé comme projet, sa formation etc...",
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'React'],
    image: 'capture-cedric.png',
    icon: 'fa-solid fa-laptop-code',
    github: 'https://github.com/ulrichkone124-dotcom/wognin-cedric',
    demo: 'https://wognin-cedric.vercel.app/'
  },
  {
    title: 'Projet 02',
    description: 'Description courte de ton projet : le problème résolu et ce que tu as réalisé.',
    tags: ['', ''],
    image: '',
    icon: 'fa-brands fa-react',
    github: 'https://github.com/ulrichkone124-dotcom/',
    demo: ''
  },
  {
    title: 'Projet 03',
    description: 'Description courte de ton projet : le problème résolu et ce que tu as réalisé.',
    tags: ['', ''],
    image: '',
    icon: 'fa-brands fa-android',
    github: 'https://github.com/ulrichkone124-dotcom/',
    demo: ''
  }
];

const affiches = [
  { src: 'affiche-1.png', title: 'Affiche promotionnelle 01', desc: 'Fait pour un commerce en ligne' },
  { src: 'affiche-2.png', title: 'Affiche promotionnelle 02', desc: "Fait pour un commerce en ligne" },
  { src: 'affiche-3.png', title: 'Affiche promotionnelle 03', desc: "Fait pour un commerce en ligne" },
  { src: 'affiche-4.png', title: 'Affiche promotionnelle 04', desc: 'Fait pour mon propre compte'},
  { src: 'affiche-5.png', title: 'Affiche promotionnelle 05', desc: 'Fait pour un évènement'},
  { src: 'affiche-6.png', title: 'Affiche promotionnelle 06', desc: 'Fait pour un commerce en ligne'}
];

const experiences = [
  { icon: 'fa-solid fa-graduation-cap', title: "Licence 3 Développeur d'Applications", date: "2026 – Aujourd'hui", text: 'Mobile, réseaux, développement web et DevOps.' },
  { icon: 'fa-solid fa-laptop-code', title: 'Formation en développement web', date: "2023 – Aujourd'hui", text: 'HTML, CSS, JavaScript, PHP et bases de données.' },
  { icon: 'fa-solid fa-book-open', title: 'Autodidacte', date: 'En continu', text: 'Apprentissage des frameworks et des API.' }
];

// ===== HOOKS ET COMPOSANTS UTILITAIRES =====

// Renvoie [ref, inView] : inView passe à true une seule fois, quand l'élément apparaît à l'écran
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// Élément qui apparaît au scroll
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return h(
    Tag,
    { ref, className: `reveal ${inView ? 'visible' : ''} ${className}`, ...rest },
    ...[].concat(children)
  );
}

// ===== NAVBAR =====
function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return h('header', { className: 'sticky top-0 z-50 bg-dark/85 backdrop-blur-md border-b border-dark-border fade-in' },
    h('div', { className: 'flex items-center justify-between gap-6 px-6 lg:px-12 py-4' },
      h('div', { className: 'flex items-center gap-2 font-bold tracking-wider' },
        h('span', { className: 'w-9 h-9 grid place-items-center rounded-lg border-2 border-gold text-gold' }, 'U'),
        h('span', null, 'ULRICH', h('span', { className: 'text-gold' }, '.DEV'))
      ),
      h('nav', { className: 'hidden md:flex gap-6 text-sm' },
        navLinks.map((link, i) =>
          h('a', { key: link.href, href: link.href, className: `nav-link ${i === 0 ? 'text-gold' : ''}` }, link.label)
        )
      ),
      h('div', { className: 'flex items-center gap-3' },
        h('a', { href: '#contact', className: 'btn-gold text-sm px-4 py-2 hidden sm:inline-block' }, 'Me contacter'),
        h('button', {
            className: 'md:hidden arrow-btn',
            onClick: () => setOpen(!open),
            'aria-label': 'Ouvrir le menu',
            'aria-expanded': open
          },
          h('i', { className: open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars' })
        )
      )
    ),

    // Menu mobile : affiché seulement quand on clique sur le bouton
    open && h('nav', { className: 'md:hidden flex flex-col px-6 pb-4 fade-in' },
      navLinks.map((link) =>
        h('a', {
            key: link.href,
            href: link.href,
            onClick: close,
            className: 'py-3 border-b border-dark-border text-gray-300 hover:text-gold transition'
          },
          link.label
        )
      )
    )
  );
}

// ===== HERO =====
function Hero() {
  return h('section', { id: 'accueil', className: 'hero-bg grid lg:grid-cols-[1.1fr_1fr] items-center gap-12 px-6 lg:px-12 py-20' },
    h('div', null,
      h('span', { className: 'fade-in-up inline-block px-4 py-1.5 mb-6 text-sm text-gray-400 border border-dark-border rounded-full' },
        h('i', { className: 'fa-solid fa-circle text-[8px] text-green-400 align-middle mr-1' }),
        'Disponible pour de nouvelles opportunités'
      ),
      h('p', { className: 'fade-in-up delay-1 text-gold font-semibold tracking-wide mb-2' },
        'Je suis Koné Gbah Ulrich Paul David'
      ),
      h('h1', { className: 'fade-in-up delay-1 text-4xl md:text-6xl font-bold leading-tight mb-5' },
        'Je construis des', h('br'), h('span', { className: 'text-gold' }, 'expériences web'), ' modernes'
      ),
      h('p', { className: 'fade-in-up delay-2 text-gray-400 max-w-lg mb-8' },
        'Développeur Web Junior Front-End & Design Web. Je crée des interfaces rapides, responsives et agréables à utiliser.'
      ),
      h('div', { className: 'fade-in-up delay-3 flex flex-wrap gap-4 mb-10' },
        h('a', { href: '#contact', className: 'btn-gold px-6 py-3' }, h('i', { className: 'fa-solid fa-paper-plane mr-2' }), 'Me contacter'),
        h('a', { href: '#projets', className: 'btn-outline px-6 py-3' }, h('i', { className: 'fa-solid fa-folder-open mr-2' }), 'Voir mes projets')
      ),
      h('div', { className: 'fade-in-up delay-4 flex items-center gap-3 text-sm text-gray-400' },
        h('span', null, 'Suivez-moi'),
        h('a', { href: 'https://github.com/ulrichkone124-dotcom', target: '_blank', rel: 'noopener', className: 'social-btn', 'aria-label': 'GitHub' },
          h('i', { className: 'fa-brands fa-github' })),
        h('a', { href: 'https://www.linkedin.com/in/kone-gbah-ulrich-paul-david-138b083a1?', className: 'social-btn', 'aria-label': 'LinkedIn' },
          h('i', { className: 'fa-brands fa-linkedin-in' })),
        h('a', { href: 'mailto:ulrichkone124@gmail.com', className: 'social-btn', 'aria-label': 'Email' },
          h('i', { className: 'fa-solid fa-envelope' }))
      )
    ),

    h('div', { className: 'relative grid place-items-center fade-in-up delay-2' },
      // Wrapper de la photo : contient le halo, les anneaux et le cercle
      h('div', { className: 'relative w-72 h-72 md:w-96 md:h-96' },
        h('div', { className: 'hero-halo' }),
        h('div', { className: 'hero-ring' }),
        h('div', { className: 'hero-ring hero-ring-2' }),
        h('div', { className: 'float relative w-full h-full rounded-full border-2 border-gold bg-dark-soft grid place-items-center overflow-hidden text-gray-400 glow' },
          h('img', { src: 'photo.png', alt: 'Ulrich Koné Gbah', className: 'w-full h-full object-cover' }) 
        )
      ),
      h('div', { className: 'stats-box flex gap-6 mt-6 lg:mt-0 lg:absolute lg:-bottom-5 rounded-xl px-6 py-4 text-center' },
        h('div', { className: 'flex flex-col' }, h('strong', { className: 'text-gold text-xl' }, '1+'), h('small', { className: 'text-gray-400 text-xs' }, "Année d'études")),
        h('div', { className: 'flex flex-col' }, h('strong', { className: 'text-gold text-xl' }, '3+'), h('small', { className: 'text-gray-400 text-xs' }, 'Projets réalisés')),
        h('div', { className: 'flex flex-col' }, h('strong', { className: 'text-gold text-xl' }, '100%'), h('small', { className: 'text-gray-400 text-xs' }, 'Motivé'))
      )
    )
  );
}
// ===== À PROPOS =====
function About() {
  const licences = [
    { annee: '2026 - En cours', titre: 'Licence 3 professionnelle en Génie Réseaux Logiciel', lieu: "Pigier Côte d'Ivoire, Antenne Plateau" },
    { annee: '2024 – 2025', titre: 'Licence 2 professionnelle en Génie Réseaux Logiciel', lieu: "Pigier Côte d'Ivoire, Antenne Yamoussoukro" },
    { annee: '2023 – 2024', titre: 'Licence 1 professionnelle en Génie Réseaux Logiciel', lieu: "Pigier Côte d'Ivoire, Antenne Yamoussoukro" }
  ];

  return h('div', { id: 'apropos', className: 'card bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col' },
    h('span', { className: 'section-tag' }, '01 · À PROPOS DE MOI'),
    h('h2', { className: 'text-xl font-bold leading-snug mb-3' },
      'Développeur ', h('span', { className: 'text-gold' }, 'web & mobile')),
    h('p', { className: 'text-gray-400 text-sm leading-relaxed' },
      "Étudiant en Licence 3 en informatique, passionné par le développement web, le design et la conception d'interfaces numériques."),

    h('h3', { className: 'text-xs uppercase tracking-wider text-gold mt-5 mb-3' }, 'Parcours'),
    h('ul', { className: 'relative border-l border-gold/30 ml-1.5 space-y-3' },
      licences.map((l) =>
        h('li', { key: l.annee, className: 'relative pl-5 text-sm' },
          // Cercle doré devant chaque année
          h('span', { className: 'absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_rgba(245,197,66,0.6)]' }),
          h('span', { className: 'text-gold font-semibold text-xs' }, l.annee),
          h('span', { className: 'block text-white' }, l.titre),
          h('span', { className: 'block text-gray-500 text-xs' }, l.lieu)
        )
      )
    ),

    h('a', {
        href: 'CV_Kone_Gbah_Ulrich_Paul_David.pdf',
        download: true,
        className: 'btn-outline px-5 py-2.5 mt-auto self-start text-sm'
      },
      h('i', { className: 'fa-solid fa-download mr-2' }), 'Télécharger mon CV')
  );
}

// ===== COMPÉTENCES =====
function Skills() {
  const renderIcon = (skill) => {
    if (skill.img) {
      return h('img', { src: skill.img, alt: skill.name, className: 'w-6 h-6 object-contain' });
    }
    if (skill.letter) {
      return h('span', {
          className: 'w-6 h-6 grid place-items-center rounded font-bold text-sm text-white',
          style: { backgroundColor: skill.color }
        }, skill.letter);
    }
    return h('i', { className: `${skill.icon} text-xl`, style: { color: skill.color } });
  };

  return h('div', { id: 'competences', className: 'card bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col' },
    h('span', { className: 'section-tag' }, '02 · COMPÉTENCES'),
    h('h2', { className: 'text-xl font-bold mb-4' }, 'Technologies & ', h('span', { className: 'text-gold' }, 'Outils')),

    // auto-rows-fr : chaque ligne prend la même hauteur et la grille remplit la carte
    h('div', { className: 'grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 flex-1 auto-rows-fr' },
      skills.map((skill) =>
        h('div', {
            key: skill.name,
            className: 'flex items-center gap-3 px-3 py-3 bg-dark-soft border border-dark-border rounded-lg hover:border-gold transition duration-300'
          },
          renderIcon(skill),
          h('span', { className: 'text-xs text-gray-400 leading-tight truncate' }, skill.name)
        )
      )
    ),

    h('p', { className: 'flex items-center gap-2 text-xs text-gray-400 mt-4' },
      h('i', { className: 'fa-solid fa-bolt text-gold' }),
      'Toujours en apprentissage de ses technologies pour ameliorer mon niveau'
    )
  );
}

// ===== SERVICES =====
function Services() {
  return h(Reveal, { as: 'section', id: 'services', className: 'px-6 lg:px-12 py-8' },
    h('span', { className: 'section-tag' }, '03 · SERVICES'),
    h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6' },
      services.map((s) =>
        h('div', { key: s.title, className: 'card bg-dark-card border border-dark-border rounded-2xl p-6' },
          h('div', { className: 'icon-box' }, h('i', { className: s.icon })),
          h('h3', { className: 'font-semibold mb-2' }, s.title),
          h('p', { className: 'text-gray-400 text-sm mb-4' }, s.text),
          h('a', { href: '#', className: 'text-gold text-sm' }, 'En savoir plus →')
        )
      )
    )
  );
}

// ===== PROJETS =====
function ProjectCard({ project }) {
  const media = project.image
    ? h('img', { src: project.image, alt: project.title })
    : h('i', { className: project.icon });

  const github = project.github
    ? h('a', { href: project.github, target: '_blank', rel: 'noopener', className: 'link-btn' },
        h('i', { className: 'fa-brands fa-github' }), ' Code source')
    : h('span', { className: 'link-btn disabled' },
        h('i', { className: 'fa-brands fa-github' }), ' Code source');

  const demo = project.demo
    ? h('a', { href: project.demo, target: '_blank', rel: 'noopener', className: 'link-btn primary' },
        h('i', { className: 'fa-solid fa-arrow-up-right-from-square' }), ' Voir le site')
    : h('span', { className: 'link-btn primary disabled' },
        h('i', { className: 'fa-solid fa-arrow-up-right-from-square' }), ' Bientôt en ligne');

  return h(Reveal, { as: 'article', className: 'project-card' },
    h('div', { className: 'project-media' }, media),
    h('div', { className: 'project-body' },
      h('div', { className: 'project-tags' },
        project.tags.map((tag) => h('span', { key: tag }, tag))
      ),
      h('h3', null, project.title),
      h('p', null, project.description),
      h('div', { className: 'project-links' }, github, demo)
    )
  );
}

function Projects() {
  return h(Reveal, { as: 'section', id: 'projets', className: 'px-6 lg:px-12 py-8' },
    h('div', { className: 'mb-6' },
      h('span', { className: 'section-tag' }, '04 · PROJETS'),
      h('h2', { className: 'text-3xl font-bold' }, 'Mes ', h('span', { className: 'text-gold' }, 'réalisations'))
    ),
    h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' },
      projects.map((p) => h(ProjectCard, { key: p.title, project: p }))
    )
  );
}

// ===== AFFICHES : CARROUSEL =====
function AfficheCarousel({ onOpen }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  const getStep = () => {
    const track = trackRef.current;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    return track.firstElementChild.offsetWidth + gap;
  };

  const scrollToIndex = (i) => trackRef.current.scrollTo({ left: i * getStep(), behavior: 'smooth' });
  const prev = () => trackRef.current.scrollBy({ left: -getStep(), behavior: 'smooth' });
  const next = () => trackRef.current.scrollBy({ left: getStep(), behavior: 'smooth' });

  useEffect(() => {
    const track = trackRef.current;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / getStep());
      setActive(Math.min(index, affiches.length - 1));
    };
    track.addEventListener('scroll', onScroll, { passive: true });

    // Défilement automatique toutes les 4 secondes
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 5) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
      }
    }, 4000);

    return () => {
      track.removeEventListener('scroll', onScroll);
      clearInterval(timer);
    };
  }, []);

  return h(React.Fragment, null,
    h('div', { className: 'flex gap-3 justify-end mb-6' },
      h('button', { onClick: prev, 'aria-label': 'Précédent', className: 'arrow-btn' },
        h('i', { className: 'fa-solid fa-chevron-left' })),
      h('button', { onClick: next, 'aria-label': 'Suivant', className: 'arrow-btn' },
        h('i', { className: 'fa-solid fa-chevron-right' }))
    ),

    h('div', {
        ref: trackRef,
        className: 'carousel no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4',
        onMouseEnter: () => { pausedRef.current = true; },
        onMouseLeave: () => { pausedRef.current = false; },
        onTouchStart: () => { pausedRef.current = true; },
        onTouchEnd: () => { pausedRef.current = false; }
      },
      affiches.map((a, i) =>
        h('button', {
            key: a.src,
            onClick: () => onOpen(i),
            className: 'affiche-card snap-start shrink-0 w-72 sm:w-80 text-left bg-dark-card border border-dark-border rounded-2xl overflow-hidden'
          },
          h('div', { className: 'affiche-img h-96 bg-dark-soft' },
            h('img', { src: a.src, alt: a.title, loading: 'lazy', className: 'w-full h-full object-cover' })
          ),
          h('div', { className: 'p-5' },
            h('span', { className: 'text-xs text-gold' }, 'Affiche · Commerce'),
            h('h3', { className: 'font-semibold text-lg mt-1' }, a.title),
            h('p', { className: 'text-gray-400 text-sm' }, a.desc)
          )
        )
      )
    ),

    h('div', { className: 'flex justify-center gap-2 mt-4' },
      affiches.map((a, i) =>
        h('button', {
          key: a.src,
          onClick: () => scrollToIndex(i),
          'aria-label': `Aller à l'affiche ${i + 1}`,
          className: `dot ${i === active ? 'active' : ''}`
        })
      )
    )
  );
}

function Affiches({ onOpen }) {
  return h(Reveal, { as: 'section', id: 'affiches', className: 'px-6 lg:px-12 py-8' },
    h('div', { className: 'mb-6' },
      h('span', { className: 'section-tag' }, '05 · AFFICHES DE COMMERCE'),
      h('h2', { className: 'text-3xl font-bold' }, 'Mes ', h('span', { className: 'text-gold' }, 'créations graphiques')),
      h('p', { className: 'text-gray-400 text-sm mt-2' }, 'Clique sur une affiche pour la voir en grand.')
    ),
    h(AfficheCarousel, { onOpen })
  );
}

// ===== LIGHTBOX =====
function Lightbox({ index, onClose, onPrev, onNext }) {
  const open = index !== null;
  const item = open ? affiches[index] : null;

  // Bloque le scroll de la page et écoute le clavier quand la lightbox est ouverte
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, onPrev, onNext]);

  return h('div', {
      className: `lightbox fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 ${open ? 'open' : ''}`,
      onClick: (e) => { if (e.target === e.currentTarget) onClose(); },
      'aria-hidden': !open
    },
    h('button', { onClick: onClose, 'aria-label': 'Fermer', className: 'absolute top-5 right-5 text-3xl text-white hover:text-gold transition' },
      h('i', { className: 'fa-solid fa-xmark' })),
    h('button', { onClick: onPrev, 'aria-label': 'Précédente', className: 'arrow-btn absolute left-4 top-1/2 -translate-y-1/2' },
      h('i', { className: 'fa-solid fa-chevron-left' })),
    h('figure', { className: 'lb-content max-w-4xl max-h-[90vh] flex flex-col items-center' },
      item && h(React.Fragment, null,
        h('img', { src: item.src, alt: item.title, className: 'max-h-[80vh] w-auto rounded-xl shadow-2xl' }),
        h('figcaption', { className: 'mt-4 text-gray-300 text-sm' }, item.title)
      )
    ),
    h('button', { onClick: onNext, 'aria-label': 'Suivante', className: 'arrow-btn absolute right-4 top-1/2 -translate-y-1/2' },
      h('i', { className: 'fa-solid fa-chevron-right' }))
  );
}

// ===== EXPÉRIENCE =====
function Experience() {
  return h(Reveal, { as: 'section', id: 'experience', className: 'px-6 lg:px-12 py-8' },
    h('span', { className: 'section-tag' }, '06 · EXPÉRIENCE & FORMATION'),
    h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 border-t border-dark-border' },
      experiences.map((e) =>
        h('div', { key: e.title, className: 'timeline-item relative pt-4' },
          h('i', { className: `${e.icon} text-gold mb-2` }),
          h('h3', { className: 'font-semibold mb-1' }, e.title),
          h('span', { className: 'text-gold text-sm' }, e.date),
          h('p', { className: 'text-gray-400 text-sm mt-2' }, e.text)
        )
      )
    )
  );
}

// ===== CONTACT =====
function Contact() {
  // Ouvre WhatsApp avec le message du visiteur déjà écrit
  const envoyer = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const texte =
      `Bonjour Ulrich, je suis ${data.get('nom')} (${data.get('email')}).\n` +
      `Sujet : ${data.get('sujet') || 'Non précisé'}\n\n` +
      `${data.get('message')}`;
    const url = `https://wa.me/2250761005948?text=${encodeURIComponent(texte)}`;
    window.open(url, '_blank');
  };

  // Coordonnées cliquables : email (mailto) et WhatsApp (wa.me)
  const coordonnees = [
    {
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      valeur: 'ulrichkone124@gmail.com',
      href: 'mailto:ulrichkone124@gmail.com'
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: 'WhatsApp',
      valeur: '0761005948',
      href: 'https://wa.me/2250761005948',
      externe: true
    },
    {
      icon: 'fa-solid fa-location-dot',
      label: 'Localisation',
      valeur: "Côte d'Ivoire",
      href: null
    }
  ];

  return h(Reveal, { as: 'section', id: 'contact', className: 'grid lg:grid-cols-[1fr_1.4fr_1fr] gap-6 items-start px-6 lg:px-12 py-8' },
    h('div', null,
      h('span', { className: 'section-tag' }, '07 · CONTACT'),
      h('h2', { className: 'text-3xl font-bold leading-snug mb-4' },
        'Travaillons ensemble', h('br'), h('span', { className: 'text-gold' }, 'sur votre projet.')
      ),
      h('p', { className: 'text-gray-400' }, 'Un projet en tête ? Écrivez-moi, je vous réponds rapidement.')
    ),

    h('form', { className: 'bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col gap-4', onSubmit: envoyer },
      h('div', { className: 'grid sm:grid-cols-2 gap-4' },
        h('input', { type: 'text', name: 'nom', placeholder: 'Votre nom', required: true, className: 'field' }),
        h('input', { type: 'email', name: 'email', placeholder: 'Votre email', required: true, className: 'field' })
      ),
      h('input', { type: 'text', name: 'sujet', placeholder: 'Sujet', className: 'field' }),
      h('textarea', { name: 'message', rows: 4, placeholder: 'Votre message', required: true, className: 'field resize-y' }),
      h('button', { type: 'submit', className: 'btn-gold self-start px-6 py-3' },
        h('i', { className: 'fa-brands fa-whatsapp mr-2' }), 'Envoyer sur WhatsApp')
    ),

    h('div', { className: 'bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col gap-4' },
      coordonnees.map((c) => {
        const contenu = [
          h('span', { key: 'icone', className: 'info-icon' }, h('i', { className: c.icon })),
          h('div', { key: 'texte' },
            h('small', { className: 'text-gray-400 text-xs' }, c.label),
            h('p', { className: 'text-sm' }, c.valeur)
          )
        ];

        // Sans lien (localisation) : simple bloc non cliquable
        if (!c.href) {
          return h('div', { key: c.label, className: 'flex gap-4 items-start p-3 -m-3' }, contenu);
        }

        // Avec lien : toute la ligne est cliquable
        return h('a', {
            key: c.label,
            href: c.href,
            target: c.externe ? '_blank' : undefined,
            rel: c.externe ? 'noopener' : undefined,
            className: 'flex gap-4 items-start p-3 -m-3 rounded-xl hover:bg-dark-soft hover:text-gold transition duration-300'
          },
          contenu
        );
      })
    )
  );
}
// ===== FOOTER =====
function Footer() {
  return h('footer', { className: 'flex justify-between px-6 lg:px-12 py-6 mt-8 border-t border-dark-border text-gray-400 text-sm' },
    h('span', null, '© 2026 UlrichDev. Tous droits réservés.'),
    h('a', { href: '#accueil', className: 'text-gold' }, 'Retour en haut ', h('i', { className: 'fa-solid fa-arrow-up ml-1' }))
  );
}

// ===== APPLICATION =====
function App() {
  const [lbIndex, setLbIndex] = useState(null);
  const total = affiches.length;

  return h(React.Fragment, null,
    h(Navbar),
    h('main', null,
      h(Hero),
      h(Reveal, { as: 'section', className: 'grid lg:grid-cols-[1fr_1.2fr] gap-6 px-6 lg:px-12 py-8' },
        h(About),
        h(Skills)
      ),
      h(Services),
      h(Projects),
      h(Affiches, { onOpen: setLbIndex }),
      h(Experience),
      h(Contact)
    ),
    h(Footer),
    h(Lightbox, {
      index: lbIndex,
      onClose: () => setLbIndex(null),
      onPrev: () => setLbIndex((i) => (i - 1 + total) % total),
      onNext: () => setLbIndex((i) => (i + 1) % total)
    })
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
const projectCount = document.querySelector('.project-count');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.textContent = isLight ? 'Modo escuro' : 'Modo claro';
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function updateProjects(filter) {
  let visible = 0;
  projectCards.forEach((card) => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !matches);
    if (matches) visible += 1;
  });
  if (projectCount) projectCount.textContent = String(visible).padStart(2, '0') + ' projetos';
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    updateProjects(filter);
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

updateProjects('all');

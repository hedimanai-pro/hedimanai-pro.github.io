// main.js
/* DARK MODE */
const sunPaths = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';

let isDark = false;
try {
  isDark = localStorage.getItem('theme') === 'dark';
} catch (e) {
  // localStorage blocked
}
document.documentElement.classList.toggle('dark', isDark);

function renderThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.innerHTML = isDark ? moonPath : sunPaths;
}

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.classList.toggle('dark', isDark);
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) { }
  renderThemeIcon();
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  renderThemeIcon();
});

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  if (e.key === 'd' || e.key === 'D') toggleTheme();
});

/* SCROLL REVEAL (Global) */
document.addEventListener('DOMContentLoaded', () => {
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in'); // standardizing on .in
        // for index.html compatibility we also add .visible
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
});

/* INDEX NAV SCROLL SPY (Only runs on homepage) */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('home')) return; // Exit if not on homepage

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const NAV_H = 52;

  function updateSpy() {
    const scrollY = window.scrollY;
    const threshold = scrollY + NAV_H + window.innerHeight * 0.3;

    let activeId = sections[0]?.id;
    sections.forEach(s => {
      if (s.offsetTop <= threshold) activeId = s.id;
    });

    if (activeId) {
      navLinks.forEach(l => {
        const href = l.getAttribute('href') || '';
        const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
        l.classList.toggle('active', hash === '#' + activeId);
      });
    }
  }

  let spyRaf;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(spyRaf);
    spyRaf = requestAnimationFrame(updateSpy);
  }, { passive: true });

  updateSpy(); // run once on load
});
// article.js
/* READING PROGRESS */
document.addEventListener('DOMContentLoaded', () => {
  const pf = document.getElementById('pf');
  if (pf) {
    window.addEventListener('scroll', () => {
      const d = document.documentElement;
      const h = d.scrollHeight - d.clientHeight;
      pf.style.width = (h > 0 ? (d.scrollTop / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ARTICLE TOC SCROLL SPY */
  const allTocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.section[id], h3[id]');

  if (allTocLinks.length > 0 && sections.length > 0) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const links = document.querySelectorAll(`.toc-link[href="#${e.target.id}"]`);
        if (e.isIntersecting) {
          allTocLinks.forEach(l => l.classList.remove('active'));
          links.forEach(l => l.classList.add('active'));
        }
      });
    }, { rootMargin: '-52px 0px -55% 0px', threshold: 0 });

    sections.forEach(s => spy.observe(s));
  }
});
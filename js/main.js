(() => {
  // Active navigation state uses native scrolling and works without GSAP.
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  if ('IntersectionObserver' in window && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-current', active);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
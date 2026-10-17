(() => {
  const menuButton = document.querySelector('#menuToggle');
  const mobileMenu = document.querySelector('#mobileMenu');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.fromTo(card, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .45, ease: 'power2.out', clearProps: 'transform' });
        }
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('is-active'))));

  const form = document.querySelector('#contactForm');
  const feedback = document.querySelector('#formFeedback');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const type = String(data.get('projectType') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry — ${type}`);
    const body = encodeURIComponent(`Hi Sudipta,\n\nMy name is ${name} (${email}).\n\nProject type: ${type}\n\nProject details:\n${message}\n\n`);
    // Replace this address with the real recipient before publishing.
    const recipient = 'hello@example.com';
    feedback.textContent = 'Opening your email app. Replace hello@example.com with your real email before publishing.';
    feedback.className = 'form-feedback mono is-success';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('#progressBar');
  let ticking = false;
  function updateScrollUI() {
    const scrollY = window.scrollY || 0;
    header?.classList.toggle('is-scrolled', scrollY > 24);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${scrollable > 0 ? (scrollY / scrollable) * 100 : 0}%`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();

  // Subtle magnetic movement on pointer devices only.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .08;
        const y = (event.clientY - rect.top - rect.height / 2) * .08;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }
})();
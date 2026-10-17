(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  if (!hasGSAP || reduceMotion) {
    document.querySelectorAll('.reveal-up,.hero-title .title-line,.hero-art,.eyebrow,.hero-topline,.hero-bottomline').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling is optional: the site remains fully usable if the CDN is unavailable.
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    try {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      window.__portfolioLenis = lenis;
    } catch (error) {
      console.warn('Smooth scrolling could not initialize; native scrolling will be used.', error);
    }
  }

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro.to('.hero-topline', { opacity: 1, duration: .6 }, .05)
    .to('.hero .eyebrow', { opacity: 1, y: 0, duration: .6 }, .18)
    .to('.hero-title .title-line', { opacity: 1, y: 0, duration: .85, stagger: .12 }, .22)
    .to('.hero-description', { opacity: 1, y: 0, duration: .65 }, .72)
    .to('.hero-actions', { opacity: 1, y: 0, duration: .65 }, .82)
    .to('.hero-art', { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, .4)
    .to('.hero-bottomline', { opacity: 1, duration: .6 }, 1);

  gsap.to('.orb-core', { rotate: 360, duration: 38, repeat: -1, ease: 'none' });
  gsap.to('.orbit-one', { rotate: '+=360', duration: 70, repeat: -1, ease: 'none' });
  gsap.to('.orbit-two', { rotate: '-=360', duration: 90, repeat: -1, ease: 'none' });
  gsap.to('.tag-a', { y: -9, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.tag-b', { y: 8, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.strip-track', { xPercent: -16, ease: 'none', scrollTrigger: { trigger: '.intro-strip', start: 'top bottom', end: 'bottom top', scrub: .5 } });

  gsap.utils.toArray('.reveal-up').forEach(element => {
    // Hero elements are handled by the intro timeline.
    if (element.closest('.hero')) return;
    gsap.to(element, {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    });
  });

  gsap.utils.toArray('.project-visual').forEach((visual, index) => {
    const card = visual.closest('.project-card');
    if (!card) return;
    visual.addEventListener('pointermove', event => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const rect = visual.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - .5) * -2;
      const ry = ((event.clientX - rect.left) / rect.width - .5) * 2;
      gsap.to(visual, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: .4, ease: 'power2.out' });
    });
    visual.addEventListener('pointerleave', () => gsap.to(visual, { rotateX: 0, rotateY: 0, duration: .5, ease: 'power2.out' }));
  });

  gsap.utils.toArray('.manifesto-title').forEach(title => {
    gsap.fromTo(title, { x: -30 }, { x: 0, ease: 'none', scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom top', scrub: .7 } });
  });

  // Keep ScrollTrigger measurements correct after fonts and layout settle.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
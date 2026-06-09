(() => {
  'use strict';

  // --- Intersection Observer: fade-in animations ---
  const animElements = document.querySelectorAll(
    '.anim-fade-up, .anim-fade-right, .anim-fade-left'
  );

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  animElements.forEach((el) => animObserver.observe(el));

  // --- Dot navigation: highlight active section ---
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.dot-nav .dot');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dots.forEach((dot) => {
            dot.classList.toggle('active', dot.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // --- Smooth scroll for dot nav clicks ---
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Parallax-lite: move glows on scroll ---
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const glows = document.querySelectorAll('.hero-glow, .project-glow');
        glows.forEach((glow) => {
          const rect = glow.parentElement.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2) / window.innerHeight;
          glow.style.transform = `translateY(${offset * 30}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Hide scroll hint after first scroll ---
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    let hidden = false;
    window.addEventListener('scroll', () => {
      if (!hidden && window.scrollY > 100) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.6s ease';
        hidden = true;
      }
    });
  }

  // --- Staggered card hover glow ---
  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.background = `radial-gradient(
        300px circle at var(--mouse-x) var(--mouse-y),
        rgba(255,255,255,0.04),
        #141420
      )`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

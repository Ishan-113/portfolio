// ===== Helpers =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const isTouch = window.matchMedia('(hover: none)').matches;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Scroll progress + nav scrolled =====
const progress = $('#scrollProgress');
const navbar = $('#navbar');
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progress) progress.style.width = scrolled + '%';
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);

      // active nav
      const sections = $$('section[id]');
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
      $$('.nav-links a').forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
      });
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Reveal observer (once) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Defer reveal until DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Stagger reveals
  const reveals = $$('.reveal');
  reveals.forEach((el, i) => {
    // slight stagger for groups
    if (el.closest('.projects-grid') || el.closest('.skills-grid') || el.closest('.about-right') || el.closest('.contact-grid')) {
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    }
    revealObserver.observe(el);
  });

  // Hero already visible quickly
  $$('.hero .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${0.15 + i * 0.12}s`;
    // ensure hero reveals even if already in view
    setTimeout(() => el.classList.add('visible'), 100 + i * 100);
  });

  initFilters();
  initContactHover();
});

// ===== Project filters =====
function initFilters() {
  const btns = $$('.filter-btn');
  const cards = $$('.project-card');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const cats = (c.dataset.category || '').split(' ');
        const isFeatured = c.classList.contains('featured');
        const show = f === 'featured' ? isFeatured : f === 'all' || cats.includes(f);
        c.classList.toggle('hidden', !show);
        if (show) {
          c.style.animation = 'none';
          c.offsetHeight; // reflow
          c.style.animation = '';
        }
      });
    });
  });
}

// ===== Contact card mouse glow =====
function initContactHover() {
  if (isTouch) return;
  $$('.contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

// ===== Mobile hamburger =====
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  // close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }
  });
}

// ===== Smooth scroll for anchor links (offset for fixed nav) =====
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = $(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
        history.pushState(null, '', id);
      }
    }
  });
});

// ===== Reduced motion: ensure reveals visible =====
if (prefersReduced) {
  $$('.reveal').forEach(el => el.classList.add('visible'));
}

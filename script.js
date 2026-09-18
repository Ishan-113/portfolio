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

      // blob parallax (desktop only)
      if (!isTouch && !prefersReduced) {
        const y = window.scrollY;
        const b1 = $('.blob1'), b2 = $('.blob2'), b3 = $('.blob3');
        if (b1) b1.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        if (b2) b2.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (b3) b3.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
      }
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

  typeEffect();
  initCounters();
  initTilt();
  initFilters();
  initContactHover();
});

// ===== Typing effect =====
function typeEffect() {
  const el = $('.typed');
  if (!el || prefersReduced) return;
  const full = el.textContent;
  el.textContent = '';
  el.style.borderRight = '2px solid #60a5fa';
  let i = 0;
  const t = setInterval(() => {
    el.textContent += full[i++] ?? '';
    if (i >= full.length) {
      clearInterval(t);
      setTimeout(() => { el.style.borderRight = 'none'; }, 600);
    }
  }, 38);
}

// ===== Counters =====
function initCounters() {
  const stats = $('#heroStats');
  if (!stats) return;
  const counters = $$('.stat span[data-count]');
  let done = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !done) {
        done = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.count);
          const isDecimal = counter.dataset.decimal === 'true';
          let cur = 0;
          const steps = 50;
          const inc = target / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            cur += inc;
            if (step >= steps) { cur = target; clearInterval(timer); }
            counter.textContent = isDecimal ? cur.toFixed(2) : Math.floor(cur);
          }, 18);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.5 });
  io.observe(stats);
}

// ===== 3D Tilt (performant, rAF) =====
function initTilt() {
  if (isTouch || prefersReduced) return;
  $$('.project-card, .cyber-card').forEach(card => {
    let raf = null;
    let mouseX = 0, mouseY = 0;
    function update() {
      raf = null;
      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2, cy = rect.height / 2;
      const rx = (mouseY - cy) / 14;
      const ry = (cx - mouseX) / 14;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    }
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(update);
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
}

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
        const show = f === 'all' || cats.includes(f);
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

// ===== Cursor system (desktop only, rAF) =====
if (!isTouch && !prefersReduced) {
  const glow = document.createElement('div'); glow.className = 'cursor-glow';
  const dot = document.createElement('div'); dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.append(glow, ring, dot);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let lx = 0, ly = 0;
  const LERP = 0.11;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    glow.style.left = mx + 'px'; glow.style.top = my + 'px';
    // trail throttled
    if (Math.hypot(mx - lx, my - ly) > 22) { lx = mx; ly = my; spawnTrail(mx, my); }
  }, { passive: true });

  // hide when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; glow.style.opacity = '1'; });

  function animate() {
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // hover state
  const hoverSel = 'a, button, .project-card, .about-card, .contact-card, .cert-card, .skill-item, .btn-primary, .btn-secondary, .cyber-card, .htb-pill, .filter-btn';
  $$('.project-card, .about-card, .contact-card, .cert-card, .skill-item, .cyber-card, .htb-pill').forEach(el => {
    // use delegation via existing elements; also handle dynamically
  });
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSel)) {
      // check if still hovering another interactive
      const still = document.querySelector(':hover');
      if (!still || !still.closest(hoverSel)) document.body.classList.remove('cursor-hover');
    }
  });

  function spawnTrail(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-trail';
    const s = Math.random() * 4 + 3;
    const hue = Math.random() > 0.5 ? 210 : 240;
    p.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:hsla(${hue},100%,70%,0.65);box-shadow:0 0 ${s*2}px hsla(${hue},100%,70%,0.45)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 550);
  }
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

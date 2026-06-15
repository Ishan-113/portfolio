// ============ SCROLL ANIMATIONS (bidirectional) ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.remove('exit-up');
      el.classList.add('visible');
    } else {
      // Only vanish upward if element is above viewport (scrolled past)
      if (entry.boundingClientRect.top < 0) {
        el.classList.add('exit-up');
        el.classList.remove('visible');
      } else {
        // Coming from below — just un-visible so it can re-enter
        el.classList.remove('visible');
        el.classList.remove('exit-up');
      }
    }
  });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  // Staggered fade-up for cards
  const cards = document.querySelectorAll('.project-card, .about-card, .skill-group, .cert-card, .contact-card, .cyber-card, .htb-pill, .cyber-writeups-link');
  cards.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // Section titles
  document.querySelectorAll('.section-title, .section-tag, .contact-desc, .cyberlab-desc').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // Typing effect on load
  typeEffect();

  // Counter: trigger when hero stats scroll into view
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(statsEl);
  }

  // Card tilt (inside DOMContentLoaded so cards exist)
  document.querySelectorAll('.project-card, .cyber-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
});

// ============ ACTIVE NAV ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const isTouchDevice = window.matchMedia('(hover: none)').matches;

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav-active');
    }
  });

  // Parallax on hero blobs — skip on touch devices
  if (!isTouchDevice) {
    const scrollY = window.scrollY;
    const blob1 = document.querySelector('.blob1');
    const blob2 = document.querySelector('.blob2');
    if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
    if (blob2) blob2.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
});

// ============ COUNTER ANIMATION ============
function animateCounters() {
  const counters = document.querySelectorAll('.stat span');
  counters.forEach(counter => {
    const target = parseFloat(counter.textContent);
    const isDecimal = counter.textContent.includes('.');
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
    }, 20);
  });
}

// ============ TYPING EFFECT ============
function typeEffect() {
  const el = document.querySelector('.typed');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  el.style.borderRight = '2px solid #60a5fa';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(() => { el.style.borderRight = 'none'; }, 500);
    }
  }, 50);
}

// ============ CURSOR SYSTEM (desktop only) ============
if (!isTouchDevice) {
  // Create elements
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';

  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';

  document.body.appendChild(cursorGlow);
  document.body.appendChild(cursorRing);
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let lastTrailX = 0, lastTrailY = 0;
  const LERP = 0.12; // smoother ring follow

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left  = mouseX + 'px';
    cursorDot.style.top   = mouseY + 'px';
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top  = mouseY + 'px';

    const dx = mouseX - lastTrailX;
    const dy = mouseY - lastTrailY;
    if (Math.hypot(dx, dy) > 18) {
      lastTrailX = mouseX;
      lastTrailY = mouseY;
      spawnTrailParticle(mouseX, mouseY);
    }
  });

  // RAF loop — ring lerps toward mouse every frame (silky smooth)
  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const interactiveSelector = 'a, button, .project-card, .about-card, .contact-card, .cert-card, .skill-item, .btn-primary, .btn-secondary, .cyber-card, .htb-pill, .cyber-writeups-link';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  function spawnTrailParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-trail';
    const size = Math.random() * 5 + 3; // 3–8px
    const hue = Math.random() > 0.5 ? '210' : '240'; // blue or indigo
    p.style.cssText = `
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: hsla(${hue}, 100%, 70%, 0.7);
      box-shadow: 0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.5);
    `;
    document.body.appendChild(p);
    // Remove after animation completes
    setTimeout(() => p.remove(), 500);
  }
}

// ============ MOBILE HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('mobile-open');
    document.body.style.overflow = navLinksEl.classList.contains('mobile-open') ? 'hidden' : '';
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

// ============ SMOOTH SCROLL FOR NAV ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ SECTION HIGHLIGHT ON SCROLL ============
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-highlight');
    } else {
      entry.target.classList.remove('section-highlight');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

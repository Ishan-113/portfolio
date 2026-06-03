// ============ SCROLL ANIMATIONS ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  // Staggered fade-up for cards
  const cards = document.querySelectorAll('.project-card, .about-card, .skill-group, .cert-card, .contact-card');
  cards.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // Section titles
  document.querySelectorAll('.section-title, .section-tag, .contact-desc').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // Start counters when hero is visible
  animateCounters();

  // Typing effect
  typeEffect();
});

// ============ ACTIVE NAV ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

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

  // Parallax on hero blobs
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.blob1');
  const blob2 = document.querySelector('.blob2');
  if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (blob2) blob2.style.transform = `translateY(${scrollY * 0.1}px)`;
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

// ============ PROJECT CARD TILT ============
document.querySelectorAll('.project-card').forEach(card => {
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
});

// ============ SKILL BAR ANIMATION ============
const skillLevels = {
  'HTML5': 85, 'CSS3': 80, 'JavaScript': 70, 'C': 60,
  'Git & GitHub': 75, 'Vercel': 70, 'VS Code': 85, 'Node.js': 40,
  'REST APIs': 65, 'localStorage': 70, 'Networking': 60, 'Cybersecurity': 45,
  'React.js': 15, 'Node.js + Express': 10, 'Databases': 10, 'Ethical Hacking': 20
};

// ============ CURSOR GLOW ============
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ============ MOBILE HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close menu when a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ HIGHLIGHT SECTIONS ON SCROLL ============
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

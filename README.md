# Ishan Prajapati — Portfolio

[![HTML](https://img.shields.io/badge/HTML5-Markup-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-Styling-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://portfolio-ishan-1224.vercel.app)

Personal portfolio for Ishan Prajapati — Computer Engineering student and web developer. Projects verified against public GitHub repos; internship documents inspected before publishing.

## Live Links

- Portfolio: [portfolio-ishanp.vercel.app](https://portfolio-ishanp.vercel.app)
- Resume: [portfolio-ishanp.vercel.app/resume.html](https://portfolio-ishanp.vercel.app/resume.html)
- GitHub: [github.com/Ishan-113](https://github.com/Ishan-113)
- Writeups: [github.com/Ishan-113/pentest-writeups](https://github.com/Ishan-113/pentest-writeups)

## Overview

Static portfolio built with vanilla HTML, CSS, JS — no build step, no framework. Highlights:

- 14 project cards (13 with live demos, 1 team hackathon prototype), each linked to its public repo
- Experience & Recognition section with InAmigos internship documents (preview + download)
- ATS-friendly single-column resume page with matching one-page PDF download
- Filterable project grid (All / Full-Stack / AI & Data / Frontend / Security)
- Dedicated Cybersecurity Lab section
- Cisco verified certifications (x3)
- Subtle animations: scroll progress, staggered reveals, 3D tilt, custom cursor (desktop, no trail spam)
- Fully responsive + `prefers-reduced-motion` + accessible nav

## Featured Projects (newest first)

| Project | Stack | Live | Repo |
| --- | --- | --- | --- |
| **InnoVate** — E-Cell Innovation Challenge Dashboard | React, Vite, Apps Script, Google Sheets | [Live](https://inno-vate-seven.vercel.app) | [GitHub](https://github.com/Ishan-113/InnoVate) |
| **WasteWise** — Recycle. Earn. Repeat. | Java 17, Spring Boot 3.3, MySQL, JWT, HTML/CSS/JS | [Live (frontend; API runs locally)](https://wastewise-nine-bay.vercel.app/index.html) | [GitHub](https://github.com/Ishan-113/Wastewise) |
| **Artify** — Where Creativity Comes to Life | JS, Node/Express, Render | [Live](https://artify-5g0q.onrender.com) | [GitHub](https://github.com/Ishan-113/Artify) |
| **SkillAlign** — SIH PS 26134 (Govt. of Maharashtra) | Python, FastAPI, SQLite | [Live](https://skill-align-nu.vercel.app) | [GitHub](https://github.com/Ishan-113/SkillAlign) |
| **AGROSAFE** — Crop Diagnosis | React, TensorFlow/MobileNetV2, FastAPI, Supabase | [Live](https://agrosafe-tawny.vercel.app) | [GitHub](https://github.com/Ishan-113/AGROSAFE) |
| **Secure Login App** | React + Vite, Tailwind, Express, MongoDB, JWT | [Live](https://secure-login-app-teal.vercel.app) | [GitHub](https://github.com/Ishan-113/secure-login-app) |
| **InternGuard AI** — Email Risk Analyzer | JS, client-side scoring, Vercel | [Live](https://internguard-ai.vercel.app) | [GitHub](https://github.com/Ishan-113/internguard-ai) |
| ALETHEIA — Misinformation Defense Engine | JS, REST, SSE (team hackathon prototype) | — | — |
| Weather App | REST API, async/await | [Live](https://weather-app-chi-two-25.vercel.app/) | [GitHub](https://github.com/Ishan-113/weather-app) |
| Expense Tracker | localStorage | [Live](https://expense-tracker-ishan-1224.vercel.app) | [GitHub](https://github.com/Ishan-113/expense-tracker) |
| Blackjack Game | Game logic | [Live](https://blackjack-alpha-wine.vercel.app/) | [GitHub](https://github.com/Ishan-113/blackjack) |
| GoT Lore Map | Interactive map | [Live](https://go-t-lore-map.vercel.app/) | [GitHub](https://github.com/Ishan-113/GoT-Lore-Map) |
| Pentest Cheatsheet Terminal | Kali-style UI | [Live](https://pentest-cheatsheet-tau.vercel.app/) | [GitHub](https://github.com/Ishan-113/Pentest_cheatsheet) |
| This Portfolio | Animations, responsive | [Live](https://portfolio-ishan-1224.vercel.app/) | [GitHub](https://github.com/Ishan-113/portfolio) |

> **Note:** `pentest-writeups` and `Business-card` are on GitHub but not featured as project cards. ALETHEIA is a team hackathon prototype with no public repo link.

## Experience & Recognition

- Web Development Intern, InAmigos Foundation (Remote, 10–23 Sept 2026)
- Certificate of Internship (27 Sept 2026), Certificate of Appreciation (28 Sept 2026), Letter of Recommendation from the Founder & CEO (27 Sept 2026)
- PDFs + thumbnails live in `assets/certificates/` with preview/download links on the site

## Cybersecurity Lab

> Educational only — authorized labs, CTFs, intentionally vulnerable VMs.

- Kali Linux 2026.1 on VMware + Metasploitable2 + DVWA
- TryHackMe Guided Pentest (Web + Infra) — 100%
- HackTheBox: Meow, Fawn, Dancing, Redeemer, Appointment, Sequel, Crocodile, Responder, Cap
- Tools: Nmap, Burp Suite, Metasploit, John the Ripper, linPEAS, etc.
- Writeups: [github.com/Ishan-113/pentest-writeups](https://github.com/Ishan-113/pentest-writeups)

## Tech Stack

- **Languages:** JavaScript, Python, Java, HTML5, CSS3, C/C++
- **Frontend:** React 19, Tailwind CSS, Vite, Responsive Design
- **Backend:** Node.js + Express, FastAPI, Spring Boot, JWT/bcrypt
- **Data:** MongoDB, MySQL, Supabase, SQLite
- **Infra:** Vercel, Render, Git/GitHub, VMware
- **Animations:** IntersectionObserver reveals, rAF tilt, custom cursor (desktop, no trail), scroll progress

## Animations

- Scroll progress bar, filter transitions, rAF-throttled cursor, staggered `IntersectionObserver` reveals, contact-card radial glow, `prefers-reduced-motion` support, nav scrolled state
- Typing effect, animated counters, cursor trail particles and scroll parallax were removed to keep motion purposeful
- **Performance:** `transform`/`opacity` only, `will-change`, passive listeners, debounced via `requestAnimationFrame`

## Repository Structure

```text
portfolio/
├── index.html      # main portfolio (projects, experience, lab, contact)
├── resume.html     # ATS-friendly single-column resume (HTML + PDF download + print)
├── resume.legacy.html  # backup of the previous resume page (not linked)
├── style.css       # single stylesheet, no framework
├── script.js       # vanilla JS (reveals, tilt, filters, cursor, nav)
├── assets/
│   ├── Ishan_Prajapati_Resume.pdf  # generated ATS-friendly one-page PDF (reportlab)
│   └── certificates/               # InAmigos PDFs + preview thumbnails
└── README.md
```

No build step.

## Run Locally

```bash
git clone https://github.com/Ishan-113/portfolio.git
cd portfolio
python -m http.server 4173 --bind 127.0.0.1
# visit http://127.0.0.1:4173/index.html
```

Or just open `index.html`.

## Author

Made by Ishan Prajapati.

- GitHub: [github.com/Ishan-113](https://github.com/Ishan-113)
- LinkedIn: [linkedin.com/in/ishan-prajapati-607b953b5](https://linkedin.com/in/ishan-prajapati-607b953b5)
- Email: ishanprajapati12112007@gmail.com

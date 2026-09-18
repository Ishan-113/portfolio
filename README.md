# Ishan Prajapati — Portfolio

[![HTML](https://img.shields.io/badge/HTML5-Markup-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-Styling-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://portfolio-ishan-1224.vercel.app)

Personal portfolio for Ishan Prajapati — Computer Engineering student, full-stack developer & cybersecurity enthusiast. 12 live projects on GitHub (14 repos total).

## Live Links

- Portfolio: [portfolio-ishan-1224.vercel.app](https://portfolio-ishan-1224.vercel.app)
- Resume: [portfolio-ishan-1224.vercel.app/resume.html](https://portfolio-ishan-1224.vercel.app/resume.html)
- GitHub: [github.com/Ishan-113](https://github.com/Ishan-113)
- Writeups: [github.com/Ishan-113/pentest-writeups](https://github.com/Ishan-113/pentest-writeups)

## Overview

Static portfolio built with vanilla HTML, CSS, JS — no build step, no framework. Highlights:

- 12 live projects (6 new full-stack/AI builds from Summer 2026)
- Filterable project grid (All / Full-Stack / AI & Data / Frontend / Security)
- Dedicated Cybersecurity Lab section
- Compact print-ready resume with all projects
- Cisco verified certifications (x3)
- Polished animations: scroll progress, staggered reveals, 3D tilt, magnetic cursor, parallax blobs
- Fully responsive + `prefers-reduced-motion` + accessible nav

## Featured Projects (newest first)

| Project | Stack | Live | Repo |
| --- | --- | --- | --- |
| **WasteWise** — Recycle. Earn. Repeat. | Java 17, Spring Boot 3.3, MySQL, JWT, HTML/CSS/JS | — | [GitHub](https://github.com/Ishan-113/Wastewise) |
| **Artify** — Where Creativity Comes to Life | JS, Node/Express, Render | [Live](https://artify-5g0q.onrender.com) | [GitHub](https://github.com/Ishan-113/Artify) |
| **SkillAlign** — SIH PS 26134 (Govt. of Maharashtra) | Python, FastAPI, MongoDB/SQLite | [Live](https://skill-align-nu.vercel.app) | [GitHub](https://github.com/Ishan-113/SkillAlign) |
| **AGROSAFE** — Crop Diagnosis | React 19, Tailwind 4, Python FastAPI, Supabase | [Live](https://agrosafe-tawny.vercel.app) | [GitHub](https://github.com/Ishan-113/AGROSAFE) |
| **Secure Login App** | React + Vite, Tailwind, Express, MongoDB, JWT | [Live](https://secure-login-app-teal.vercel.app) | [GitHub](https://github.com/Ishan-113/secure-login-app) |
| **InternGuard AI** — Email Risk Analyzer | JS, AI scoring, Vercel | [Live](https://internguard-ai.vercel.app) | [GitHub](https://github.com/Ishan-113/internguard-ai) |
| Weather App | REST API, async/await | [Live](https://weather-app-chi-two-25.vercel.app/) | [GitHub](https://github.com/Ishan-113/weather-app) |
| Expense Tracker | localStorage | [Live](https://expense-tracker-ishan-1224.vercel.app) | [GitHub](https://github.com/Ishan-113/expense-tracker) |
| Blackjack Game | Game logic | [Live](https://blackjack-alpha-wine.vercel.app/) | [GitHub](https://github.com/Ishan-113/blackjack) |
| GoT Lore Map | Interactive map | [Live](https://go-t-lore-map.vercel.app/) | [GitHub](https://github.com/Ishan-113/GoT-Lore-Map) |
| Pentest Cheatsheet Terminal | Kali-style UI | [Live](https://pentest-cheatsheet-tau.vercel.app/) | [GitHub](https://github.com/Ishan-113/Pentest_cheatsheet) |
| This Portfolio | Animations, responsive | [Live](https://portfolio-ishan-1224.vercel.app/) | [GitHub](https://github.com/Ishan-113/portfolio) |

> **Note:** `pentest-writeups` and `Business-card` are on GitHub but not featured as live demos. Total: 14 public repos, 12 with live deployments.

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
- **Animations:** IntersectionObserver reveals, rAF tilt/parallax, custom cursor (desktop), scroll progress

## Animations — What changed

- **Removed:** heavy duplicate CSS, infinite btn pulses, blocking scroll handlers, dead hamburger JS, trail spam
- **Added:** scroll progress bar, filter transitions, rAF-throttled parallax & cursor, staggered `IntersectionObserver` reveals, contact-card radial glow, `prefers-reduced-motion` support, nav scrolled state
- **Performance:** `transform`/`opacity` only, `will-change`, passive listeners, debounced via `requestAnimationFrame`

## Repository Structure

```text
portfolio/
├── index.html      # main portfolio (12 projects, filters, lab, contact)
├── resume.html     # print-ready resume (8 featured + lab)
├── style.css       # single stylesheet, no framework
├── script.js       # vanilla JS (reveals, counters, tilt, filters, cursor)
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

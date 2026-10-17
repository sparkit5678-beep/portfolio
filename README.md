# Sudipta Biswas — Cinematic Developer Portfolio

A dark, cinematic portfolio built with semantic HTML, CSS, vanilla JavaScript, GSAP, ScrollTrigger, and optional Lenis smooth scrolling.

## Run locally

1. Extract the project folder.
2. Open `index.html` in a browser, or use VS Code with the Live Server extension.
3. Internet access is needed for Google Fonts and the GSAP/Lenis CDN scripts. The site remains usable if the animation libraries fail to load.

## Before publishing

- Replace `hello@example.com` in `js/interactions.js` and the email link in `index.html` with your real business email.
- Replace GitHub, LinkedIn, and Instagram links with your actual profiles.
- Replace the abstract portrait graphic with a real portrait if desired.
- Replace the CSS-built concept project cards with real project screenshots, descriptions, and verified URLs.
- Add your actual résumé at `assets/resume/` and update the download link in `index.html`.
- Update the experience and project statistics so they accurately represent your work.
- Add a backend or form service if you want contact submissions to be stored rather than opened in the visitor's email app.

## Features

- Responsive dark cinematic design with acid-lime accent
- Responsive navigation and accessible mobile menu
- GSAP hero intro, scroll reveals, orbit motion, and hover interactions
- Optional Lenis smooth scrolling
- Project filters
- Contact form validation and `mailto:` handoff
- Reading progress indicator
- Reduced-motion support
- SEO and Open Graph metadata
- CSS-built project mockups that do not require image assets

## Project structure

```text
cinematic-portfolio/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── interactions.js
│   ├── animations.js
│   └── main.js
├── assets/
│   ├── images/
│   └── resume/
└── README.md
```

## Notes

Project cards are visual concepts created in CSS and are explicitly labeled as concepts in the site. They should not be presented as client work unless replaced with verified projects. The contact form does not send data to a server; it prepares an email using the visitor's email application.

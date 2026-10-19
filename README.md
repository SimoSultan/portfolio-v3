# Portfolio V3

An interactive, single-page bento-grid portfolio for Simon Curran (SimoSultan). Cards fill the viewport with no page scroll, can be expanded by click or resized by dragging shared edges, and animate smoothly with GSAP Flip.

## Tech stack

- Vanilla HTML, CSS, JavaScript
- GSAP 3 + Flip plugin
- CSS Grid + container queries

## Run locally

Clone the repo and serve the folder with any static file server:

```bash
git clone https://github.com/SimoSultan/portfolio-v3.git
cd portfolio-v3
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

All text content is centralized in `js/data.js` for easy editing.

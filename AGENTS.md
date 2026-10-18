# Agent Notes — Portfolio V3

## Project Overview
Interactive single-page bento-grid portfolio for Simon Curran (SimoSultan). Cards are drag/click resizable, fill the viewport with no page scroll, and use GSAP Flip for animations.

## Tech Stack
- Vanilla HTML, CSS, JS (no framework)
- GSAP 3 + Flip plugin (loaded from CDN)
- CSS Grid + CSS container queries (`min(cqw, cqh)`) for responsive type

## File Layout
```
projects/portfolio-v3/
├── index.html
├── css/
│   ├── base.css      # tokens, reset, page shell
│   ├── grid.css      # grid system + card placement
│   └── cards.css     # card styles, lists, resize handles
├── js/
│   ├── data.js       # content (hero, about, projects, experience, contact)
│   ├── grid.js       # layouts, shared-edge handles, local resize solver
│   ├── cards.js      # card rendering + state attributes
│   ├── resize.js     # drag-to-resize input handling
│   └── main.js       # event wiring + state orchestration
└── assets/
    └── avatar.png    # used in hero card and favicon
```

## How to Run
Serve the folder with any static server, e.g.:

```bash
cd projects/portfolio-v3
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Layout System
- Breakpoints: mobile `<640px`, tablet `640px–1023px`, desktop `>=1024px`.
- Each card is placed via inline `--gc`, `--gcs`, `--gr`, `--grs` CSS variables on a CSS Grid.
- Default layouts are in `js/grid.js` under `layouts`.
- Clicking a card expands it:
  - Mobile: card becomes full-width 1×2 at its current row, others shift down.
  - Tablet portrait: same behavior but 2×2 full-width.
  - Desktop: card expands to 3×2 anchored to the nearest corner of its current grid position.
- Dragging a shared edge performs local edge resizing; freed cells are redistributed to neighbors while keeping all cards rectangular.

## State Model
`main.js` holds:
```js
{
  expandedId: string | null,
  mediumId: string | null,
  smallId: string | null,
  currentLayout: object | null // custom layout from drag resizing
}
```
Only one card is considered “expanded” at a time. `currentLayout` captures any layout produced by dragging.

## Testing
Run syntax checks:
```bash
node --check js/grid.js js/resize.js js/main.js js/cards.js js/data.js
```

A layout validator is available at `/tmp/opencode/check-layouts.js` (run from project root):
```bash
node /tmp/opencode/check-layouts.js
```
It checks that every default/small/medium/expanded layout has no overlaps and no whitespace.

## Conventions
- Use conventional commits when committing.
- Keep card content in `js/data.js`.
- Layout geometry lives in `js/grid.js`; avoid hard-coding grid coordinates in other files.
- Container-relative type uses `min(cqw, cqh)` so text fits both wide and tall cards.
- Respect `prefers-reduced-motion`: animations and the cursor effects are disabled when the user prefers reduced motion.

## Recent Significant Changes
- Removed custom cursor experiments; normal system cursor is restored.
- Removed “Without AI / With AI” project headings; single project list with an `AI-assisted` chip.
- Added local edge-resize solver so cards can shrink/grow by dragging shared edges.
- Made click-to-expand position-aware on desktop and tablet.
- Added hero avatar, SimoSultan alias, and avatar favicon.
- Inverted `AI-assisted` chip colors.
- Fixed blocked resize-handle animation alignment.

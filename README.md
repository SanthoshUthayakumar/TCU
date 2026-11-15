# Tom Cinematic Universe (TCU): professional portfolio

React + Vite + framer-motion + three.js. Palette: navy, sand and brass. Type: Barlow Condensed (bold headings), Source Sans 3 (body). Flat colours only.

## Run
    npm install
    npm run dev

## Where things live
- Content: `src/data/site.js`, `projects.js`, `services.js` (unchanged).
- Design tokens (colours, fonts, spacing): top of `src/styles/base.css`.
- 3D / scroll components: `src/components/motion/`
  - `Reveal3D`: scroll-linked 3D entrance (tilt, depth, fade)
  - `TiltCard`: pointer-driven 3D hover tilt
  - `ScrollText`: words fill in as you scroll
  - `RiseText`: headline words rise out of a mask
  - `ScrollBand`: oversized text lines sliding in opposite directions
- Sticky 3D card stack: `sections/WorkStories.jsx`. Pinned horizontal 3D gallery: `sections/GalleryPreview.jsx`.
- Background tunnel of film frames: `components/Scene3D.jsx`.
- Floating navbar: `components/layout/Navbar.jsx`.

## Navigation
- Desktop: three floating pieces (brand badge, numbered capsule with a roaming highlight, Book button + menu ring that fills with scroll progress). Hides on scroll down.
- Mobile: brand + menu ring at the top, and a bottom dock whose active tab expands (`components/layout/Navbar.jsx`, styles in `styles/layout.css`).

## Hero
`sections/Hero.jsx` is pinned for ~2.4 screens: letters flip in, a live timecode runs, and scrolling opens the viewfinder (photo grows to full screen while the title splits apart). The three.js tunnel (`Scene3D.jsx`) now lives only in the hero.

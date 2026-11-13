# Tom Cinematic Universe (TCU): comic-book portfolio

React + Vite + React Router + Framer Motion. Plain CSS, mobile-first (360px base, then 768 / 1024 / 1440).
All work shows up as comic pages: panels, captions, speech bubbles and sound effects. The photos and films stay the heroes.

## Install, run, build

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve the build locally
```

Fonts (Bangers, Archivo Black, Archivo, Patrick Hand) are self-hosted through the `@fontsource/*` npm packages imported in `src/main.jsx`. They are bundled into `dist/`, so no third-party font requests happen.

## Deploy to Vercel

1. Push the project to a Git repo and import it in Vercel (framework preset: Vite).
2. Build command `npm run build`, output directory `dist`.
3. `vercel.json` rewrites every path to `index.html`, so direct URLs such as `/work/coastline` load.

## Where things live

| You want to change | Edit |
| --- | --- |
| Social links, WhatsApp, email, hero slideshow, About me text and photo | `src/data/site.js` |
| Projects (everything on /work and /work/:slug) | `src/data/projects.js` |
| Services (flip panels) | `src/data/services.js` |
| Gallery photos | built automatically from every project's cover and panels |
| Colours, type sizes, borders, motion timing | `src/styles/base/tokens.css` |

Every sample project, image and paragraph is a clearly marked **placeholder**. Nothing is invented: empty values hide their link or section.

## Home page sections

1. Hero: photo slideshow that changes every 5 seconds (pause button, dots, pauses when the tab is hidden). By default it uses the covers of your featured projects; set `heroSlides` in `site.js` to choose your own. Setting `heroVideo` shows a muted looping video instead.
2. Featured work: pinned sideways strip on desktop, swipe row on mobile.
3. The work, slide by slide: five slides, photo on the left and the story on the right (stacked on phones). The text is each project's `summary` in `projects.js`.
4. About me: edit `ownerName`, `ownerRole`, `aboutText`, `facts` and `aboutImage` in `site.js`.
5. Process, Services, Gallery preview, Contact.

Every inner page has a **Back to home** button at the top. `/journal` redirects to `/gallery`.

## Media

- Images and videos: drop files in `src/assets/images` and `src/assets/videos`, then `import` them in the data files. Large files can go in `public/` and be referenced by path (for example `/videos/hero.mp4`).
- Hero video: set `heroVideo` in `site.js` (muted, looping, no sound). It is the only autoplaying video; card previews play only while a card is held or hovered.
- Share image: replace `public/og.svg` with a 1200x630 PNG/JPG and update the `og:image` tag in `index.html`.
- Placeholder pictures are `src/assets/images/ph-1.svg` to `ph-8.svg`.

## Add a project

Add an object to `src/data/projects.js` (add a `summary` line in the `SUMMARIES` map at the bottom for the home-page slides):

```js
{
  slug: 'my-film',              // becomes /work/my-film
  title: 'My Film', client: '', category: 'Films', year: 2025, role: 'Cinematography',
  cover: myCover,               // imported image
  previewVideo: '',             // optional muted clip for hold/hover peek
  mainVideo: '',                // mp4/webm URL or import, OR:
  embed: 'https://youtu.be/...',// YouTube or Vimeo link
  layout: 'splash',             // 'splash' | 'wide' | 'pair' | 'tall' (panel size on /work)
  featured: true,               // shows on the home film strip
  panels: [{ src: img1, ratio: '3/2', caption: '...', alt: '...', bts: false }],
  credits: [{ role: 'Camera', name: 'Name' }],
}
```

Categories come from `CATEGORIES` in the same file: Films, Photography, Commercials, Events, Reels, Behind the scenes. Only categories that contain projects appear in the filter. Set `bts: true` on a panel to make it the hold-to-peek frame.

## Social and WhatsApp values

In `src/data/site.js`:

- `instagramHandle`: handle without the `@`. Builds the profile link and `https://ig.me/m/{handle}` DM link.
- `whatsappNumber`: international digits only (no `+`, spaces or dashes). Builds `https://wa.me/{number}?text=...`.
- `whatsappMessage`: the default opening line.
- `email`, `phone`: `mailto:` and `tel:` links.
- `youtube`, `facebook`, `linkedin`, `behance`, `vimeo`: full profile URLs. `x`, `tiktok`: handle or URL.

The floating contact button, hero and contact buttons, footer and menu links, the brief form and the "Book something like this" button all read from these values. External links open in a new tab with `rel="noopener noreferrer"`. The form says "Opening WhatsApp. Press send there." because nothing is sent from the site.

## Motion and accessibility notes

- One easing curve and three durations (150 / 300 / 600 ms) live in `tokens.css`; `src/utils/motion.js` reads them for Framer Motion.
- Only transform, opacity and clip-path are animated. Reveals run once. Native scrolling is never hijacked: the home film strip is a CSS `position: sticky` section driven by scroll progress on 768px and up, and a swipeable snap row below that.
- `prefers-reduced-motion` removes parallax, the pinned strip, tilt, flips, page-turn transitions, SFX bursts, the marquee and the wiggle.
- GSAP is not used; Framer Motion covered every case.

## Known limits

- Lightbox pinch-zoom scales the image; once zoomed you can drag to pan, but there is no pan boundary.
- Page tips are remembered per page in `localStorage` (`tcu-tip-*`). Clear them to see them again.


## 3D background and smooth scroll
- `src/components/Scene3D.jsx`: three.js scene of comic-style props (cinema camera, film reels, clapperboard, studio light with beam, editing timeline) that float and turn with scroll speed and position, behind the page. It reads `--paper` and `--ink` from tokens.css, loads after first paint, skips very weak devices, and shows one still frame with reduced motion. Edit `TYPES` to change which props appear and in what order; `SP` is the spacing between them; `D` is the dust count.
- `src/hooks/useSmoothScroll.js` and `src/utils/scroll.js`: Lenis smooth wheel scrolling (touch keeps native scroll). Route changes and Back-to-top use `scrollToTop()`.

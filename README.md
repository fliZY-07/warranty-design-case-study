# Warranty case study — DV2008 Interface Design

A single-page case study built with Vite, React, Tailwind CSS, Framer Motion, GSAP (ScrollTrigger) and Lenis. It is frontend only and runs entirely from static files.

## Run and build

```bash
npm install        # once
npm run dev        # local dev server, http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

`base: './'` is set in `vite.config.js`, so `dist/` works from any folder or sub-path. Open it through a static server such as `npm run preview`. Opening `dist/index.html` straight from disk (file://) will not work, because browsers block ES modules there.

## Adding the screenshots

Put the images in **`public/images/`** and run `npm run build` again. They are copied to `dist/images/`. You can also drop them straight into `dist/images/` without rebuilding.

If a file is missing, its figure shows a dashed, labelled placeholder with the alt text and the expected filename.

All images are now in place:

```
wallet-pass.png       warranties-list.png    search-sort.png      warranty-detail.png
chatbot-1.png         chatbot-2.png          chatbot-3.png
claim-form.png        claim-progress-1.png … claim-progress-6.png
mental-model.png      userflow.png           ia-map.png
chart-want-vs-do.png  chart-claim-effort.png
```

Phone screenshots sit in a 9:19.5 frame (`object-contain`). Diagrams and charts keep their natural size and scroll sideways on phones.

The Retrieve screens (list, search, three assistant screens, pass) and the Claim screens (form, then six status stages) are autoplay carousels. Each pauses on hover, on focus, off screen, and with its pause button. Neither autoplays under reduced motion, and both print as a grid.

## Editing the generated diagrams

`charts/mental-model.html`, `charts/userflow.html` and `charts/want-vs-do.html` are the sources for `mental-model.png`, `userflow.png` and `chart-want-vs-do.png`. Edit the HTML, then capture the `#chart` element at 2× device scale (1120px wide) with any headless browser, and save it over the PNG in `public/images/`.

## Editing copy

All text lives in `src/content/`, with one file per section as plain JS objects. Inline `**bold**` and `*italic*` are supported. Layout is in `src/sections/`, and shared pieces are in `src/components/`.

## Structure

```
src/
  content/      copy and data (hero, problem, research, insight, contradiction,
                direction, design, testing, reflection, index)
  sections/     one component per section
  components/   Figure, BeforeAfter, StatBlock, PullQuote, Callout, CountUp,
                Reveal, Rich, Section, Chrome (progress bar, side nav, scroll effects)
  lib/motion.js GSAP/ScrollTrigger registration, Lenis, reduced-motion hook
  index.css     tokens, section tones, reduced-motion and print rules
```

## Motion and accessibility

- `prefers-reduced-motion: reduce` turns off Lenis, every ScrollTrigger (including the pin) and every Framer Motion transition. All content renders at its final state on first paint.
- Parallax and the §3 pin run only at 768px and wider. The pin also needs a viewport at least 680px tall.
- Print / Save as PDF resets transforms and opacity, turns dark sections white, prints the carousels as grids, and keeps figures from splitting across pages.


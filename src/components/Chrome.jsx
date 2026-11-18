import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { gsap, scrollToId, useGsapMedia, useReducedMotion } from '../lib/motion.js'

/* ---------- Thin fixed scroll-progress bar ---------- */
export function ProgressBar() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="progress-bar fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-teal"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  )
}

/* ---------- Sticky right-hand section nav (≥1024px) ---------- */
export function SectionNav({ items }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="Sections" className="section-nav fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ol className="flex flex-col items-center gap-0.5 rounded-full border border-line bg-paper/95 px-1 py-2 shadow-sm">
        {items.map((it, i) => {
          const on = active === it.id
          return (
            <li key={it.id} className="relative">
              <a
                href={`#${it.id}`}
                aria-current={on ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(it.id)
                }}
                className="group flex h-7 w-7 items-center justify-center rounded-full"
              >
                {/* label floats left of the pill: on hover/focus everywhere, and for the
                    current section on very wide screens where there is margin to spare */}
                <span
                  className={`pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded border border-line bg-paper px-2 py-0.5 text-sm text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    on ? 'font-semibold min-[1500px]:opacity-100' : ''
                  }`}
                >
                  <span className="sr-only">{i + 1}. </span>
                  {it.nav}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                    on ? 'border-teal-ink bg-teal-ink' : 'border-muted bg-transparent group-hover:bg-muted'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ---------- Global scroll-driven effects ---------- */
const TONES = {
  paper: { '--sec-bg': '#FBFAF7', '--sec-fg': '#16242B', '--sec-muted': '#5A6872', '--sec-label': '#1E7A6E', '--sec-line': 'rgba(226,230,232,1)' },
  surface: { '--sec-bg': '#FFFFFF', '--sec-fg': '#16242B', '--sec-muted': '#5A6872', '--sec-label': '#1E7A6E', '--sec-line': 'rgba(226,230,232,1)' },
  deep: { '--sec-bg': '#264653', '--sec-fg': '#FBFAF7', '--sec-muted': '#C5CED1', '--sec-label': '#C5CED1', '--sec-line': 'rgba(251,250,247,0.18)' },
}
const split = (t) => {
  const { '--sec-bg': bg, ...text } = t
  return [{ '--sec-bg': bg }, text]
}

export function ScrollEffects() {
  useGsapMedia({ current: null }, ({ motion, wide }) => {
    if (!motion) return

    /* Background colour eases between sections instead of cutting hard.
       Each section starts in the previous section's tone and settles into its own as it
       arrives. Text colour flips at 60% of the ease, when the background is already dark
       (or light) enough for it to read. */
    const sections = gsap.utils.toArray('[data-tone]')
    sections.forEach((el, i) => {
      if (i === 0) return
      const from = TONES[sections[i - 1].dataset.tone]
      const to = TONES[el.dataset.tone]
      if (!from || !to || from === to) return
      const [fromBg, fromText] = split(from)
      const [toBg, toText] = split(to)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true },
      })
      tl.fromTo(el, fromBg, { ...toBg, ease: 'none', duration: 1 }, 0)
      tl.fromTo(el, fromText, { ...toText, duration: 0.001, immediateRender: true }, 0.6)
    })

    /* Parallax: figures drift against the text. ≤80px total travel, wide screens only. */
    if (wide) {
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36 },
          { y: -36, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }
  })
  return null
}

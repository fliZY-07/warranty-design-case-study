import { useEffect, useRef, useState } from 'react'
import { Img } from './Figure.jsx'
import { useReducedMotion } from '../lib/motion.js'

const INTERVAL = 4000 // ms per slide

/**
 * Autoplaying screen carousel.
 * - Plays only while on screen; pauses on hover / keyboard focus; has a pause button (WCAG 2.2.2).
 * - Never autoplays under prefers-reduced-motion; slides still change on demand, without animation.
 * - Slides cross-fade (opacity + a small translate only).
 * - Print shows every slide as a static grid instead (.carousel-print).
 */
export function Carousel({ slides, label }) {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const n = slides.length
  const playing = !reduced && !userPaused && !hovered && !focused && inView

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setI((v) => (v + 1) % n), INTERVAL)
    return () => clearTimeout(t)
  }, [playing, i, n])

  const go = (k) => setI(((k % n) + n) % n)
  const s = slides[i]

  return (
    <>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="carousel grid items-center gap-8 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-12"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      >
        {/* stage: all slides stacked, only the current one visible */}
        <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[260px]">
          {slides.map((sl, k) => (
            <div
              key={sl.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}: ${sl.title}`}
              aria-hidden={k !== i}
              className="absolute inset-0 transition-[opacity,transform] duration-500 ease-out"
              style={{ opacity: k === i ? 1 : 0, transform: k === i ? 'none' : `translateX(${k < i ? -14 : 14}px)` }}
            >
              <Img src={sl.src} alt={sl.alt} eager frameClass="h-full w-full frame-bare" className="object-contain object-top shot-shadow" />
            </div>
          ))}
        </div>

        {/* caption + controls */}
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">
            <span className="tabular-nums">
              {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            &ensp;·&ensp;{s.step}
          </p>
          <div aria-live={playing ? 'off' : 'polite'} className="mt-3 min-h-[7.5rem]">
            <p className="font-display text-lg font-semibold text-sec-fg">{s.title}</p>
            <p className="mt-2 max-w-[40ch] text-base text-sec-muted">{s.caption}</p>
          </div>

          {/* one segment per slide; the current one fills over the interval */}
          <div className="mt-6 flex gap-1.5">
            {slides.map((sl, k) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => go(k)}
                aria-label={`Show screen ${k + 1}: ${sl.title}`}
                aria-current={k === i ? 'true' : undefined}
                className="group flex h-6 flex-1 items-center"
              >
                <span className="relative block h-1 w-full overflow-hidden rounded-full bg-line group-hover:bg-muted/40">
                  {k < i && <span className="absolute inset-0 rounded-full bg-teal-ink" />}
                  {k === i && (
                    <span
                      key={`${i}-${playing}`}
                      className={`carousel-fill absolute inset-0 origin-left rounded-full bg-teal-ink ${playing ? 'is-playing' : ''}`}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <CtrlButton label="Previous screen" onClick={() => go(i - 1)}>
              <path d="M11 4 6 9l5 5" />
            </CtrlButton>
            {!reduced && (
              <CtrlButton label={userPaused ? 'Play carousel' : 'Pause carousel'} onClick={() => setUserPaused((p) => !p)}>
                {userPaused ? <path d="M6 4.5v9l7.5-4.5z" fill="currentColor" stroke="none" /> : <path d="M6.5 4.5v9M11.5 4.5v9" />}
              </CtrlButton>
            )}
            <CtrlButton label="Next screen" onClick={() => go(i + 1)}>
              <path d="m7 4 5 5-5 5" />
            </CtrlButton>
          </div>
        </div>
      </div>

      {/* print / PDF: every screen, side by side */}
      <div className="carousel-print hidden grid-cols-3 gap-5">
        {slides.map((sl) => (
          <figure key={sl.src} className="avoid-break">
            <Img src={sl.src} alt={sl.alt} frameClass="aspect-[9/19.5] w-full frame-bare" className="object-contain object-top" />
            <figcaption className="mt-2 text-sm text-sec-muted">{sl.title}</figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}

function CtrlButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-sec-line text-sec-fg transition-colors hover:border-muted hover:bg-sec-card"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  )
}

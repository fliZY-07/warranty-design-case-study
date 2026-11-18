import { useRef } from 'react'
import { motion } from 'framer-motion'
import { hero } from '../content/index.js'
import { Container } from '../components/Section.jsx'
import { gsap, useGsapMedia, useReducedMotion } from '../lib/motion.js'

const EASE = [0.22, 1, 0.36, 1]

/* Five upright "gates", each with a gap where coverage leaks out. Decorative only. */
const GATES = [0.62, 0.38, 0.7, 0.46, 0.56] // vertical position of each leak, as a fraction of height

function GateField() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden="true" className="no-print pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] max-w-[560px] md:block">
      <div className="flex h-full items-stretch justify-between px-6 py-16 lg:px-10">
        {GATES.map((leak, i) => (
          <div key={i} data-gate-col className="relative h-full w-[14px]">
            <motion.div
              className="absolute inset-0 flex origin-bottom flex-col"
              initial={reduced ? false : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              <span className="block rounded-full bg-deep/[0.09]" style={{ flex: leak }} />
              <span className="my-3 block h-10 shrink-0 rounded-full bg-orange/40" />
              <span className="block rounded-full bg-deep/[0.09]" style={{ flex: 1 - leak }} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // Scrubbed background: the gate columns drift apart at different rates as the hero leaves.
  useGsapMedia(ref, ({ wide }) => {
    if (!wide) return
    gsap.utils.toArray('[data-gate-col]', ref.current).forEach((el, i) => {
      gsap.to(el, {
        y: -(20 + i * 14),
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
  })

  const rise = (delay) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } }

  return (
    <header ref={ref} data-tone="paper" className="tone-paper relative overflow-hidden">
      <GateField />
      <Container className="relative flex min-h-[88svh] flex-col justify-end pb-16 pt-28 md:pb-24">
        <motion.p {...rise(0)} className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-ink">
          {hero.eyebrow}
        </motion.p>
        <motion.h1 {...rise(0.08)} className="mt-6 max-w-[15ch] font-display text-display font-semibold tracking-[-0.025em] text-ink">
          {hero.title}
        </motion.h1>
        <motion.p {...rise(0.2)} className="mt-8 max-w-[44ch] text-lg text-muted">
          {hero.standfirst}
        </motion.p>

        <motion.p {...rise(0.4)} className="mt-12 max-w-[40ch] border-l-4 border-orange pl-5 font-display text-lg font-medium text-deep">
          {hero.tension}
        </motion.p>
      </Container>
    </header>
  )
}

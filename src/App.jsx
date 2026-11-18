import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { problem, research, insight, contradiction, direction, design, testing, reflection, footer } from './content/index.js'
import { ProgressBar, SectionNav, ScrollEffects } from './components/Chrome.jsx'
import { Container } from './components/Section.jsx'
import { Hero } from './sections/Hero.jsx'
import { Problem } from './sections/Problem.jsx'
import { Research } from './sections/Research.jsx'
import { Insight } from './sections/Insight.jsx'
import { Contradiction } from './sections/Contradiction.jsx'
import { Direction } from './sections/Direction.jsx'
import { Design } from './sections/Design.jsx'
import { Testing } from './sections/Testing.jsx'
import { Reflection } from './sections/Reflection.jsx'
import { ScrollTrigger, startLenis, useReducedMotion } from './lib/motion.js'

const NAV = [problem, research, insight, contradiction, direction, testing, design, reflection].map(({ id, nav }) => ({ id, nav }))

export default function App() {
  const reduced = useReducedMotion()

  // Lenis only when motion is allowed; torn down if the preference flips mid-session.
  useEffect(() => {
    if (reduced) return
    let stop
    let cancelled = false
    startLenis().then((fn) => {
      if (cancelled) fn?.()
      else stop = fn
    })
    return () => {
      cancelled = true
      stop?.()
    }
  }, [reduced])

  // Layout settles after web fonts load; re-measure scroll positions then.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    // Ensure lazy images are requested before printing / PDF export.
    const eager = () => document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'))
    window.addEventListener('beforeprint', eager)
    return () => window.removeEventListener('beforeprint', eager)
  }, [])

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'} transition={reduced ? { duration: 0 } : undefined}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ProgressBar />
      <SectionNav items={NAV} />
      <Hero />
      <main id="main">
        <Problem />
        <Research />
        <Insight />
        <Contradiction />
        <Direction />
        <Testing />
        <Design />
        <Reflection />
      </main>
      <footer className="border-t border-line bg-paper py-10">
        <Container>
          <p className="text-sm text-muted">{footer.text}</p>
        </Container>
      </footer>
      {/* last, so every section (and the §3 pin) exists before these triggers are created */}
      <ScrollEffects />
    </MotionConfig>
  )
}

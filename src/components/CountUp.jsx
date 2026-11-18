import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '../lib/motion.js'

export const formatNumber = (v, decimals = 0) => Number(v).toFixed(decimals)

/**
 * Counts up once on first view (~1s, ease-out), preserving decimals (41.9, not 42).
 * The true figure is always in the DOM (.count-final) for screen readers and print;
 * the animated copy (.count-live) is aria-hidden.
 */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [shown, setShown] = useState(reduced ? value : 0)
  const final = `${prefix}${formatNumber(value, decimals)}${suffix}`

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return
    }
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  if (reduced) return <span className="tabular-nums">{final}</span>

  return (
    <span ref={ref} className="tabular-nums">
      <span className="count-live" aria-hidden="true">
        {prefix}
        {formatNumber(shown, decimals)}
        {suffix}
      </span>
      <span className="count-final sr-only">{final}</span>
    </span>
  )
}

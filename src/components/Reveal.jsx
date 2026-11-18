import { motion } from 'framer-motion'
import { useReducedMotion } from '../lib/motion.js'

const EASE = [0.22, 1, 0.36, 1]

export const riseVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' }

/**
 * Fade-and-rise once on first view. Under reduced motion it renders the plain element,
 * so content is present at its final state from the first paint.
 */
export function Reveal({ as = 'div', children, className, delay = 0, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: riseVariants.hidden,
        show: { ...riseVariants.show, transition: { ...riseVariants.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Parent that staggers its <RevealItem> children by ~80ms. */
export function RevealGroup({ as = 'div', children, className, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }
  const M = motion[as] || motion.div
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={groupVariants} {...rest}>
      {children}
    </M>
  )
}

export function RevealItem({ as = 'div', children, className, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Tag = as
    return <Tag className={className} {...rest}>{children}</Tag>
  }
  const M = motion[as] || motion.div
  return (
    <M className={className} variants={riseVariants} {...rest}>
      {children}
    </M>
  )
}

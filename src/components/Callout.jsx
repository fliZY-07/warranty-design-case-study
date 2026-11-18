import { Reveal } from './Reveal.jsx'
import { Rich } from './Rich.jsx'

const STYLES = {
  // what *I* did — the thread a marker should be able to follow through the page
  contribution: {
    box: 'border-l-4 border-teal bg-sec-card',
    label: 'text-sec-label',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8" cy="6.2" r="2" fill="currentColor" />
        <path d="M4.2 12.4c.9-1.6 2.2-2.4 3.8-2.4s2.9.8 3.8 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  // stated assumption / limitation
  caveat: {
    box: 'border border-dashed border-orange bg-transparent',
    label: 'text-rust',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        <path d="M8 1.5 15 14H1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 6v3.6M8 11.4v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
}

/**
 * `paras` are strings (support **bold** / *em*); `children` renders after them.
 */
export function Callout({ variant = 'contribution', label, paras = [], children, className = '' }) {
  const s = STYLES[variant]
  const heading = label || (variant === 'contribution' ? 'Key design consideration' : 'Caveat')
  return (
    <Reveal as="aside" aria-label={heading} className={`avoid-break max-w-measure rounded-r-lg px-6 py-6 md:px-8 ${s.box} ${className}`}>
      <p className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] ${s.label}`}>
        {s.icon}
        {heading}
      </p>
      <div className="space-y-4 text-base">
        {paras.map((p, i) => (
          <p key={i}>
            <Rich text={p} />
          </p>
        ))}
        {children}
      </div>
    </Reveal>
  )
}

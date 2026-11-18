import { Reveal } from './Reveal.jsx'

/** Interview quote with real visual weight. */
export function PullQuote({ text, cite, className = '' }) {
  return (
    <Reveal as="figure" className={`avoid-break border-l-4 border-orange pl-6 md:pl-10 ${className}`}>
      <blockquote>
        <p className="max-w-[24ch] font-display text-xl font-medium tracking-tight text-deep [.tone-deep_&]:text-sec-fg">
          “{text}”
        </p>
      </blockquote>
      <figcaption className="mt-4 text-sm uppercase tracking-[0.12em] text-sec-muted">— {cite}</figcaption>
    </Reveal>
  )
}

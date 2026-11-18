import { Reveal } from './Reveal.jsx'

/** Page-width container: 1200px max, 16px gutter on phones, room for the side nav on lg. */
export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-6 md:px-10 lg:pr-24 xl:px-10 ${className}`}>{children}</div>
}

export function Eyebrow({ children, n }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sec-label">
      {n && <span className="tabular-nums">{String(n).padStart(2, '0')}&ensp;·&ensp;</span>}
      {children}
    </p>
  )
}

/**
 * Every section: eyebrow, then h2. `tone` = paper | surface | deep (see index.css).
 * `data-tone` is read by the background-easing controller.
 */
export function Section({ id, n, tone = 'paper', eyebrow, title, children, className = '', pad = 'py-24 md:py-32' }) {
  return (
    <section id={id} data-section={id} data-tone={tone} aria-labelledby={`${id}-title`} className={`tone-${tone} relative outline-none ${pad} ${className}`}>
      <Container>
        <Reveal className="mb-10 md:mb-14">
          <Eyebrow n={n}>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="mt-4 max-w-[26ch] font-display text-xl font-semibold tracking-tight text-sec-fg">
            {title}
          </h2>
        </Reveal>
        {children}
      </Container>
    </section>
  )
}

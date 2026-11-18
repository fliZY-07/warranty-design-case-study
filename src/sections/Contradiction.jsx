import { contradiction as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Prose } from '../components/Rich.jsx'
import { PullQuote } from '../components/PullQuote.jsx'
import { Figure } from '../components/Figure.jsx'
import { CountUp } from '../components/CountUp.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx'

function Row({ value, of, label, accent }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-sec-line py-3">
      <span className={`w-[4.5ch] shrink-0 text-right font-display text-lg font-semibold tabular-nums ${accent}`}>{value}</span>
      <span className="text-base text-sec-fg">
        {of ? <span className="text-sec-muted">of {of} </span> : null}
        {label}
      </span>
    </div>
  )
}

export function Contradiction() {
  const { outcome, cost } = c
  return (
    <Section id={c.id} n={4} tone="paper" eyebrow={c.eyebrow} title={c.title} pad="py-24 md:py-36">
      <Reveal>
        <p className="max-w-measure text-lg text-sec-fg">{c.intro}</p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Left: outcome — the system works */}
        <RevealItem className="avoid-break rounded-xl border border-line border-t-4 border-t-teal bg-surface p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold text-sec-fg">{outcome.title}</h3>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-display font-semibold leading-none text-teal-ink">
              <CountUp value={outcome.highlight.value} />
            </span>
            <span className="text-lg font-medium text-sec-fg">{outcome.highlight.label}</span>
          </div>
          <div className="mt-6">
            {outcome.rows.map((r) => (
              <Row key={r.label} {...r} accent="text-teal-ink" />
            ))}
          </div>
        </RevealItem>

        {/* Right: cost — it is slow */}
        <RevealItem className="avoid-break rounded-xl border border-line border-t-4 border-t-orange bg-surface p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold text-sec-fg">{cost.title}</h3>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-display font-semibold leading-none text-rust">
              <CountUp value={cost.rows[0].value} />
            </span>
            <span className="text-lg font-medium text-sec-fg">
              <span className="text-sec-muted">of {cost.rows[0].of} </span>
              {cost.rows[0].label}
            </span>
          </div>
          <div className="mt-6">
            {cost.rows.slice(1).map((r) => (
              <Row key={r.label} {...r} accent="text-rust" />
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">{cost.obstaclesLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {cost.obstacles.map((o) => (
              <li key={o.label} className="rounded-full border border-line px-3 py-1 text-sm text-sec-fg">
                <span className="font-semibold tabular-nums text-rust">{o.value}</span> {o.label}
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealGroup>

      <div className="mt-20 grid items-start gap-14 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
        <Reveal>
          <Prose paras={c.body} />
        </Reveal>
        <PullQuote text={c.quote.text} cite={c.quote.cite} className="lg:mt-2" />
      </div>
    </Section>
  )
}

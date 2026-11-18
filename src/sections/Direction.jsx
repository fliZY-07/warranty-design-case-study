import { motion } from 'framer-motion'
import { direction as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Prose, Rich } from '../components/Rich.jsx'
import { Callout } from '../components/Callout.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useReducedMotion } from '../lib/motion.js'

function Barriers() {
  const reduced = useReducedMotion()
  return (
    <Reveal as="figure" className="avoid-break">
      <figcaption className="max-w-measure text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">{c.barriersLabel}</figcaption>
      <ol className="mt-5">
        {c.barriers.map((b, i) => (
          <li key={b.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-t border-sec-line py-3 md:grid-cols-[minmax(0,1fr)_14rem_6.5rem]">
            <span className="text-base text-sec-fg">{b.label}</span>
            {/* bar on a 0–100% track. Width holds the value (static, so print is right);
                only the fill's scaleX animates. */}
            <span aria-hidden="true" className="relative hidden h-2 self-center overflow-hidden rounded-full bg-line md:block">
              <span className="absolute inset-y-0 left-0 block" style={{ width: `${b.pct}%` }}>
                {reduced ? (
                  <span className={`block h-full rounded-full ${i === 0 ? 'bg-orange' : 'bg-deep/50'}`} />
                ) : (
                  <motion.span
                    className={`block h-full origin-left rounded-full ${i === 0 ? 'bg-orange' : 'bg-deep/50'}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </span>
            </span>
            <span className="text-right text-sm tabular-nums text-sec-muted">
              <span className="font-display text-lg font-semibold text-sec-fg">{b.count}</span> · {b.pct}%
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

const rating = (text) => {
  if (/^(Poor)/.test(text)) return 'text-rust'
  if (/^(Excellent|Good|Potentially free)/.test(text)) return 'text-teal-ink'
  return 'text-sec-muted'
}

function DirectionsTable() {
  const t = c.table
  return (
    <Reveal as="figure" className="avoid-break">
      <div role="region" aria-label="Comparison of the four directions" tabIndex={0} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr>
              <th scope="col" className="w-[17%] pb-3 text-left font-semibold text-sec-muted">
                <span className="sr-only">Barrier</span>
              </th>
              {t.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`px-4 pb-3 pt-4 text-left align-bottom font-display text-base font-semibold ${
                    i === t.winner ? 'rounded-t-lg border-t-4 border-teal bg-teal/[0.09] text-ink' : 'text-sec-fg'
                  }`}
                >
                  {i === t.winner && <span className="mb-1 block text-sm font-semibold uppercase tracking-[0.12em] text-teal-ink">Chosen</span>}
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, ri) => (
              <tr key={r.criterion} className="border-t border-sec-line">
                <th scope="row" className="py-3 pr-4 text-left align-top font-semibold text-sec-fg">
                  {r.criterion}
                </th>
                {r.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 align-top ${rating(cell)} ${
                      i === t.winner ? `bg-teal/[0.09] font-semibold ${ri === t.rows.length - 1 ? 'rounded-b-lg' : ''}` : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.caption && <figcaption className="mt-3 text-sm text-sec-muted">{t.caption}</figcaption>}
    </Reveal>
  )
}

export function Direction() {
  return (
    <Section id={c.id} n={5} tone="surface" eyebrow={c.eyebrow} title={c.title}>
      <Reveal>
        <p className="max-w-measure text-base text-sec-fg">{c.intro}</p>
      </Reveal>
      <div className="mt-12">
        <Barriers />
      </div>
      <div className="mt-16">
        <DirectionsTable />
      </div>
      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
        <div className="space-y-8">
          <Reveal>
            <Prose paras={c.body} />
          </Reveal>
          <Reveal>
            <p className="max-w-measure border-l-4 border-teal pl-6 text-lg text-sec-fg">
              <Rich text={c.decision[0]} />
            </p>
          </Reveal>
        </div>
        <Callout variant="caveat" label={c.caveat.label} paras={[c.caveat.text]} />
      </div>
    </Section>
  )
}

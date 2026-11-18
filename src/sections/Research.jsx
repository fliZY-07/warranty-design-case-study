import { research as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Prose } from '../components/Rich.jsx'
import { Callout } from '../components/Callout.jsx'
import { StatBlock } from '../components/StatBlock.jsx'
import { Reveal } from '../components/Reveal.jsx'

function RetrievalTable() {
  return (
    <Reveal as="figure" className="avoid-break">
      <h3 className="font-display text-lg font-semibold text-sec-fg">{c.testTitle}</h3>
      <table className="mt-4 w-full border-collapse text-sm">
        <thead className="sr-only">
          <tr>
            <th scope="col">Participant</th>
            <th scope="col">What happened</th>
            <th scope="col">Found it?</th>
          </tr>
        </thead>
        <tbody>
          {c.test.map((r) => (
            <tr key={r.who} className={`border-t border-sec-line ${r.ok ? 'bg-teal/[0.08]' : ''}`}>
              <th scope="row" className="w-10 py-3 pl-2 pr-3 text-left align-top font-display font-semibold text-sec-muted">
                {r.who}
              </th>
              <td className="py-3 pr-4 align-top text-sec-fg">{r.outcome}</td>
              <td className="w-24 py-3 pr-2 text-right align-top">
                {r.ok ? (
                  <span className="font-semibold text-teal-ink">
                    <span aria-hidden="true">✓ </span>Found
                  </span>
                ) : (
                  <span className="font-semibold text-rust">
                    <span aria-hidden="true">✗ </span>Failed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 border-t border-sec-line pt-3 text-sm italic text-sec-muted">{c.testCaption}</figcaption>
    </Reveal>
  )
}

export function Research() {
  return (
    <Section id={c.id} n={2} tone="paper" eyebrow={c.eyebrow} title={c.title} pad="py-20 md:py-28">
      <StatBlock stats={c.stats} className="mb-16" />
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-10">
          <Reveal>
            <Prose paras={c.body} />
          </Reveal>
          <Callout paras={c.contribution} />
        </div>
        <RetrievalTable />
      </div>
    </Section>
  )
}

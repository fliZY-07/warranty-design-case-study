import { testing as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Callout } from '../components/Callout.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx'

const RESULT = {
  pass: { cls: 'border-teal-ink text-teal-ink', mark: '✓' },
  friction: { cls: 'border-muted text-muted', mark: '~' },
  fail: { cls: 'border-rust text-rust', mark: '✗' },
}

function Tasks() {
  return (
    <RevealGroup as="ol" className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
      {c.tasks.map((t) => {
        const r = RESULT[t.result]
        return (
          <RevealItem as="li" key={t.n} className={`p-6 md:p-7 ${t.result === 'fail' ? 'bg-[#FDF5F2]' : 'bg-surface'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Task {t.n}</p>
              <span className={`rounded-full border px-2.5 py-0.5 text-sm font-semibold ${r.cls}`}>
                <span aria-hidden="true">{r.mark} </span>
                {t.resultLabel}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">{t.task}</h3>
            <p className="mt-2 text-base text-ink">{t.text}</p>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}

export function Testing() {
  return (
    <Section id={c.id} n={6} tone="paper" eyebrow={c.eyebrow} title={c.title}>
      <Reveal>
        <p className="max-w-measure text-lg text-sec-fg">{c.intro}</p>
      </Reveal>

      <div className="mt-12">
        <Tasks />
      </div>

      <Reveal className="mt-16 border-l-4 border-orange pl-6">
        <p className="max-w-[30ch] font-display text-xl font-medium tracking-tight text-sec-fg">{c.closing}</p>
      </Reveal>
    </Section>
  )
}

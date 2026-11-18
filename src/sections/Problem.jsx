import { problem as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Prose } from '../components/Rich.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx'

const STEP = {
  step: 'border-sec-line bg-sec-card text-sec-fg',
  gap: 'border-dashed border-muted/60 bg-transparent text-sec-muted italic',
  fail: 'border-orange/60 bg-orange/[0.07] text-rust',
}

function BehaviourFlow() {
  return (
    <figure className="avoid-break mt-16">
      <figcaption className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">{c.flowLabel}</figcaption>
      <RevealGroup as="ol" className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {c.flow.map((s, i) => (
          <RevealItem
            as="li"
            key={s.text}
            className={`flex items-center md:flex-1 ${s.kind === 'gap' ? 'md:flex-[1.6]' : ''}`}
          >
            <span className={`flex w-full items-center justify-center rounded-md border px-3 py-3 text-center text-sm font-medium md:h-full ${STEP[s.kind]}`}>
              {s.kind === 'gap' ? (
                <span className="flex w-full items-center gap-2">
                  <span aria-hidden="true" className="hidden h-px flex-1 border-t border-dashed border-muted md:block" />
                  {s.text}
                  <span aria-hidden="true" className="hidden h-px flex-1 border-t border-dashed border-muted md:block" />
                </span>
              ) : (
                s.text
              )}
            </span>
            {i < c.flow.length - 1 && (
              <span aria-hidden="true" className="hidden shrink-0 px-1.5 text-muted md:block">
                →
              </span>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </figure>
  )
}

export function Problem() {
  return (
    <Section id={c.id} n={1} tone="surface" eyebrow={c.eyebrow} title={c.title}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
        <Reveal>
          <Prose paras={c.body} />
        </Reveal>
        <Reveal as="aside" aria-label={c.audience.label} className="self-start border-t-4 border-deep pt-5 lg:mt-1">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">{c.audience.label}</p>
          <p className="mt-2 font-display text-lg font-semibold text-deep">{c.audience.title}</p>
          <p className="mt-2 text-sm text-sec-fg">{c.audience.text}</p>
        </Reveal>
      </div>
      <BehaviourFlow />
    </Section>
  )
}

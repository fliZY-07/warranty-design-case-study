import { reflection as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Figure } from '../components/Figure.jsx'
import { Rich } from '../components/Rich.jsx'
import { Reveal } from '../components/Reveal.jsx'

export function Reflection() {
  return (
    <Section id={c.id} n={8} tone="deep" eyebrow={c.eyebrow} title={c.title} pad="py-24 md:py-36">
      <ol>
        {c.items.map((it, i) => (
          <li key={it.title} className="grid gap-4 border-t border-sec-line py-12 first:border-t-0 first:pt-2 lg:grid-cols-[minmax(0,26rem)_minmax(0,68ch)] lg:gap-16 [&>*]:min-w-0">
            <Reveal>
              <p aria-hidden="true" className="font-display text-sm font-semibold tabular-nums text-orange">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-sec-fg">{it.title}</h3>
            </Reveal>
            <div>
              <Reveal>
                <p className="text-base text-sec-fg">
                  <Rich text={it.text} />
                </p>
              </Reveal>
            </div>
            {/* charts span the full row so their labels stay at native size */}
            {it.figure && <Figure {...it.figure} variant="chart" parallax className="mt-6 lg:col-span-2" />}
          </li>
        ))}
      </ol>
    </Section>
  )
}

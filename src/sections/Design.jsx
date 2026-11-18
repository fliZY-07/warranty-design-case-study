import { design as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Figure, Img } from '../components/Figure.jsx'
import { Callout } from '../components/Callout.jsx'
import { Carousel } from '../components/Carousel.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal.jsx'

const BAND_ACCENT = ['border-deep', 'border-teal', 'border-orange']

function Band({ band, i }) {
  const figures = band.figures || []
  const phones = figures.filter((f) => !f.strip)
  const strips = figures.filter((f) => f.strip)
  const cols = phones.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'
  return (
    <div className="grid gap-8 border-t border-sec-line py-12 lg:grid-cols-[17rem_1fr] lg:gap-14 [&>*]:min-w-0">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sec-muted">Moment {i + 1}</p>
        <h3 className={`mt-1 border-l-4 pl-4 font-display text-xl font-semibold tracking-tight text-sec-fg ${BAND_ACCENT[i]}`}>{band.name}</h3>
        <ol className="mt-6 space-y-2">
          {band.steps.map((s, si) => (
            <li key={s} className="flex gap-3 text-base text-sec-fg">
              <span aria-hidden="true" className="mt-[0.15em] font-display text-sm font-semibold tabular-nums text-sec-muted">
                {si + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </Reveal>
      {band.carousel ? (
        <Reveal>
          <Carousel slides={band.carousel} label={`${band.name}: app screens`} />
        </Reveal>
      ) : phones.length === 1 ? (
        // a single screen gets the same phone + caption layout as the carousels
        <Reveal as="figure" className="grid items-center gap-8 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-12">
          <div className="mx-auto w-full max-w-[260px]">
            <Img src={phones[0].src} alt={phones[0].alt} frameClass="aspect-[9/19.5] w-full frame-bare" className="object-contain object-top shot-shadow" />
          </div>
          <figcaption className="font-display text-lg font-semibold text-sec-fg">{phones[0].caption}</figcaption>
        </Reveal>
      ) : (
        <RevealGroup className={`grid items-start gap-x-5 gap-y-8 ${cols}`}>
          {phones.map((f) => (
            <RevealItem key={f.src}>
              <Figure {...f} variant="phone" />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
      {strips.map((f) => (
        <Reveal key={f.src} className="lg:col-span-2">
          <Figure {...f} variant="strip" zoom />
        </Reveal>
      ))}
    </div>
  )
}

function DecisionsTable() {
  const t = c.ia.table
  return (
    <Reveal as="figure" className="avoid-break">
      <div role="region" aria-label="Information architecture decisions" tabIndex={0} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-ink/80">
              {t.head.map((h, i) => (
                <th key={h} scope="col" className={`py-3 pr-4 text-left font-semibold ${i === 2 ? 'text-teal-ink' : 'text-sec-muted'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r[0]} className="border-b border-sec-line">
                <th scope="row" className="py-3 pr-4 text-left align-top font-display font-semibold text-sec-fg">
                  {r[0]}
                </th>
                <td className="py-3 pr-4 align-top text-sec-muted">{r[1]}</td>
                <td className="py-3 pr-4 align-top font-medium text-sec-fg">{r[2]}</td>
                <td className="py-3 align-top text-sec-fg">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-sm text-sec-muted">{t.caption}</figcaption>
    </Reveal>
  )
}

export function Design() {
  const ia = c.ia
  return (
    <Section id={c.id} n={7} tone="surface" eyebrow={c.eyebrow} title={c.title}>
      <Reveal>
        <p className="mb-10 max-w-measure text-lg text-sec-fg">{c.intro}</p>
      </Reveal>
      <Figure {...c.flowFigure} variant="chart" parallax />

      <div className="mt-16">
        {c.bands.map((b, i) => (
          <Band key={b.name} band={b} i={i} />
        ))}
      </div>

      <div className="mt-12 border-t border-sec-line pt-16">
        <Reveal>
          <h3 className="font-display text-xl font-semibold tracking-tight text-sec-fg">{ia.title}</h3>
        </Reveal>
        <div className="mt-10 space-y-12">
          <Figure {...ia.figure} variant="chart" parallax />
        </div>
        {/* <div className="mt-14">
          <DecisionsTable />
        </div> */}
      </div>
    </Section>
  )
}

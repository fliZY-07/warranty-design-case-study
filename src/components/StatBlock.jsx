import { CountUp } from './CountUp.jsx'
import { RevealGroup, RevealItem } from './Reveal.jsx'

/** Display figures with a caption underneath. `tone: 'problem'` sets the figure in rust. */
export function StatBlock({ stats, className = '' }) {
  return (
    <RevealGroup as="dl" className={`grid gap-x-10 gap-y-8 sm:grid-cols-3 ${className}`}>
      {stats.map((s) => (
        <RevealItem key={s.label} className="flex flex-col-reverse justify-end border-t border-sec-line pt-4">
          <dt className="mt-2">
            <span className="block text-base font-medium text-sec-fg">{s.label}</span>
            {s.detail && <span className="mt-0.5 block text-sm text-sec-muted">{s.detail}</span>}
          </dt>
          <dd className={`font-display text-display font-semibold tracking-tight ${s.tone === 'problem' ? 'text-rust' : 'text-deep'}`}>
            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
          </dd>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

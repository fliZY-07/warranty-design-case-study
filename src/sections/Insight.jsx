import { useRef } from 'react'
import { insight as c } from '../content/index.js'
import { Section } from '../components/Section.jsx'
import { Callout } from '../components/Callout.jsx'
import { Figure } from '../components/Figure.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { formatNumber } from '../components/CountUp.jsx'
import { gsap, useGsapMedia } from '../lib/motion.js'

function Gates() {
  const ref = useRef(null)

  /* Pinned walk down the five gates (wide screens, motion allowed, tall enough viewport).
     Everywhere else the list is simply static and fully visible. */
  useGsapMedia(ref, ({ pin }) => {
    if (!pin) return
    const root = ref.current
    const gates = gsap.utils.toArray('[data-gate]', root)
    const nums = gates.map((g) => g.querySelector('[data-count]'))
    const fill = root.querySelector('[data-leak-line]')
    nums.forEach((n, i) => (n.textContent = formatNumber(0, c.gates[i].decimals)))

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: root,
        start: 'center center',
        end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: gates.length - 0.5 }, 0)
    gates.forEach((g, i) => {
      const at = i
      const proxy = { v: 0 }
      const { value, decimals } = c.gates[i]
      tl.fromTo(g, { opacity: 0.16 }, { opacity: 1, duration: 0.35 }, at)
      tl.fromTo(g.querySelector('[data-gate-mark]'), { scale: 0.55 }, { scale: 1, duration: 0.35 }, at)
      tl.to(proxy, { v: value, duration: 0.7, onUpdate: () => (nums[i].textContent = formatNumber(proxy.v, decimals)) }, at)
    })
    tl.to({}, { duration: 0.6 }) // brief hold on the complete sequence before releasing

    return () => nums.forEach((n, i) => (n.textContent = formatNumber(c.gates[i].value, c.gates[i].decimals)))
  })

  return (
    <div ref={ref} data-pin className="py-6">
      <ol className="relative" aria-label="The five gates">
        {/* the leak line that runs down through the gates */}
        <span aria-hidden="true" className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-sec-line" />
        <span aria-hidden="true" data-leak-line className="absolute bottom-6 left-[1.1875rem] top-6 w-px origin-top bg-orange" />
        {c.gates.map((g, i) => (
          <li
            key={g.q}
            data-gate
            className="relative grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-t border-sec-line py-5 first:border-t-0 md:grid-cols-[2.5rem_1fr_minmax(10rem,auto)] md:items-center md:gap-x-8"
          >
            <span
              data-gate-mark
              aria-hidden="true"
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange bg-sec-bg font-display text-sm font-semibold text-sec-fg"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-sec-fg">
                <span className="sr-only">Gate {i + 1}: </span>
                {g.q}
              </h3>
              <p className="mt-1 max-w-[52ch] text-base text-sec-muted">
                {/* on phones this is the display figure; on wide screens the animated column shows it */}
                <span className="my-1 block font-display text-xl font-semibold tabular-nums tracking-tight text-orange md:sr-only">
                  {formatNumber(g.value, g.decimals)}
                  {g.suffix}
                </span>{' '}
                {g.text}
              </p>
            </div>
            <p aria-hidden="true" className="hidden text-right font-display text-xl font-semibold tabular-nums tracking-tight text-orange md:block">
              {/* animated copy for screens; the static twin is what print / PDF shows */}
              <span className="count-live">
                <span data-count>{formatNumber(g.value, g.decimals)}</span>
                {g.suffix}
              </span>
              <span className="count-final sr-only">
                {formatNumber(g.value, g.decimals)}
                {g.suffix}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Insight() {
  return (
    <Section id={c.id} n={3} tone="deep" eyebrow={c.eyebrow} title={c.title} pad="py-24 md:py-36">
      <Reveal>
        <p className="max-w-measure text-lg text-sec-fg">{c.intro}</p>
      </Reveal>

      <div className="mt-10 md:mt-12">
        <Gates />
      </div>

      <Reveal className="mt-14 border-l-4 border-orange pl-6">
        <p className="max-w-[30ch] font-display text-xl font-medium tracking-tight text-sec-fg">{c.closing}</p>
      </Reveal>

      <div className="mt-20 space-y-12">
        <Figure {...c.figure} variant="chart" parallax />
      </div>
    </Section>
  )
}

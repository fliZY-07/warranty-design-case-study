import { useState } from 'react'
import { Img } from './Figure.jsx'

function Tag({ children, tone }) {
  const cls = tone === 'after' ? 'bg-teal-ink text-surface' : 'bg-ink text-surface'
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold uppercase tracking-[0.08em] ${cls}`}>{children}</span>
}

/** Plain two-up: used on mobile, under reduced motion, in print, and whenever an image is missing. */
function StaticPair({ before, after, aspect, forced }) {
  return (
    <div className={`${forced ? 'grid' : 'ba-static'} grid-cols-2 gap-3 sm:gap-5`}>
      {[
        ['Before', 'before', before],
        ['After', 'after', after],
      ].map(([label, tone, img]) => (
        <div key={tone}>
          <div className="mb-2">
            <Tag tone={tone}>{label}</Tag>
          </div>
          <Img src={img.src} alt={img.alt} frameClass={`w-full ${aspect}`} className="object-contain object-top" />
        </div>
      ))}
    </div>
  )
}

/** Draggable split. The range input gives keyboard and screen-reader control for free. */
function SliderPair({ before, after, aspect, onMissing }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="ba-slider">
      <div className="mb-2 flex justify-between">
        <Tag tone="before">Before</Tag>
        <Tag tone="after">After</Tag>
      </div>
      <div className={`relative mx-auto w-full max-w-[380px] overflow-hidden rounded-[10px] focus-within:ring-2 focus-within:ring-teal-ink focus-within:ring-offset-2 ${aspect}`}>
        <div className="absolute inset-0">
          <Img src={after.src} alt={after.alt} frameClass="h-full w-full" className="object-contain object-top" onMissing={onMissing} />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img src={before.src} alt={before.alt} frameClass="h-full w-full" className="object-contain object-top" onMissing={onMissing} />
        </div>
        {/* handle: full-width layer so translateX(%) maps to the container width */}
        <div className="pointer-events-none absolute inset-0" style={{ transform: `translateX(${pos - 50}%)` }} aria-hidden="true">
          <div className="absolute inset-y-0 left-1/2 w-0.5 -ml-px bg-ink" />
          <div className="absolute left-1/2 top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 4 2 9l4 5M12 4l4 5-4 5" />
            </svg>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare before and after"
          aria-valuetext={`${pos}% before shown`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  )
}

/** Before/after comparison with labels and a one-line rationale. */
export function BeforeAfter({ title, caption, before, after, aspect = 'aspect-[9/16]' }) {
  // If either file is absent, a split of two placeholders reads as noise — fall back to two-up.
  const [missing, setMissing] = useState(false)
  return (
    <figure className="avoid-break">
      {missing ? (
        <StaticPair before={before} after={after} aspect={aspect} forced />
      ) : (
        <>
          <SliderPair before={before} after={after} aspect={aspect} onMissing={() => setMissing(true)} />
          <StaticPair before={before} after={after} aspect={aspect} />
        </>
      )}
      <figcaption className="mt-4 max-w-measure">
        <span className="block font-display text-lg font-medium text-sec-fg">{title}</span>
        <span className="mt-1 block text-sm text-sec-muted">{caption}</span>
      </figcaption>
    </figure>
  )
}

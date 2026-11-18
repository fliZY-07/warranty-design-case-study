import { useState } from 'react'
import { queueRefresh } from '../lib/motion.js'

/**
 * An <img> that degrades to a deliberate, labelled placeholder when its file is absent.
 * The placeholder keeps the frame's size, centres the alt text and names the expected file.
 */
export function Img({ src, alt, className = '', frameClass = '', eager = false, onMissing }) {
  const [state, setState] = useState('loading') // loading | loaded | missing

  return (
    <div className={`figure-frame relative ${state === 'loaded' ? 'is-loaded' : ''} ${frameClass}`}>
      {/* Labelled placeholder: shown until the file actually loads (also covers lazy images
          not yet requested), and permanently if the file is missing. */}
      {state !== 'loaded' && (
        <div
          role={state === 'missing' ? 'img' : undefined}
          aria-label={state === 'missing' ? alt : undefined}
          aria-hidden={state === 'missing' ? undefined : 'true'}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center"
        >
          <span className="text-sm text-muted">{alt}</span>
          <span className="break-all font-mono text-sm text-muted" aria-hidden="true">
            {src}
          </span>
        </div>
      )}
      {state !== 'missing' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`block h-full w-full ${state === 'loaded' ? '' : 'invisible'} ${className}`}
          onLoad={() => {
            setState('loaded')
            queueRefresh()
          }}
          onError={() => {
            setState('missing')
            onMissing?.()
          }}
        />
      )}
    </div>
  )
}

const VARIANTS = {
  // phone screenshots
  phone: { frame: 'aspect-[9/19.5] w-full frame-bare', img: 'object-contain object-top shot-shadow' },
  // diagrams and charts: natural height once present, generous placeholder until then
  wide: { frame: 'min-h-[300px] md:min-h-[380px]', img: 'h-auto object-contain' },
  // finished charts / diagrams with small text: framed, natural size, scroll sideways on phones
  chart: { frame: 'min-h-[260px]', img: 'h-auto', scroll: true },
  // several phone screens in a row: natural height, scrolls sideways on phones so text stays legible
  strip: { frame: 'min-h-[260px] frame-bare', img: 'h-auto object-contain shot-shadow', scroll: true },
}

/**
 * <figure> with caption. `parallax` lets the frame drift a few dozen px against the text
 * (set up globally in ParallaxController; disabled on small screens and reduced motion).
 */
export function Figure({ src, alt, caption, variant = 'wide', parallax = false, eager = false, zoom = false, className = '' }) {
  const v = VARIANTS[variant] || VARIANTS.wide
  const img = <Img src={src} alt={alt} eager={eager} frameClass={v.frame} className={v.img} />
  return (
    <figure className={`avoid-break ${className}`}>
      <div data-parallax={parallax ? '' : undefined}>
        {v.scroll ? (
          // below md the strip keeps a readable width and scrolls inside its own box
          <div role="region" aria-label={`${caption || alt} (scrolls sideways)`} tabIndex={0} className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
            <div className="min-w-[860px] md:min-w-0">{img}</div>
          </div>
        ) : (
          img
        )}
      </div>
      {(caption || zoom) && (
        <figcaption className="mt-3 max-w-measure text-sm text-sec-muted">
          {caption}
          {zoom && (
            <>
              {' '}
              <a href={src} target="_blank" rel="noopener" className="no-print whitespace-nowrap font-medium text-teal-ink underline underline-offset-2">
                Open full size<span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  )
}

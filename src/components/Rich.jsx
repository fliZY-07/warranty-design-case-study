import { Fragment } from 'react'

/**
 * Tiny inline formatter so copy in src/content can carry emphasis without JSX:
 *   **bold**  → <strong>
 *   *italic*  → <em>
 */
export function Rich({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

/** Renders an array of paragraph strings. */
export function Prose({ paras, className = '' }) {
  return (
    <div className={`max-w-measure space-y-5 text-base ${className}`}>
      {paras.map((p, i) => (
        <p key={i}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  )
}

import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/* Shared media conditions. gsap.matchMedia() reverts everything created under a
   condition the moment it stops matching, so reduced motion / small screens always
   fall back to the plain, final-state DOM. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  // parallax + pinning: wide screens only, never under reduced motion
  wide: '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
  // pin needs enough height for the five gates to fit in view
  pin: '(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 680px)',
}

const RM = '(prefers-reduced-motion: reduce)'

function subscribe(cb) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mql = window.matchMedia(RM)
  mql.addEventListener('change', cb)
  return () => mql.removeEventListener('change', cb)
}
const getSnapshot = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(RM).matches : false)

/** true when the user asked for reduced motion. Synchronous on first render — no flash. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Run GSAP setup inside a gsap.matchMedia scoped to `scopeRef`.
 * `setup(conditions)` receives { motion, wide, pin } booleans and may return a cleanup.
 * All tweens and ScrollTriggers are killed and reverted on unmount.
 */
export function useGsapMedia(scopeRef, setup, deps = []) {
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current || undefined)
    mm.add(MQ, (ctx) => setup(ctx.conditions, ctx))
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ---------- Lenis smooth scrolling (skipped entirely under reduced motion) ---------- */
let lenisInstance = null
export const getLenis = () => lenisInstance

export async function startLenis() {
  if (getSnapshot()) return null
  const { default: Lenis } = await import('lenis')
  const lenis = new Lenis({ lerp: 0.12, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenisInstance = lenis
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenisInstance = null
  }
}

/** Scroll to a section, honouring Lenis when it is running. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el, { offset: -8 })
  else el.scrollIntoView({ behavior: getSnapshot() ? 'auto' : 'smooth', block: 'start' })
  // move focus for keyboard + screen-reader users
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/* Debounced refresh, used when images finish loading and change layout. */
let refreshTimer
export function queueRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
}

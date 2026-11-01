'use client'

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

/* ─── hooks ────────────────────────────────────────────────────────────── */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return reduced
}

/** Fires once, the first time the element crosses `threshold`. */
export function useInView<T extends Element>(threshold = 0.15): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, seen]
}

/* ─── atoms ────────────────────────────────────────────────────────────── */

export function PulseDot() {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: 'none',
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        animation: 'raf-pulse 2.2s ease-out infinite',
      }}
    />
  )
}

export function Cursor() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: '0.95em',
        marginLeft: '0.08em',
        verticalAlign: '-0.12em',
        background: 'var(--color-accent)',
        boxShadow: '0 0 12px color-mix(in srgb, var(--color-accent) 70%, transparent)',
        animation: 'raf-blink 1.05s steps(1) infinite',
      }}
    />
  )
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      style={{
        padding: '0 5px',
        border: '1px solid var(--color-neutral-700)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-neutral-300)',
      }}
    >
      {children}
    </kbd>
  )
}

export function Redacted({ label = 'redacted', width }: { label?: string; width?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{
        display: 'inline-block',
        flex: 'none',
        width: width ?? '8ch',
        height: '1.05em',
        borderRadius: 1,
        background: 'var(--color-neutral-300)',
      }}
    />
  )
}

export function FadeRule({ style }: { style?: React.CSSProperties }) {
  return <div aria-hidden="true" className="hr" style={style} />
}

/** Scrambles into place the first time it scrolls into view. */
export function DecryptText({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const [ref, seen] = useInView<HTMLSpanElement>(0.6)
  const [out, setOut] = useState(text)
  const done = useRef(false)

  useEffect(() => {
    if (!seen || reduced || done.current) return
    done.current = true
    const pool = '!<>-_\\/[]{}=+*^?#%01abcdef'
    const t0 = performance.now()
    const dur = 700
    let raf = 0
    const frame = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const n = Math.floor(p * text.length)
      let s = text.slice(0, n)
      for (let i = n; i < text.length; i++) s += pool[(Math.random() * pool.length) | 0]
      setOut(p < 1 ? s : text)
      if (p < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reduced, seen, text])

  return <span ref={ref}>{out}</span>
}

/** `0x01  /about ──────── $ whoami --verbose` */
export function SectionHeading({
  hex,
  id,
  name,
  cmd,
}: {
  hex: string
  id: string
  name: string
  cmd: string
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px' }}>
      <span
        style={{
          font: '500 12px/1 var(--font-heading)',
          letterSpacing: '.12em',
          color: 'var(--color-accent-2)',
        }}
      >
        {hex}
      </span>
      <h2
        id={id}
        aria-label={'/' + name}
        style={{
          margin: 0,
          font: '500 clamp(30px, 4.4vw, 52px)/1.04 var(--font-heading)',
          letterSpacing: '-0.035em',
          color: 'var(--color-text)',
        }}
      >
        <span
          style={{
            color: 'var(--color-accent)',
            textShadow: '0 0 24px color-mix(in srgb, var(--color-accent) 45%, transparent)',
          }}
        >
          /
        </span>
        <DecryptText text={name} />
      </h2>
      <span aria-hidden="true" className="hr" style={{ flex: '1 1 60px' }} />
      <code style={{ font: '400 12px/1.4 var(--font-heading)', color: 'var(--color-neutral-500)' }}>
        {cmd}
      </code>
    </div>
  )
}

export const SECTION_STYLE: React.CSSProperties = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: 'clamp(72px, 10vw, 136px) clamp(16px, 4vw, 40px) 0',
  scrollMarginTop: 64,
  boxSizing: 'border-box',
}

export const LEAD_STYLE: React.CSSProperties = {
  margin: '16px 0 0',
  maxWidth: '62ch',
  font: '400 16.5px/1.65 var(--font-body)',
  color: 'var(--color-neutral-400)',
  textWrap: 'pretty',
}

/** The dotted-leader `key ......... value` row used in the status panels. */
export function LeaderRow({
  term,
  children,
}: {
  term: string
  children: ReactNode
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '7px 0' }}>
      <dt
        className="dotted-leader"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          whiteSpace: 'nowrap',
          color: 'var(--color-neutral-500)',
        }}
      >
        {term}
      </dt>
      <dd style={{ margin: 0, textAlign: 'right', color: 'var(--color-text)' }}>{children}</dd>
    </div>
  )
}

/** A terminal-frame header strip: `›_ raf-sh — tty1 ············ live` */
export function PanelHeader({
  children,
  right,
}: {
  children: ReactNode
  right?: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderBottom: '1px solid var(--color-divider)',
        font: '500 11px/1 var(--font-heading)',
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--color-neutral-400)',
      }}
    >
      {children}
      {right ? <span style={{ marginLeft: 'auto' }}>{right}</span> : null}
    </div>
  )
}

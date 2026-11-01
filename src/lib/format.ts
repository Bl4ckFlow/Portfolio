import type { Severity, SkillGroup } from '../data/portfolio'

export type SevStyle = {
  rank: number
  segs: number
  label: string
  short: string
  fg: string
  bg: string
  border: string
  on: string
  off: string
}

export const SEV: Record<Severity, SevStyle> = {
  critical: {
    rank: 0,
    segs: 4,
    label: 'critical',
    short: 'CRIT',
    fg: 'var(--color-bg)',
    bg: 'var(--color-accent-2)',
    border: 'var(--color-accent-2)',
    on: 'var(--color-bg)',
    off: 'color-mix(in srgb, var(--color-bg) 30%, transparent)',
  },
  high: {
    rank: 1,
    segs: 3,
    label: 'high',
    short: 'HIGH',
    fg: 'var(--color-accent-2)',
    bg: 'color-mix(in srgb, var(--color-accent-2) 10%, transparent)',
    border: 'color-mix(in srgb, var(--color-accent-2) 55%, transparent)',
    on: 'var(--color-accent-2)',
    off: 'var(--color-neutral-700)',
  },
  medium: {
    rank: 2,
    segs: 2,
    label: 'medium',
    short: 'MED',
    fg: 'var(--color-accent-2-300)',
    bg: 'transparent',
    border: 'var(--color-accent-2-700)',
    on: 'var(--color-accent-2-400)',
    off: 'var(--color-neutral-700)',
  },
  low: {
    rank: 3,
    segs: 1,
    label: 'low',
    short: 'LOW',
    fg: 'var(--color-neutral-300)',
    bg: 'transparent',
    border: 'var(--color-neutral-700)',
    on: 'var(--color-neutral-400)',
    off: 'var(--color-neutral-800)',
  },
}

/** A 0–1 level as a byte: 0x00 never touched it, 0xFF wrote the book. */
export const hx = (l: number) => '0x' + Math.round(l * 255).toString(16).toUpperCase().padStart(2, '0')

export const avg = (g: SkillGroup) => g.items.reduce((s, it) => s + it[1], 0) / g.items.length

/** Syntax tint for a line of an HTTP request/response excerpt. */
export const codeColor = (l: string) =>
  /^(GET|POST|PUT|PATCH|DELETE) /.test(l)
    ? 'var(--color-text)'
    : /^HTTP\//.test(l)
      ? 'var(--color-accent-2)'
      : /^#/.test(l)
        ? 'var(--color-neutral-500)'
        : /^[A-Za-z-]+: /.test(l)
          ? 'var(--color-neutral-400)'
          : 'var(--color-neutral-200)'

export type CodeSeg = { red: true; w: string } | { red: false; t: string }

/** Splits a code line on `[[n]]` markers into text and n-character redaction bars. */
export const segs = (l: string): CodeSeg[] =>
  l
    .split(/(\[\[\d+\]\])/)
    .filter(Boolean)
    .map((p) => {
      const m = p.match(/^\[\[(\d+)\]\]$/)
      return m ? ({ red: true, w: m[1] + 'ch' } as const) : ({ red: false, t: p } as const)
    })

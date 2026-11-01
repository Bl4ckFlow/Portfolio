'use client'

import { useMemo, useState } from 'react'
import {
  CLASS_LABEL,
  FINDINGS,
  LEDGER_STATS,
  STATUS_META,
  group,
  type Finding,
  type FindingClass,
} from '../data/findings'
import { SEV } from '../lib/format'
import { LEAD_STYLE, SECTION_STYLE, SectionHeading } from './ui'

const STATUS_COLOR: Record<string, string> = {
  validated: 'var(--color-accent)',
  pending: 'var(--color-accent-2)',
  duplicate: 'var(--color-neutral-400)',
  closed: 'var(--color-neutral-500)',
}

function Filter({
  label,
  name,
  value,
  options,
  counts,
  onPick,
}: {
  label: string
  name: string
  value: string
  options: string[]
  counts: Record<string, number>
  onPick: (v: string) => void
}) {
  const id = 'lbl-' + name
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px' }}>
      <span id={id} style={{ flex: '0 0 10ch', fontSize: 12, color: 'var(--color-neutral-400)' }}>
        {label}
      </span>
      <div
        className="seg no-bar"
        role="radiogroup"
        aria-labelledby={id}
        style={{ maxWidth: '100%', overflowX: 'auto' }}
      >
        {options.map((v) => {
          const c = counts[v] ?? 0
          return (
            <label
              key={v}
              className="seg-opt"
              style={{
                padding: '6px 11px',
                fontSize: 12,
                whiteSpace: 'nowrap',
                opacity: c === 0 ? 0.4 : 1,
                cursor: c === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <input
                type="radio"
                name={name}
                value={v}
                checked={value === v}
                disabled={c === 0}
                onChange={() => onPick(v)}
              />
              <span>{v}</span>
              <span style={{ color: 'var(--color-neutral-500)' }}>{c}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function Row({ f }: { f: Finding }) {
  const sv = SEV[f.sev]
  const g = group(f)
  const meta = STATUS_META[f.status]
  // the critical badge paints its meter in --color-bg against a filled chip;
  // on the ledger's dark ground that reads as nothing, so re-tint it here
  const crit = f.sev === 'critical'
  const meterOn = crit ? 'var(--color-accent-2)' : sv.on
  const meterOff = crit ? 'var(--color-neutral-700)' : sv.off

  return (
    <li className="ledger">
      <span className="ledger-id" style={{ color: 'var(--color-neutral-300)', letterSpacing: '.02em' }}>
        {f.id}
      </span>

      <span className="ledger-date" style={{ color: 'var(--color-neutral-500)' }}>
        {f.date}
      </span>

      <span className="ledger-sev" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2 }}>
          {[0, 1, 2, 3].map((i) => (
            <i
              key={i}
              style={{
                display: 'block',
                width: 4,
                height: 10,
                borderRadius: 1,
                background: i < sv.segs ? meterOn : meterOff,
              }}
            />
          ))}
        </span>
        <span
          style={{
            font: '600 11px/1 var(--font-heading)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: crit ? 'var(--color-accent-2)' : sv.fg,
          }}
        >
          {sv.short}
        </span>
        {f.cvss ? <span style={{ color: 'var(--color-neutral-500)' }}>{f.cvss}</span> : null}
      </span>

      <span className="ledger-what" style={{ minWidth: 0 }}>
        <span
          className="tag tag-accent"
          style={{ font: '500 11px/1.4 var(--font-heading)', letterSpacing: '.06em', marginRight: 8 }}
        >
          {f.cls}
        </span>
        <span style={{ color: 'var(--color-neutral-200)' }}>{f.title ?? CLASS_LABEL[f.cls]}</span>
        <span
          role="img"
          aria-label="target redacted"
          title="Program, asset and endpoint redacted per disclosure policy"
          style={{
            display: 'inline-block',
            width: '7ch',
            height: '0.95em',
            marginLeft: 8,
            verticalAlign: '-0.08em',
            borderRadius: 1,
            background: 'var(--color-neutral-700)',
          }}
        />
      </span>

      <span className="ledger-status" style={{ color: STATUS_COLOR[g] }}>
        {g === 'validated' ? '✓' : g === 'pending' ? '◆' : '·'} {meta.label}
      </span>

      <span className="ledger-plat" style={{ color: 'var(--color-neutral-500)' }}>
        {f.platform === 'SignalFisher' ? 'signalfisher' : 'yeswehack'}
      </span>
    </li>
  )
}

export default function Findings() {
  const [sev, setSev] = useState('all')
  const [cls, setCls] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const classValues = useMemo(() => {
    const seen = new Set(FINDINGS.map((f) => f.cls))
    return ['all', ...(Object.keys(CLASS_LABEL) as FindingClass[]).filter((c) => seen.has(c))]
  }, [])

  // default view is the live work; the button folds duplicates and closed reports back in
  const pool = useMemo(
    () => (showAll ? FINDINGS : FINDINGS.filter((f) => ['validated', 'pending'].includes(group(f)))),
    [showAll],
  )

  const count = (key: 'sev' | 'cls', v: string) =>
    v === 'all' ? pool.length : pool.filter((f) => f[key] === v).length
  const sevCounts = Object.fromEntries(
    ['all', 'critical', 'high', 'medium', 'low'].map((v) => [v, count('sev', v)]),
  )
  const clsCounts = Object.fromEntries(classValues.map((v) => [v, count('cls', v)]))

  const shown = pool
    .filter((f) => (sev === 'all' || f.sev === sev) && (cls === 'all' || f.cls === cls))
    .sort(
      (a, b) =>
        SEV[a.sev].rank - SEV[b.sev].rank ||
        b.date.localeCompare(a.date) ||
        a.id.localeCompare(b.id),
    )

  const hidden = LEDGER_STATS.duplicate + LEDGER_STATS.closed
  const query = `$ query --severity=${sev} --class=${cls.toLowerCase()}${showAll ? ' --all' : ''}`
  const s = LEDGER_STATS

  if (!FINDINGS.length) return null

  return (
    <section id="findings" aria-labelledby="h-findings" style={SECTION_STYLE}>
      <SectionHeading hex="0x02" id="h-findings" name="findings" cmd="$ query --redacted --sort=severity" />
      <p style={LEAD_STYLE}>
        Every report I’ve filed on SignalFisher and YesWeHack, against public-sector, banking,
        health and platform programs. Program names, assets and endpoints stay redacted — several of
        these are still open, so their targets aren’t patched yet. What’s left is the shape of the
        work.
      </p>

      {/* aggregate ledger — the full picture, including what never landed */}
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
          gap: 1,
          margin: '28px 0 0',
          padding: 1,
          border: '1px solid var(--color-neutral-800)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-neutral-800)',
          overflow: 'hidden',
        }}
      >
        {(
          [
            ['reports filed', String(s.total), 'var(--color-text)'],
            ['programs', String(s.programs), 'var(--color-text)'],
            ['critical', String(s.critical), 'var(--color-accent-2)'],
            ['high', String(s.high), 'var(--color-accent-2-300)'],
            ['accepted / resolved', String(s.validated), 'var(--color-accent)'],
            ['still open', String(s.pending), 'var(--color-accent-2)'],
          ] as [string, string, string][]
        ).map(([k, v, c]) => (
          <div
            key={k}
            style={{
              padding: '14px 16px',
              background: 'color-mix(in srgb, var(--color-surface) 84%, transparent)',
            }}
          >
            <dt
              style={{
                font: '500 10.5px/1 var(--font-heading)',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--color-neutral-500)',
              }}
            >
              {k}
            </dt>
            <dd
              style={{
                margin: '9px 0 0',
                font: '500 26px/1 var(--font-heading)',
                letterSpacing: '-0.02em',
                color: c,
              }}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <div
        role="group"
        aria-label="Filter findings"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 16,
          padding: '14px 16px',
          border: '1px solid var(--color-neutral-800)',
          borderRadius: 'var(--radius-lg)',
          background: 'color-mix(in srgb, var(--color-surface) 72%, transparent)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        <Filter
          label="--severity"
          name="sev"
          value={sev}
          options={['all', 'critical', 'high', 'medium', 'low']}
          counts={sevCounts}
          onPick={setSev}
        />
        <Filter label="--class" name="cls" value={cls} options={classValues} counts={clsCounts} onPick={setCls} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px 14px',
            paddingTop: 10,
            borderTop: '1px dashed var(--color-neutral-800)',
          }}
        >
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-pressed={showAll}
            className="btn btn-secondary"
            style={{ padding: '6px 11px', fontSize: 12, color: 'var(--color-neutral-200)' }}
          >
            <span aria-hidden="true" style={{ color: 'var(--color-neutral-500)' }}>
              {showAll ? '[−]' : '[+]'}
            </span>
            {showAll ? 'hide duplicates & closed' : `show duplicates & closed (${hidden})`}
          </button>
          <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>
            {showAll
              ? `${s.duplicate} duplicates — real bugs someone reported first`
              : 'collapsed to accepted, resolved and in-triage reports'}
          </span>
        </div>

        <div
          aria-live="polite"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 14px',
            paddingTop: 10,
            borderTop: '1px dashed var(--color-neutral-800)',
            fontSize: 12,
            color: 'var(--color-neutral-500)',
          }}
        >
          <span>
            <span style={{ color: 'var(--color-accent)' }}>{shown.length}</span> / {s.total} records
          </span>
          <span>{query}</span>
        </div>
      </div>

      <ul
        style={{
          margin: '16px 0 0',
          padding: 0,
          listStyle: 'none',
          border: '1px solid var(--color-neutral-800)',
          borderRadius: 'var(--radius-lg)',
          background: 'color-mix(in srgb, var(--color-surface) 70%, transparent)',
          overflow: 'hidden',
        }}
      >
        <li className="ledger ledger-head" aria-hidden="true">
          <span className="ledger-id">report</span>
          <span className="ledger-date">date</span>
          <span className="ledger-sev">severity</span>
          <span className="ledger-what">class · finding · target</span>
          <span className="ledger-status">status</span>
          <span className="ledger-plat">platform</span>
        </li>
        {shown.map((f) => (
          <Row key={f.platform + f.id} f={f} />
        ))}
      </ul>

      {shown.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px 12px',
            marginTop: 16,
            padding: '24px 18px',
            border: '1px dashed var(--color-neutral-700)',
            borderRadius: 'var(--radius-lg)',
            font: '400 13px/1.6 var(--font-heading)',
            color: 'var(--color-neutral-400)',
          }}
        >
          <span>
            <span style={{ color: 'var(--color-accent-2)' }}>0 records</span> match{' '}
            <span style={{ color: 'var(--color-text)' }}>{query}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setSev('all')
              setCls('all')
            }}
            className="btn btn-ghost"
            style={{ fontSize: 13, color: 'var(--color-accent)' }}
          >
            reset filters
          </button>
        </div>
      ) : null}

      <p
        style={{
          margin: '14px 0 0',
          font: '400 12.5px/1.6 var(--font-heading)',
          color: 'var(--color-neutral-500)',
        }}
      >
        Write-ups available on request for findings whose programs have cleared disclosure.
      </p>
    </section>
  )
}

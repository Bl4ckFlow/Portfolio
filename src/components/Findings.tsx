'use client'

import { useMemo, useState } from 'react'
import { FINDINGS, type Finding } from '../data/portfolio'
import { SEV, codeColor, segs } from '../lib/format'
import { LEAD_STYLE, Redacted, SECTION_STYLE, SectionHeading } from './ui'

const H4: React.CSSProperties = {
  margin: '0 0 10px',
  font: '500 11.5px/1 var(--font-heading)',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
}
const DT: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral-500)',
}
const BODY: React.CSSProperties = {
  margin: 0,
  font: '400 15px/1.65 var(--font-body)',
  color: 'var(--color-neutral-300)',
  textWrap: 'pretty',
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
      <div className="seg no-bar" role="radiogroup" aria-labelledby={id} style={{ maxWidth: '100%', overflowX: 'auto' }}>
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

function Card({
  f,
  expanded,
  onToggle,
}: {
  f: Finding
  expanded: boolean
  onToggle: () => void
}) {
  const sv = SEV[f.sev]
  return (
    <article
      aria-labelledby={'f-' + f.id}
      className="hover-finding"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '18px 18px 12px',
        border:
          '1px solid ' +
          (expanded ? 'color-mix(in srgb, var(--color-accent) 42%, transparent)' : 'var(--color-neutral-800)'),
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--color-surface) 88%, transparent)',
        boxShadow: expanded
          ? '0 0 0 1px color-mix(in srgb, var(--color-accent) 10%, transparent), 0 0 60px -24px color-mix(in srgb, var(--color-accent) 55%, transparent)'
          : 'none',
        transition: 'border-color .2s, box-shadow .2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
          font: '400 12px/1 var(--font-heading)',
          color: 'var(--color-neutral-500)',
        }}
      >
        <span style={{ letterSpacing: '.04em', color: 'var(--color-neutral-300)' }}>{f.id}</span>
        <span aria-hidden="true">·</span>
        <span>{f.date}</span>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 8px 4px 6px',
            border: '1px solid ' + sv.border,
            borderRadius: 'var(--radius-sm)',
            background: sv.bg,
            font: '600 11px/1 var(--font-heading)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: sv.fg,
          }}
        >
          <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2 }}>
            {[0, 1, 2, 3].map((i) => (
              <i
                key={i}
                style={{
                  display: 'block',
                  width: 4,
                  height: 10,
                  borderRadius: 1,
                  background: i < sv.segs ? sv.on : sv.off,
                }}
              />
            ))}
          </span>
          <span>{sv.label}</span>
          <span style={{ fontWeight: 500, opacity: 0.8 }}>{f.cvss}</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <span className="tag tag-accent" style={{ font: '500 11px/1.4 var(--font-heading)', letterSpacing: '.06em' }}>
            {f.cls}
          </span>
          <span className="tag tag-neutral" style={{ font: '400 11px/1.4 var(--font-heading)' }}>
            {f.cwe}
          </span>
        </div>
        <h3
          id={'f-' + f.id}
          style={{
            margin: 0,
            font: '500 19px/1.3 var(--font-heading)',
            letterSpacing: '-0.01em',
            color: 'var(--color-text)',
            textWrap: 'balance',
          }}
        >
          {f.title}
        </h3>
        <p style={{ ...BODY, font: '400 15px/1.6 var(--font-body)' }}>{f.impact}</p>
      </div>

      <dl
        style={{
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))',
          gap: 12,
          paddingTop: 14,
          borderTop: '1px dashed var(--color-neutral-800)',
          font: '400 12.5px/1.3 var(--font-heading)',
        }}
      >
        <div>
          <dt style={DT}>target</dt>
          <dd style={{ margin: '7px 0 0', display: 'flex', alignItems: 'center', gap: 7, color: 'var(--color-neutral-200)' }}>
            <span
              role="img"
              aria-label="redacted"
              title="Redacted per disclosure policy"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 6px',
                background: 'var(--color-neutral-200)',
                font: '600 10px/1.2 var(--font-heading)',
                letterSpacing: '.16em',
                color: 'var(--color-bg)',
              }}
            >
              REDACTED
            </span>
            program
          </dd>
        </div>
        <div>
          <dt style={DT}>platform</dt>
          <dd style={{ margin: '7px 0 0', color: 'var(--color-neutral-200)' }}>{f.platform}</dd>
        </div>
        <div>
          <dt style={DT}>status</dt>
          <dd
            style={{
              margin: '7px 0 0',
              color: f.status === 'resolved' ? 'var(--color-accent)' : 'var(--color-neutral-200)',
            }}
          >
            {f.status === 'resolved' ? '✓' : '◆'} {f.status}
          </dd>
        </div>
      </dl>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, margin: '0 -8px' }}>
        <button
          type="button"
          className="btn btn-ghost"
          aria-expanded={expanded}
          aria-controls={'wu-' + f.id}
          onClick={onToggle}
          style={{ padding: 8, font: '500 13px/1 var(--font-heading)', color: 'var(--color-accent)' }}
        >
          <span aria-hidden="true" style={{ color: 'var(--color-neutral-500)' }}>
            {expanded ? '[−]' : '[+]'}
          </span>
          {expanded ? 'close write-up.md' : 'cat write-up.md'}
        </button>
        <span
          style={{
            marginLeft: 'auto',
            paddingRight: 8,
            font: '400 11.5px/1 var(--font-heading)',
            color: 'var(--color-neutral-500)',
          }}
        >
          {f.trail[f.trail.length - 1]}
        </span>
      </div>

      {expanded ? (
        <div
          id={'wu-' + f.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            margin: '0 -18px -12px',
            padding: '18px 18px 20px',
            borderTop: '1px solid var(--color-divider)',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
            background: 'color-mix(in srgb, var(--color-bg) 62%, transparent)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '6px 10px',
              font: '400 12px/1.4 var(--font-heading)',
              color: 'var(--color-neutral-500)',
            }}
          >
            <span style={{ color: 'var(--color-neutral-300)' }}>write-up.md</span>
            {f.trail.map((t) => (
              <span key={t} style={{ display: 'inline-flex', gap: '6px' }}>
                <span aria-hidden="true" style={{ color: 'var(--color-neutral-600)' }}>
                  →
                </span>
                <span>{t}</span>
              </span>
            ))}
          </div>

          <div>
            <h4 style={{ ...H4, margin: '0 0 8px' }}>01 — summary</h4>
            <p style={BODY}>{f.summary}</p>
          </div>

          <div>
            <h4 style={H4}>02 — impact</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {f.impacts.map((it) => (
                <li
                  key={it}
                  style={{ display: 'flex', gap: 10, font: '400 15px/1.55 var(--font-body)', color: 'var(--color-neutral-300)' }}
                >
                  <span aria-hidden="true" style={{ flex: 'none', fontFamily: 'var(--font-heading)', color: 'var(--color-accent-2)' }}>
                    !
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={H4}>03 — proof of concept</h4>
            <ol
              style={{
                margin: '0 0 14px',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {f.poc.map((t, i) => (
                <li
                  key={t}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3ch minmax(0,1fr)',
                    gap: 8,
                    font: '400 15px/1.55 var(--font-body)',
                    color: 'var(--color-neutral-300)',
                  }}
                >
                  <span style={{ font: '500 12px/1.95 var(--font-heading)', color: 'var(--color-accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <div
              role="group"
              aria-label="Request excerpt, hosts redacted"
              style={{
                padding: '12px 14px',
                overflowX: 'auto',
                border: '1px solid var(--color-neutral-800)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-neutral-900)',
                font: '400 12.5px/1.7 var(--font-heading)',
              }}
            >
              {f.code.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', minHeight: '1.7em', color: codeColor(l) }}>
                  {segs(l).map((s, j) =>
                    s.red ? (
                      <Redacted key={j} width={s.w} />
                    ) : (
                      <span key={j} style={{ whiteSpace: 'pre' }}>
                        {s.t}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ ...H4, margin: '0 0 8px' }}>04 — remediation</h4>
            <p style={BODY}>{f.fix}</p>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default function Findings() {
  const [sev, setSev] = useState('all')
  const [cls, setCls] = useState('all')
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const clsValues = useMemo(() => ['all', ...new Set(FINDINGS.map((f) => f.cls))], [])

  const count = (key: 'sev' | 'cls', v: string) =>
    v === 'all' ? FINDINGS.length : FINDINGS.filter((f) => f[key] === v).length
  const sevCounts = Object.fromEntries(
    ['all', 'critical', 'high', 'medium', 'low'].map((v) => [v, count('sev', v)]),
  )
  const clsCounts = Object.fromEntries(clsValues.map((v) => [v, count('cls', v)]))

  const shown = FINDINGS.filter(
    (f) => (sev === 'all' || f.sev === sev) && (cls === 'all' || f.cls === cls),
  ).sort((a, b) => SEV[a.sev].rank - SEV[b.sev].rank || b.date.localeCompare(a.date))

  const query = `$ query --severity=${sev} --class=${cls.toLowerCase()}`

  if (!FINDINGS.length) return null

  return (
    <section id="findings" aria-labelledby="h-findings" style={SECTION_STYLE}>
      <SectionHeading hex="0x02" id="h-findings" name="findings" cmd="$ query --redacted --sort=severity" />
      <p style={LEAD_STYLE}>
        Selected disclosures from public bug bounty programs, published with program permission. Program
        names and hosts are redacted — the bugs are real, the targets stay anonymous.
      </p>

      <div
        role="group"
        aria-label="Filter findings"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 28,
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
        <Filter
          label="--class"
          name="cls"
          value={cls}
          options={clsValues}
          counts={clsCounts}
          onPick={setCls}
        />
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
            <span style={{ color: 'var(--color-accent)' }}>{shown.length}</span> / {FINDINGS.length} records
          </span>
          <span>{query}</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: 16,
          alignItems: 'start',
          marginTop: 16,
        }}
      >
        {shown.map((f) => (
          <Card
            key={f.id}
            f={f}
            expanded={!!open[f.id]}
            onToggle={() => setOpen((o) => ({ ...o, [f.id]: !o[f.id] }))}
          />
        ))}
      </div>

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
    </section>
  )
}

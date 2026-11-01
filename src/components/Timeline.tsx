'use client'

import { TIMELINE, type Commit } from '../data/portfolio'
import { LEAD_STYLE, SECTION_STYLE, SectionHeading } from './ui'

function Dot({ kind }: { kind: Commit['dot'] }) {
  const base: React.CSSProperties = {
    position: 'relative',
    justifySelf: 'center',
    width: 12,
    height: 12,
    marginTop: 5,
    borderRadius: '50%',
  }
  if (kind === 'target')
    return (
      <span
        aria-hidden="true"
        style={{
          ...base,
          boxSizing: 'border-box',
          border: '1.5px dashed var(--color-accent)',
          background: 'var(--color-bg)',
        }}
      />
    )
  if (kind === 'head')
    return (
      <span
        aria-hidden="true"
        style={{
          ...base,
          background: 'var(--color-accent)',
          boxShadow:
            '0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent), 0 0 14px color-mix(in srgb, var(--color-accent) 60%, transparent)',
        }}
      />
    )
  return (
    <span
      aria-hidden="true"
      style={{ ...base, background: kind === 'done' ? 'var(--color-accent)' : 'var(--color-neutral-400)' }}
    />
  )
}

export default function Timeline() {
  return (
    <section id="timeline" aria-labelledby="h-timeline" style={SECTION_STYLE}>
      <SectionHeading hex="0x06" id="h-timeline" name="timeline" cmd="$ git log --graph --decorate" />
      <p style={LEAD_STYLE}>Every career is a repository. Here’s mine — newest commits first.</p>

      <ol style={{ maxWidth: 860, margin: '40px 0 0', padding: 0, listStyle: 'none' }}>
        {TIMELINE.map((c, i) => {
          const last = i === TIMELINE.length - 1
          return (
            <li
              key={c.sha}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '28px minmax(0,1fr)',
                columnGap: 16,
                paddingBottom: last ? 0 : 34,
              }}
            >
              {!last ? (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 13.5,
                    top: 22,
                    bottom: -6,
                    width: 1,
                    background:
                      c.dot === 'target'
                        ? 'repeating-linear-gradient(to bottom, var(--color-accent-700) 0 4px, transparent 4px 8px)'
                        : 'var(--color-neutral-700)',
                  }}
                />
              ) : null}
              <Dot kind={c.dot} />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '4px 10px',
                    font: '400 13px/1.5 var(--font-heading)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-2)' }}>{c.sha}</span>
                  {c.refs?.length ? (
                    <span style={{ color: 'var(--color-neutral-400)' }}>
                      (
                      {c.refs.map((r, j) => (
                        <span key={r.t}>
                          {j > 0 ? ', ' : ''}
                          <span
                            style={{
                              color: r.kind === 'tag' ? 'var(--color-accent-2)' : 'var(--color-accent)',
                            }}
                          >
                            {r.t}
                          </span>
                        </span>
                      ))}
                      )
                    </span>
                  ) : null}
                  <span style={{ marginLeft: 'auto', color: 'var(--color-neutral-500)' }}>{c.when}</span>
                </div>
                <h3
                  style={{
                    margin: '6px 0',
                    font: '500 clamp(16px, 1.6vw, 19px)/1.4 var(--font-heading)',
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text)',
                  }}
                >
                  {c.subject}
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: '66ch',
                    font: '400 15.5px/1.65 var(--font-body)',
                    color: 'var(--color-neutral-300)',
                    textWrap: 'pretty',
                  }}
                >
                  {c.body}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

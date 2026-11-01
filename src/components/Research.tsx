'use client'

import { CONTACT, DOSSIERS } from '../data/portfolio'
import { LEAD_STYLE, Redacted, SECTION_STYLE, SectionHeading } from './ui'

const KICKER: React.CSSProperties = {
  margin: '0 0 8px',
  font: '500 11px/1 var(--font-heading)',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral-500)',
}

export default function Research() {
  return (
    <section id="research" aria-labelledby="h-research" style={SECTION_STYLE}>
      <SectionHeading hex="0x03" id="h-research" name="research" cmd="$ ls -la ./dossiers" />
      <p style={LEAD_STYLE}>Two papers in the pipeline. Partial release below — full drafts on request.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '56px 20px',
          marginTop: 56,
        }}
      >
        {DOSSIERS.map((d, i) => (
          <article
            key={d.slug}
            aria-labelledby={'d' + i + '-title'}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--color-neutral-700)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
              background:
                'linear-gradient(180deg, var(--color-surface), color-mix(in srgb, var(--color-surface) 70%, transparent))',
            }}
          >
            {/* file tab */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: -1,
                bottom: 'calc(100% - 1px)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px 7px',
                border: '1px solid var(--color-neutral-700)',
                borderBottom: 0,
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                background: 'var(--color-surface)',
                font: '500 11px/1 var(--font-heading)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--color-neutral-300)',
              }}
            >
              {d.file}
              <span style={{ color: 'var(--color-neutral-500)' }}>· {d.slug}</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px 16px',
                padding: '11px 20px',
                borderBottom: '1px dashed var(--color-neutral-700)',
                font: '500 11px/1.2 var(--font-heading)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: 'var(--color-accent-2)' }}>classified // partial release</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-neutral-500)' }}>
                ref
                <Redacted />
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '22px 20px 20px' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                  <p style={KICKER}>subject</p>
                  <h3
                    id={'d' + i + '-title'}
                    style={{
                      margin: 0,
                      font: '500 clamp(21px, 2.2vw, 27px)/1.22 var(--font-heading)',
                      letterSpacing: '-0.02em',
                      color: 'var(--color-text)',
                      textWrap: 'balance',
                    }}
                  >
                    {d.title}
                  </h3>
                </div>
                <div
                  style={{
                    flex: 'none',
                    margin: '4px 6px 0 0',
                    padding: '7px 12px',
                    transform: `rotate(${d.rotate}deg)`,
                    border: '2px solid var(--color-accent-2)',
                    outline: '1px solid color-mix(in srgb, var(--color-accent-2) 45%, transparent)',
                    outlineOffset: 3,
                    borderRadius: 'var(--radius-sm)',
                    font: '600 12px/1.2 var(--font-heading)',
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: 'var(--color-accent-2)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {d.stamp}
                </div>
              </div>

              <dl
                style={{
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '14px 20px',
                  font: '400 13px/1.45 var(--font-heading)',
                }}
              >
                {d.meta.map(([k, v]) => (
                  <div key={k}>
                    <dt style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-neutral-500)' }}>
                      {k}
                    </dt>
                    <dd style={{ margin: '4px 0 0', color: 'var(--color-neutral-200)' }}>{v}</dd>
                  </div>
                ))}
              </dl>

              <div>
                <p style={KICKER}>abstract — declassified excerpt</p>
                <p
                  style={{
                    margin: 0,
                    font: '400 15.5px/1.7 var(--font-body)',
                    color: 'var(--color-neutral-300)',
                    textWrap: 'pretty',
                  }}
                >
                  {d.abstract}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {d.tags.map((t) => (
                  <span key={t} className="tag tag-neutral" style={{ font: '400 11.5px/1.4 var(--font-heading)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '10px 16px',
                  paddingTop: 16,
                  borderTop: '1px dashed var(--color-neutral-800)',
                }}
              >
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(d.subject)}`}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: 13, color: 'var(--color-text)' }}
                >
                  request preprint →
                </a>
                <span style={{ font: '400 12px/1.4 var(--font-heading)', color: 'var(--color-neutral-500)' }}>
                  {d.footer}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

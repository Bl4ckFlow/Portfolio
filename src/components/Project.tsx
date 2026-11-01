'use client'

import { PROJECTS } from '../data/portfolio'
import { LEAD_STYLE, SECTION_STYLE, SectionHeading } from './ui'

const STATUS_COLOR = {
  wip: 'var(--color-accent-2)',
  active: 'var(--color-accent)',
  shipped: 'var(--color-neutral-300)',
} as const

export default function Project() {
  return (
    <section id="projects" aria-labelledby="h-projects" style={SECTION_STYLE}>
      <SectionHeading hex="0x04" id="h-projects" name="projects" cmd="$ ls ~/projects" />
      <p style={LEAD_STYLE}>Things I build when nobody’s paying a bounty.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
          gap: 16,
          marginTop: 32,
        }}
      >
        {PROJECTS.map((p) => (
          <article
            key={p.path}
            className="hover-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              padding: 20,
              border: '1px solid var(--color-neutral-800)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--color-surface) 84%, transparent)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                font: '400 12px/1 var(--font-heading)',
                color: 'var(--color-neutral-500)',
              }}
            >
              <span>{p.path}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: STATUS_COLOR[p.status],
                }}
              >
                <i style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                {p.status}
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                font: '500 24px/1.15 var(--font-heading)',
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                margin: 0,
                font: '400 15px/1.6 var(--font-body)',
                color: 'var(--color-neutral-300)',
                textWrap: 'pretty',
              }}
            >
              {p.blurb}
            </p>

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                font: '400 13px/1.5 var(--font-heading)',
                color: 'var(--color-neutral-300)',
              }}
            >
              {p.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 8 }}>
                  <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
                    ›
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
              {p.tags.map((t) => (
                <span
                  key={t.t}
                  className={t.accent ? 'tag tag-accent' : 'tag tag-neutral'}
                  style={{ font: '400 11.5px/1.4 var(--font-heading)' }}
                >
                  {t.t}
                </span>
              ))}
            </div>

            {p.repo ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--color-neutral-800)',
                  font: '400 13px/1.3 var(--font-heading)',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
              >
                {p.repo.replace('https://', '')}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <p
                style={{
                  margin: 0,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--color-neutral-800)',
                  font: '400 12.5px/1.3 var(--font-heading)',
                  color: 'var(--color-neutral-500)',
                }}
              >
                source private — walkthrough on request
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

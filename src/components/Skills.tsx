'use client'

import { SKILLS } from '../data/portfolio'
import { avg, hx } from '../lib/format'
import { LEAD_STYLE, SECTION_STYLE, SectionHeading, useInView } from './ui'

const CX = 180
const CY = 150
const R = 100

function radar() {
  const n = SKILLS.length
  const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n
  const pt = (i: number, r: number): [number, number] => [CX + r * Math.cos(ang(i)), CY + r * Math.sin(ang(i))]
  const f = (p: [number, number]) => p[0].toFixed(1) + ',' + p[1].toFixed(1)
  const avgs = SKILLS.map(avg)

  return {
    rings: [0.25, 0.5, 0.75, 1].map((k) => SKILLS.map((_, i) => f(pt(i, R * k))).join(' ')),
    axes: SKILLS.map((_, i) => pt(i, R)),
    poly: avgs.map((v, i) => f(pt(i, R * v))).join(' '),
    dots: avgs.map((v, i) => pt(i, R * v)),
    labels: SKILLS.map((g, i) => {
      const p = pt(i, R + 16)
      const c = Math.cos(ang(i))
      const s = Math.sin(ang(i))
      return {
        x: p[0].toFixed(1),
        y: (p[1] + (s < -0.5 ? -16 : s > 0.5 ? 10 : -4)).toFixed(1),
        anchor: c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle',
        hex: g.hex,
        name: g.short,
      }
    }),
    aria:
      'Capability radar: ' +
      SKILLS.map((g, i) => g.name + ' ' + Math.round(avgs[i] * 100) + ' of 100').join(', '),
  }
}

export default function Skills() {
  const [ref, on] = useInView<HTMLDivElement>(0.15)
  const r = radar()
  const scale = on ? 1 : 0.001

  return (
    <section id="skills" aria-labelledby="h-skills" style={SECTION_STYLE}>
      <SectionHeading hex="0x05" id="h-skills" name="skills" cmd="$ cat /proc/capabilities" />
      <p style={LEAD_STYLE}>
        Self-assessed and honest-ish. Each level is one byte —{' '}
        <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-neutral-200)' }}>0x00</span> never
        touched it,{' '}
        <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-neutral-200)' }}>0xFF</span> wrote
        the book.
      </p>

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 16,
          marginTop: 32,
        }}
      >
        <figure
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 18,
            border: '1px solid var(--color-neutral-800)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--color-surface) 84%, transparent)',
          }}
        >
          <figcaption
            style={{
              margin: 0,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              font: '500 11px/1 var(--font-heading)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral-400)',
            }}
          >
            <span>capability radar</span>
            <span style={{ color: 'var(--color-neutral-500)' }}>0x00 — 0xFF</span>
          </figcaption>
          <svg
            viewBox="0 0 360 290"
            role="img"
            aria-label={r.aria}
            style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
          >
            {r.rings.map((p, i) => (
              <polygon key={i} points={p} style={{ fill: 'none', stroke: 'var(--color-neutral-800)', strokeWidth: 1 }} />
            ))}
            {r.axes.map(([x, y], i) => (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={x.toFixed(1)}
                y2={y.toFixed(1)}
                style={{ stroke: 'var(--color-neutral-800)', strokeWidth: 1 }}
              />
            ))}
            <polygon
              points={r.poly}
              style={{
                fill: 'color-mix(in srgb, var(--color-accent) 14%, transparent)',
                stroke: 'var(--color-accent)',
                strokeWidth: 1.5,
                strokeLinejoin: 'round',
                filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 55%, transparent))',
                transformOrigin: '180px 150px',
                transform: `scale(${scale})`,
                transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)',
              }}
            />
            {r.dots.map(([x, y], i) => (
              <circle
                key={i}
                cx={x.toFixed(1)}
                cy={y.toFixed(1)}
                r={2.6}
                style={{
                  fill: 'var(--color-accent)',
                  transformOrigin: '180px 150px',
                  transform: `scale(${scale})`,
                  transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)',
                }}
              />
            ))}
            {r.labels.map((l) => (
              <text
                key={l.name}
                x={l.x}
                y={l.y}
                style={{
                  font: '500 10.5px var(--font-heading)',
                  letterSpacing: '.08em',
                  fill: 'var(--color-neutral-300)',
                  textAnchor: l.anchor as 'start' | 'end' | 'middle',
                }}
              >
                <tspan style={{ fill: 'var(--color-accent-2)' }}>{l.hex}</tspan>
                <tspan x={l.x} dy="13">
                  {l.name}
                </tspan>
              </text>
            ))}
          </svg>
        </figure>

        {SKILLS.map((g, gi) => (
          <div
            key={g.hex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              padding: 18,
              border: '1px solid var(--color-neutral-800)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--color-surface) 84%, transparent)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ font: '500 12px/1 var(--font-heading)', color: 'var(--color-accent-2)' }}>{g.hex}</span>
              <h3
                style={{
                  flex: 1,
                  margin: 0,
                  font: '500 13px/1.35 var(--font-heading)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                }}
              >
                {g.name}
              </h3>
              <span
                style={{
                  font: '400 11.5px/1 var(--font-heading)',
                  whiteSpace: 'nowrap',
                  color: 'var(--color-neutral-500)',
                }}
              >
                avg {hx(avg(g))}
              </span>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {g.items.map(([name, level], ii) => (
                <li
                  key={name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) auto',
                    alignItems: 'baseline',
                    gap: '6px 12px',
                  }}
                >
                  <span style={{ font: '400 14.5px/1.35 var(--font-body)', color: 'var(--color-neutral-200)' }}>
                    {name}
                    <span
                      style={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        overflow: 'hidden',
                        clipPath: 'inset(50%)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      , level {Math.round(level * 100)} of 100
                    </span>
                  </span>
                  <span aria-hidden="true" style={{ font: '400 12px/1 var(--font-heading)', color: 'var(--color-neutral-400)' }}>
                    {hx(level)}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      gridColumn: '1 / -1',
                      position: 'relative',
                      height: 7,
                      background:
                        'repeating-linear-gradient(90deg, var(--color-neutral-800) 0 calc(10% - 2px), transparent calc(10% - 2px) 10%)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'repeating-linear-gradient(90deg, var(--color-accent) 0 calc(10% - 2px), transparent calc(10% - 2px) 10%)',
                        clipPath: `inset(0 ${on ? 100 - Math.round(level * 10) * 10 : 100}% 0 0)`,
                        transition: 'clip-path .9s cubic-bezier(.2,.7,.2,1)',
                        transitionDelay: gi * 70 + ii * 45 + 'ms',
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

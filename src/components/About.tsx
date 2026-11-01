'use client'

import { useEffect, useState } from 'react'
import { CONFIG, PROFILE, SYS_STATUS } from '../data/portfolio'
import { LeaderRow, PulseDot, SECTION_STYLE, SectionHeading } from './ui'

function useCountdown() {
  const [label, setLabel] = useState('uplink nominal')
  useEffect(() => {
    const { year, month, day } = CONFIG.availableFrom
    const days = Math.ceil((Date.UTC(year, month, day) - Date.now()) / 864e5)
    setLabel(days > 0 ? `t–${days}d to availability` : 'available now')
  }, [])
  return label
}

export default function About() {
  const tMinus = useCountdown()

  return (
    <section id="about" aria-labelledby="h-about" style={SECTION_STYLE}>
      <SectionHeading hex="0x01" id="h-about" name="about" cmd="$ whoami --verbose" />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: 'clamp(32px, 5vw, 72px)',
          marginTop: 'clamp(28px, 4vw, 44px)',
        }}
      >
        <div
          style={{
            flex: '1.3 1 480px',
            minWidth: 0,
            maxWidth: '64ch',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <p
            style={{
              margin: 0,
              font: '400 clamp(20px, 2vw, 25px)/1.45 var(--font-body)',
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
              textWrap: 'pretty',
            }}
          >
            {PROFILE.lede}
          </p>
          {PROFILE.about.map((p) => (
            <p
              key={p.slice(0, 24)}
              style={{
                margin: 0,
                font: '400 16.5px/1.7 var(--font-body)',
                color: 'var(--color-neutral-300)',
                textWrap: 'pretty',
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <div
          className="bracketed bracketed-sm"
          style={{
            flex: '1 1 360px',
            minWidth: 0,
            border: '1px solid var(--color-neutral-700)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--color-surface) 86%, transparent)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 16px',
              borderBottom: '1px solid var(--color-divider)',
              font: '500 11px/1 var(--font-heading)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral-400)',
            }}
          >
            <span>sys.status</span>
            <span
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                color: 'var(--color-accent)',
              }}
            >
              <PulseDot />
              all systems nominal
            </span>
          </div>

          <dl style={{ margin: 0, padding: '6px 16px 10px', font: '400 13px/1.4 var(--font-heading)' }}>
            {SYS_STATUS.map(([k, v, tone]) => (
              <LeaderRow key={k} term={k}>
                <span style={tone === 'accent' ? { color: 'var(--color-accent)' } : undefined}>{v}</span>
              </LeaderRow>
            ))}
          </dl>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '6px 12px',
              padding: '10px 16px',
              borderTop: '1px solid var(--color-divider)',
              font: '400 11px/1.3 var(--font-heading)',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral-500)',
            }}
          >
            <span>uplink paris-fr · cet</span>
            <span style={{ color: 'var(--color-accent-2)' }}>{tMinus}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

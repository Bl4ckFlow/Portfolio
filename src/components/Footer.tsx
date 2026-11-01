'use client'

import { useEffect, useState } from 'react'
import { CVS } from '../data/portfolio'
import { Kbd } from './ui'

const p2 = (x: number) => String(x).padStart(2, '0')

export default function Footer() {
  const [compile, setCompile] = useState('—')

  useEffect(() => {
    const lm = new Date(document.lastModified)
    const d = isNaN(lm.getTime()) ? new Date() : lm
    setCompile(
      `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())} ${p2(d.getUTCHours())}:${p2(
        d.getUTCMinutes(),
      )} UTC`,
    )
  }, [])

  return (
    <footer
      style={{
        maxWidth: 1240,
        margin: 'clamp(88px, 11vw, 150px) auto 0',
        // bottom padding clears the fixed terminal FAB in the corner
        padding: '0 clamp(16px, 4vw, 40px) 92px',
        boxSizing: 'border-box',
      }}
    >
      <div aria-hidden="true" className="hr" />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '10px 24px',
          paddingTop: 20,
          font: '400 12px/1.5 var(--font-heading)',
          color: 'var(--color-neutral-500)',
        }}
      >
        <p style={{ margin: 0 }}>
          built by raf <span style={{ color: 'var(--color-neutral-600)' }}>{'//'}</span> no trackers{' '}
          <span style={{ color: 'var(--color-neutral-600)' }}>{'//'}</span> last compile:{' '}
          <span style={{ color: 'var(--color-neutral-300)' }}>{compile}</span>
        </p>
        <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 14px' }}>
          {CVS.map((cv) => (
            <a key={cv.lang} href={cv.file} download={cv.download} style={{ textDecoration: 'none' }}>
              cv --{cv.lang} ↓
            </a>
          ))}
          <span>
            <Kbd>1–7</Kbd> jump
          </span>
          <span>
            <Kbd>/</Kbd> terminal
          </span>
          <span>
            <Kbd>esc</Kbd> close
          </span>
        </p>
      </div>
    </footer>
  )
}

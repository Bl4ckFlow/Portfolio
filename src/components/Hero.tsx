'use client'

import { useEffect, useRef, useState } from 'react'
import { CVS, PROFILE } from '../data/portfolio'
import { useSite } from './site-context'
import TerminalPane from './TerminalPane'
import { Cursor, Kbd, PulseDot, useReducedMotion } from './ui'

const CMD = 'whoami'
const TITLE: [string, React.CSSProperties][] = [
  [
    'raf',
    {
      color: 'var(--color-accent)',
      textShadow: '0 0 28px color-mix(in srgb, var(--color-accent) 45%, transparent)',
    },
  ],
  [' // ', { color: 'var(--color-neutral-600)' }],
  ['offensive security researcher', {}],
]
const TITLE_LEN = TITLE.reduce((n, [t]) => n + t.length, 0)

/** Reveals `total` characters one at a time, with a human-ish jitter. */
function useTyper(total: number, speed: number, start: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start || n >= total) return
    const t = setTimeout(() => setN((x) => x + 1), speed * (0.55 + Math.random() * 0.9))
    return () => clearTimeout(t)
  }, [n, speed, start, total])
  return start ? n : 0
}

function useDelay(ms: number, start: boolean) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!start) return
    const t = setTimeout(() => setDone(true), ms)
    return () => clearTimeout(t)
  }, [ms, start])
  return done
}

export default function Hero() {
  const { booting, heroInputRef, setHeroVisible, goTo, run } = useSite()
  const reduced = useReducedMotion()
  const frameRef = useRef<HTMLDivElement | null>(null)

  const armed = useDelay(220, !booting) && !reduced
  const cmdN = useTyper(CMD.length, 80, armed)
  const cmdDone = reduced || cmdN >= CMD.length
  const titleArmed = useDelay(340, cmdDone && armed)
  const titleN = useTyper(TITLE_LEN, 34, titleArmed)

  const stage = reduced ? 2 : !cmdDone ? 0 : titleN >= TITLE_LEN ? 2 : 1
  const shownCmd = reduced ? CMD : CMD.slice(0, cmdN)
  const shownTitle = reduced ? TITLE_LEN : titleN

  useEffect(() => {
    const el = frameRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
      threshold: 0.15,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [setHeroVisible])

  let budget = shownTitle

  return (
    <section
      id="top"
      aria-label="Introduction"
      style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: 'clamp(40px, 8vh, 96px) clamp(16px, 4vw, 40px) clamp(48px, 8vh, 88px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'clamp(36px, 5vw, 72px)',
        minHeight: 'calc(100svh - 58px)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px 16px',
            font: '500 11.5px/1.4 var(--font-heading)',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-400)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-accent)' }}>
            <PulseDot />
            {PROFILE.available}
          </span>
          <span>{PROFILE.location}</span>
          {PROFILE.ranks.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>

        <div>
          <div
            style={{
              marginBottom: 12,
              font: '400 clamp(14px, 1.5vw, 17px)/1.5 var(--font-heading)',
              color: 'var(--color-neutral-400)',
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>visitor@raf</span>:
            <span style={{ color: 'var(--color-accent-2)' }}>~</span>${' '}
            <span style={{ color: 'var(--color-text)' }}>{shownCmd}</span>
            {stage === 0 && !booting ? <Cursor /> : null}
          </div>
          <h1
            style={{
              margin: 0,
              font: '500 clamp(32px, 4.3vw, 56px)/1.08 var(--font-heading)',
              letterSpacing: '-0.035em',
              color: 'var(--color-text)',
              textWrap: 'balance',
            }}
          >
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
              raf, offensive security researcher
            </span>
            <span aria-hidden="true">
              {TITLE.map(([text, style], i) => {
                const take = Math.max(0, Math.min(text.length, budget))
                budget -= text.length
                return take > 0 ? (
                  <span key={i} style={style}>
                    {text.slice(0, take)}
                  </span>
                ) : null
              })}
            </span>
            {stage >= 1 ? <Cursor /> : null}
          </h1>
        </div>

        <p
          style={{
            margin: 0,
            maxWidth: '54ch',
            font: '400 clamp(16px, 1.45vw, 18.5px)/1.65 var(--font-body)',
            color: 'var(--color-neutral-300)',
            textWrap: 'pretty',
          }}
        >
          Raouf “Raf” Laarbi —{' '}
          <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Om4ga_</span>{' '}
          on the leaderboards. Final-year cybersecurity engineering student at ESILV Paris, bug bounty
          hunter, and researcher in intrusion detection for industrial control systems.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <a
            href="#findings"
            onClick={(e) => {
              e.preventDefault()
              goTo('findings', true)
            }}
            className="btn btn-primary"
            style={{
              padding: '10px 16px',
              fontSize: 14,
              color: 'var(--color-accent)',
              boxShadow: '0 0 26px -8px color-mix(in srgb, var(--color-accent) 60%, transparent)',
            }}
          >
            ./findings <span aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              goTo('contact', true)
            }}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: 14, color: 'var(--color-text)' }}
          >
            ./contact
          </a>
          <a
            href={'https://github.com/' + PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ padding: '10px 8px', fontSize: 14, color: 'var(--color-neutral-300)' }}
          >
            github/{PROFILE.github} ↗
          </a>
        </div>

        {/* curriculum vitae — english + french */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
            paddingTop: 4,
          }}
        >
          <span
            style={{
              font: '400 12.5px/1.4 var(--font-heading)',
              color: 'var(--color-neutral-500)',
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>$</span> ./cv --download
          </span>
          {CVS.map((cv, i) => (
            <a
              key={cv.lang}
              href={cv.file}
              download={cv.download}
              className={i === 0 ? 'btn btn-primary' : 'btn btn-secondary'}
              aria-label={`Download CV in ${cv.label} (PDF, ${cv.size})`}
              style={{
                padding: '8px 12px',
                fontSize: 13,
                color: i === 0 ? 'var(--color-accent)' : 'var(--color-text)',
              }}
            >
              cv --{cv.lang}
              <span aria-hidden="true" style={{ color: 'var(--color-neutral-500)' }}>
                pdf
              </span>
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>

        <p style={{ margin: 0, font: '400 12px/1.5 var(--font-heading)', color: 'var(--color-neutral-500)' }}>
          press <Kbd>1</Kbd>–<Kbd>7</Kbd> to jump · <Kbd>/</Kbd> opens the terminal
        </p>
      </div>

      <div
        ref={frameRef}
        role="region"
        aria-label="Interactive terminal"
        className="bracketed"
        style={{
          flex: '1 1 400px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: 'clamp(360px, 54vh, 460px)',
          border: '1px solid var(--color-neutral-700)',
          borderRadius: 'var(--radius-lg)',
          background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
          boxShadow:
            '0 0 0 1px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 0 60px -22px color-mix(in srgb, var(--color-accent) 38%, transparent), 0 30px 80px -24px rgba(0,0,0,.7)',
        }}
      >
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
          <span style={{ color: 'var(--color-accent)' }}>›_</span>
          <span>raf-sh — tty1</span>
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
            live
          </span>
        </div>

        <TerminalPane id="term-hero" inputRef={heroInputRef} placeholder="type help, then enter" />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 6,
            padding: '0 14px 12px',
            font: '400 11px/1 var(--font-heading)',
            color: 'var(--color-neutral-500)',
          }}
        >
          <span style={{ marginRight: 2 }}>try</span>
          {['help', 'findings', 'cv', 'contact'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="btn btn-secondary"
              style={{ padding: '4px 8px', fontSize: 12, color: 'var(--color-neutral-200)' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

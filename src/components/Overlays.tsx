'use client'

import { BOOT, CONFIG } from '../data/portfolio'
import { useSite } from './site-context'
import TerminalPane from './TerminalPane'
import { Cursor } from './ui'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function Crt() {
  if (!CONFIG.crtEffects) return null
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 89,
          pointerEvents: 'none',
          background: 'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,.45) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,.16) 2px, rgba(0,0,0,.16) 3px)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          pointerEvents: 'none',
          opacity: 0.05,
          backgroundImage: GRAIN,
        }}
      />
    </>
  )
}

function BootScreen() {
  const { booting, bootN, bootFade, endBoot } = useSite()
  if (!booting) return null
  const shown = BOOT.slice(0, bootN)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Boot sequence. Press any key to skip."
      onClick={endBoot}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(20px, 5vw, 56px)',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        opacity: bootFade ? 0 : 1,
        transition: 'opacity .3s ease',
        cursor: 'pointer',
        font: '400 clamp(11px, 1.3vw, 13.5px)/1.7 var(--font-heading)',
        color: 'var(--color-neutral-300)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 'clamp(18px, 3vw, 32px)',
          left: 'clamp(20px, 5vw, 56px)',
          font: '500 11px/1 var(--font-heading)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: 'var(--color-neutral-500)',
        }}
      >
        raf-bios v1.0 · secure boot <span style={{ color: 'var(--color-accent)' }}>on</span>
      </div>
      <button
        type="button"
        onClick={endBoot}
        className="btn btn-secondary"
        style={{
          position: 'absolute',
          top: 'clamp(12px, 3vw, 26px)',
          right: 'clamp(12px, 3vw, 26px)',
          padding: '6px 10px',
          fontSize: 12,
          color: 'var(--color-neutral-200)',
        }}
      >
        skip intro<span style={{ marginLeft: 6, color: 'var(--color-neutral-500)' }}>[any key]</span>
      </button>

      <div style={{ maxWidth: 920 }}>
        {shown.map(([pre, t], i) =>
          pre === 'grant' ? (
            <div
              key={i}
              style={{
                marginTop: 16,
                font: '500 clamp(18px, 2.6vw, 30px)/1.3 var(--font-heading)',
                letterSpacing: '-0.01em',
                color: 'var(--color-accent)',
                textShadow: '0 0 24px color-mix(in srgb, var(--color-accent) 55%, transparent)',
              }}
            >
              {t}
              <Cursor />
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', gap: '1ch', whiteSpace: 'pre-wrap' }}>
              <span
                style={{
                  flex: 'none',
                  color:
                    pre === '[  OK  ]'
                      ? 'var(--color-accent)'
                      : pre === '[ AUTH ]'
                        ? 'var(--color-accent-2)'
                        : 'var(--color-neutral-500)',
                }}
              >
                {pre}
              </span>
              <span style={{ color: pre.startsWith('[ ') ? 'var(--color-text)' : 'var(--color-neutral-300)' }}>
                {t}
              </span>
            </div>
          ),
        )}
      </div>

      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--color-neutral-800)' }}
      >
        <div
          style={{
            height: '100%',
            width: Math.round((bootN / BOOT.length) * 100) + '%',
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
            transition: 'width .12s linear',
          }}
        />
      </div>
    </div>
  )
}

function Dock() {
  const { dockOpen, closeDock, clear, dockInputRef } = useSite()
  if (!dockOpen) return null
  return (
    <div
      role="dialog"
      aria-label="Terminal"
      style={{
        position: 'fixed',
        right: 'clamp(8px, 2vw, 24px)',
        bottom: 'clamp(8px, 2vw, 24px)',
        zIndex: 80,
        width: 'min(520px, calc(100vw - 16px))',
        height: 'min(400px, 64vh)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid color-mix(in srgb, var(--color-accent) 38%, transparent)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--color-bg) 95%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow:
          '0 0 0 1px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 0 60px -18px color-mix(in srgb, var(--color-accent) 50%, transparent), 0 30px 80px rgba(0,0,0,.75)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 6px 5px 14px',
          borderBottom: '1px solid var(--color-divider)',
          font: '500 11px/1 var(--font-heading)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--color-neutral-400)',
        }}
      >
        <span style={{ color: 'var(--color-accent)' }}>›_</span>
        <span>raf-sh — docked</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          <button
            type="button"
            onClick={clear}
            className="btn btn-ghost"
            style={{
              padding: '6px 8px',
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral-300)',
            }}
          >
            clear
          </button>
          <button
            type="button"
            onClick={closeDock}
            aria-label="Close terminal"
            className="btn btn-ghost"
            style={{ padding: '4px 10px', fontSize: 15, color: 'var(--color-neutral-300)' }}
          >
            ×
          </button>
        </span>
      </div>
      <TerminalPane
        id="term-dock"
        inputRef={dockInputRef}
        placeholder="help · cv en · cd /findings · esc to close"
      />
    </div>
  )
}

function Fab() {
  const { booting, dockOpen, heroVisible, openTerminal } = useSite()
  if (booting || dockOpen || heroVisible) return null
  return (
    <button
      type="button"
      onClick={openTerminal}
      aria-label="Open terminal, shortcut slash"
      className="btn btn-primary fab"
      style={{
        position: 'fixed',
        right: 'clamp(12px, 2vw, 24px)',
        bottom: 'clamp(12px, 2vw, 24px)',
        zIndex: 79,
        padding: '10px 14px',
        fontSize: 13,
        color: 'var(--color-accent)',
        background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 0 30px -10px color-mix(in srgb, var(--color-accent) 65%, transparent)',
      }}
    >
      ›_ terminal
      <kbd
        style={{
          marginLeft: 8,
          padding: '0 5px',
          border: '1px solid var(--color-accent-800)',
          borderRadius: 'var(--radius-sm)',
          font: '500 11px/16px var(--font-heading)',
          color: 'var(--color-accent-300)',
        }}
      >
        /
      </kbd>
    </button>
  )
}

function Toast() {
  const { toast } = useSite()
  const c = toast?.kind === 'warn' ? 'var(--color-accent-2)' : 'var(--color-accent)'
  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        left: '50%',
        top: 72,
        zIndex: 95,
        transform: 'translateX(-50%)',
        width: 'max-content',
        maxWidth: 'calc(100vw - 24px)',
        pointerEvents: 'none',
      }}
    >
      {toast ? (
        <div
          style={{
            padding: '9px 14px',
            border: '1px solid ' + c,
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--color-bg) 94%, transparent)',
            boxShadow: '0 0 30px -10px ' + c + ', 0 12px 30px rgba(0,0,0,.6)',
            font: '500 12.5px/1.3 var(--font-heading)',
            color: c,
          }}
        >
          {toast.msg}
        </div>
      ) : null}
    </div>
  )
}

function Alarm() {
  const { alarm } = useSite()
  if (!alarm) return null
  const c = alarm.kind === 'warn' ? 'var(--color-accent-2)' : 'var(--color-accent)'
  return (
    <div
      key={alarm.key}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 96,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `inset 0 0 0 2px ${c}, inset 0 0 140px -30px ${c}`,
        animation: 'raf-alarm 1.25s ease-out forwards',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          border: '1px solid ' + c,
          background: 'var(--color-bg)',
          color: c,
          font: '600 13px/1 var(--font-heading)',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          boxShadow: '0 0 40px -8px ' + c,
        }}
      >
        !! {alarm.label}
      </div>
    </div>
  )
}

export default function Overlays() {
  return (
    <>
      <Crt />
      <Toast />
      <Alarm />
      <Fab />
      <Dock />
      <BootScreen />
    </>
  )
}

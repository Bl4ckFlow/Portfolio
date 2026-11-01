'use client'

import { SECTIONS } from '../data/portfolio'
import { useSite } from './site-context'

export default function Navbar() {
  const { active, goTo, openTerminal } = useSite()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: 'color-mix(in srgb, var(--color-bg) 84%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <nav
        className="nav"
        aria-label="Sections"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '10px clamp(16px, 4vw, 40px)',
          flexWrap: 'wrap',
          gap: '6px 20px',
          fontFamily: 'var(--font-heading)',
          boxSizing: 'border-box',
        }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            goTo('top', true)
          }}
          className="nav-brand"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            fontSize: 15,
            letterSpacing: '-0.01em',
            color: 'var(--color-text)',
          }}
        >
          <span style={{ color: 'var(--color-accent)' }}>~/</span>raf
          <span style={{ color: 'var(--color-neutral-500)' }}>@om4ga_</span>
        </a>

        <div
          className="no-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={'#' + id}
              onClick={(e) => {
                e.preventDefault()
                goTo(id, true)
              }}
              aria-current={active === id ? 'page' : undefined}
              className="nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: 6,
                padding: '7px 9px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                whiteSpace: 'nowrap',
                boxShadow: active === id ? 'inset 0 -1px 0 var(--color-accent)' : 'none',
              }}
            >
              /{id}
            </a>
          ))}
          <button
            type="button"
            onClick={openTerminal}
            className="btn btn-primary"
            style={{
              marginLeft: 8,
              padding: '5px 10px',
              fontSize: 12,
              whiteSpace: 'nowrap',
              color: 'var(--color-accent)',
            }}
          >
            ›_ terminal
            <kbd
              style={{
                marginLeft: 6,
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
        </div>
      </nav>
      <div
        aria-hidden="true"
        className="hr"
        style={{ marginTop: 0 }}
      />
    </header>
  )
}

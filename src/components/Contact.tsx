'use client'

import { useState } from 'react'
import { CONTACT, CVS } from '../data/portfolio'
import { useSite } from './site-context'
import { PulseDot, SECTION_STYLE, SectionHeading } from './ui'

const ROW: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '10ch minmax(0,1fr) auto',
  alignItems: 'center',
  gap: '6px 12px',
  padding: '8px 0',
  borderBottom: '1px dashed var(--color-neutral-800)',
}
const DT: React.CSSProperties = { color: 'var(--color-neutral-500)' }
const DD: React.CSSProperties = { margin: 0, overflowWrap: 'anywhere', color: 'var(--color-text)' }
const GHOST: React.CSSProperties = { padding: '4px 6px', fontSize: 12, color: 'var(--color-accent)' }

export default function Contact() {
  const { copy } = useSite()
  const [showKey, setShowKey] = useState(false)

  return (
    <section id="contact" aria-labelledby="h-contact" style={SECTION_STYLE}>
      <SectionHeading hex="0x07" id="h-contact" name="contact" cmd="$ cat ~/.contact" />

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
            flex: '1 1 340px',
            minWidth: 0,
            maxWidth: '52ch',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <p
            style={{
              margin: 0,
              font: '500 clamp(28px, 3.4vw, 42px)/1.12 var(--font-heading)',
              letterSpacing: '-0.035em',
              color: 'var(--color-text)',
              textWrap: 'balance',
            }}
          >
            Open a channel<span style={{ color: 'var(--color-accent)' }}>_</span>
          </p>
          <p
            style={{
              margin: 0,
              font: '400 16.5px/1.7 var(--font-body)',
              color: 'var(--color-neutral-300)',
              textWrap: 'pretty',
            }}
          >
            {CONTACT.blurb} The CV is below in both English and French — grab whichever one your pipeline
            wants.
          </p>
          <p
            style={{
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              font: '400 13px/1.4 var(--font-heading)',
              color: 'var(--color-neutral-400)',
            }}
          >
            <PulseDot />
            {CONTACT.availability}
          </p>
        </div>

        <div
          className="bracketed"
          style={{
            flex: '1.4 1 460px',
            minWidth: 0,
            border: '1px solid var(--color-neutral-700)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
            boxShadow: '0 0 60px -26px color-mix(in srgb, var(--color-accent) 40%, transparent)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              borderBottom: '1px solid var(--color-divider)',
              font: '500 11px/1 var(--font-heading)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral-400)',
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>›_</span>
            <span>~/contact — secure channel</span>
            <span style={{ marginLeft: 'auto', color: 'var(--color-neutral-500)' }}>tls 1.3 · e2e</span>
          </div>

          <div style={{ padding: 16, font: '400 13px/1.5 var(--font-heading)', color: 'var(--color-neutral-300)' }}>
            <p style={{ margin: '0 0 6px', color: 'var(--color-neutral-500)' }}>
              <span style={{ color: 'var(--color-accent)' }}>$</span> cat ~/.contact
            </p>
            <dl style={{ margin: '0 0 20px' }}>
              <div style={ROW}>
                <dt style={DT}>email</dt>
                <dd style={DD}>{CONTACT.email}</dd>
                <dd style={{ margin: 0, display: 'flex', gap: 2 }}>
                  <button
                    type="button"
                    onClick={() => copy(CONTACT.email, 'email')}
                    className="btn btn-ghost"
                    style={GHOST}
                  >
                    copy
                  </button>
                  <a href={'mailto:' + CONTACT.email} className="btn btn-ghost" style={GHOST}>
                    mail ↗
                  </a>
                </dd>
              </div>

              {CONTACT.links.map((l) => (
                <div key={l.key} style={ROW}>
                  <dt style={DT}>{l.key}</dt>
                  <dd style={DD}>{l.label}</dd>
                  <dd style={{ margin: 0 }}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={GHOST}
                    >
                      open ↗
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            {/* curriculum vitae — english + french */}
            <p style={{ margin: '0 0 6px', color: 'var(--color-neutral-500)' }}>
              <span style={{ color: 'var(--color-accent)' }}>$</span> ls ~/cv
            </p>
            <dl style={{ margin: '0 0 14px' }}>
              {CVS.map((cv) => (
                <div key={cv.lang} style={ROW}>
                  <dt style={DT}>{cv.label}</dt>
                  <dd style={DD}>
                    {cv.download}
                    <span style={{ marginLeft: 8, color: 'var(--color-neutral-500)' }}>{cv.size}</span>
                  </dd>
                  <dd style={{ margin: 0, display: 'flex', gap: 2 }}>
                    <a
                      href={cv.file}
                      download={cv.download}
                      className="btn btn-ghost"
                      style={GHOST}
                      aria-label={`Download CV in ${cv.label} (PDF, ${cv.size})`}
                    >
                      download ↓
                    </a>
                    <a
                      href={cv.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={GHOST}
                      aria-label={`Open CV in ${cv.label} in a new tab`}
                    >
                      view ↗
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CVS.map((cv, i) => (
                <a
                  key={cv.lang}
                  href={cv.file}
                  download={cv.download}
                  className={i === 0 ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{
                    padding: '7px 11px',
                    fontSize: 12.5,
                    color: i === 0 ? 'var(--color-accent)' : 'var(--color-neutral-200)',
                  }}
                  aria-label={`Download CV in ${cv.label} (PDF, ${cv.size})`}
                >
                  cv --{cv.lang} ↓
                </a>
              ))}
            </div>

            {CONTACT.pgp ? (
              <>
                <p style={{ margin: '20px 0 8px', color: 'var(--color-neutral-500)' }}>
                  <span style={{ color: 'var(--color-accent)' }}>$</span> gpg --fingerprint raf
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '5ch minmax(0,1fr)',
                    gap: '2px 12px',
                    fontSize: 12.5,
                    lineHeight: 1.7,
                  }}
                >
                  <span style={{ color: 'var(--color-neutral-500)' }}>pub</span>
                  <span>
                    {CONTACT.pgp.algo} {CONTACT.pgp.created} [SC]
                  </span>
                  <span />
                  <span style={{ overflowWrap: 'anywhere', letterSpacing: '.03em', color: 'var(--color-accent-2)' }}>
                    {CONTACT.pgp.fingerprint}
                  </span>
                  <span style={{ color: 'var(--color-neutral-500)' }}>uid</span>
                  <span style={{ overflowWrap: 'anywhere' }}>{CONTACT.pgp.uid}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={() => copy(CONTACT.pgp!.fingerprint, 'fingerprint')}
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px', fontSize: 12, color: 'var(--color-neutral-200)' }}
                  >
                    copy fingerprint
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    aria-expanded={showKey}
                    aria-controls="pgp-block"
                    className="btn btn-secondary"
                    style={{ padding: '6px 10px', fontSize: 12, color: 'var(--color-neutral-200)' }}
                  >
                    <span aria-hidden="true" style={{ color: 'var(--color-neutral-500)' }}>
                      {showKey ? '[−]' : '[+]'}
                    </span>
                    public key
                  </button>
                  <a href={CONTACT.pgp.asc} download className="btn btn-ghost" style={{ padding: '6px 8px', fontSize: 12, color: 'var(--color-accent)' }}>
                    raf.asc ↓
                  </a>
                </div>
                {showKey ? (
                  <div
                    id="pgp-block"
                    style={{
                      marginTop: 12,
                      padding: '12px 14px',
                      overflowX: 'auto',
                      border: '1px solid var(--color-neutral-800)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-neutral-900)',
                      font: '400 11.5px/1.65 var(--font-heading)',
                      color: 'var(--color-neutral-400)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div>-----BEGIN PGP PUBLIC KEY BLOCK-----</div>
                    <div>&#160;</div>
                    <div>{CONTACT.pgp.fingerprint}</div>
                    <div>-----END PGP PUBLIC KEY BLOCK-----</div>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

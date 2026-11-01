'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { LINE_COLOR, useSite } from './site-context'

/** The log + prompt row. Rendered twice: inside the hero frame and in the dock. */
export default function TerminalPane({
  id,
  inputRef,
  placeholder,
  live = 'polite',
}: {
  id: string
  inputRef: RefObject<HTMLInputElement | null>
  placeholder: string
  live?: 'polite' | 'off'
}) {
  const { lines, prompt, onTermKey, goTo } = useSite()
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [lines])

  const focus = () => {
    if (!String(window.getSelection?.() ?? '')) inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <div
        ref={logRef}
        role="log"
        aria-live={live}
        aria-label="Terminal output"
        onClick={focus}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          padding: '12px 14px 6px',
          font: '400 13px/1.62 var(--font-heading)',
          color: 'var(--color-neutral-300)',
        }}
      >
        {lines.map((l) =>
          l.k === 'cmd' ? (
            <div
              key={l.id}
              style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: 'var(--color-text)' }}
            >
              <span
                style={{
                  marginRight: '1ch',
                  color: l.root ? 'var(--color-accent-2)' : 'var(--color-accent)',
                }}
              >
                {l.prompt}
              </span>
              {l.t}
            </div>
          ) : l.k === 'link' ? (
            <button
              key={l.id}
              type="button"
              className="term-link"
              onClick={() => l.target && goTo(l.target)}
              style={{
                display: 'block',
                margin: '2px 0',
                padding: 0,
                border: 0,
                background: 'none',
                font: 'inherit',
                color: 'var(--color-accent)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'color-mix(in srgb, var(--color-accent) 40%, transparent)',
                cursor: 'pointer',
              }}
            >
              {l.t}
            </button>
          ) : (
            <div
              key={l.id}
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                color: LINE_COLOR[l.k] ?? LINE_COLOR.out,
              }}
            >
              {l.t}
            </div>
          ),
        )}
      </div>

      <div
        className="term-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          borderTop: '1px solid var(--color-divider)',
          font: '400 13px/1.4 var(--font-heading)',
        }}
      >
        <label htmlFor={id} style={{ marginRight: '1ch', whiteSpace: 'nowrap', color: 'var(--color-accent)' }}>
          {prompt}
        </label>
        <input
          id={id}
          ref={inputRef}
          onKeyDown={onTermKey}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          placeholder={placeholder}
          aria-label="Terminal command"
          style={{
            flex: 1,
            minWidth: 0,
            padding: 0,
            border: 0,
            outline: 'none',
            background: 'transparent',
            font: 'inherit',
            color: 'var(--color-text)',
            caretColor: 'var(--color-accent)',
          }}
        />
      </div>
    </>
  )
}

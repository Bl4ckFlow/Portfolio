# raf // offensive security researcher

Portfolio for Abderraouf “Raf” LAARBI (`Om4ga_`) — a terminal-styled single page built with
Next.js 15 (App Router), React 19 and plain CSS custom properties.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

**All copy and data lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Edit that file,
not the components. It holds the profile and contact details, the findings, research dossiers,
projects, skill levels, timeline, boot log, and the CV list.

At the top of the same file, `CONFIG` controls the look and behaviour:

| key | values | what it does |
| --- | --- | --- |
| `accent` | `'acid green'` · `'cyan'` | accent ramp for the whole page |
| `crtEffects` | `true` · `false` | scanlines, vignette and film grain |
| `bootSequence` | `'always'` · `'once per session'` · `'off'` | the BIOS-style intro |
| `availableFrom` | `{ year, month, day }` | target of the availability countdown |

### Things to replace before deploying

- **`FINDINGS`** ships with four *placeholder* disclosures that came with the design. Swap in
  your own reports, or set the array to `[]` to hide the whole `/findings` section.
- **`SKILLS`** levels are self-assessed numbers from 0 to 1, rendered as a byte (`0x00`–`0xFF`).
- **`CONTACT.links`** has a commented-out LinkedIn row — uncomment it and add your handle.
- **`CONTACT.pgp`** is `null`, which hides the PGP block. Fill it in to show a fingerprint,
  a public key and an `.asc` download.

### The CVs

Both PDFs live in `public/cv/` and are listed in `CVS`. They are offered in four places:
the hero (`cv --en` / `cv --fr`), the `/contact` panel, the footer, and the shell command
`cv`, `cv en` or `cv fr`. To update one, drop a new PDF at the same path — or change the
path and filename in `CVS`.

## Layout

```
src/
  app/            layout, globals.css (design tokens + .btn/.tag/.seg classes), icon.svg
  data/           portfolio.ts — every piece of content
  lib/format.ts   severity styles, hex levels, redaction-bar parsing
  components/
    site-context.tsx   terminal shell, keyboard nav, toasts, scroll spy
    TerminalPane.tsx   the log + prompt, used by the hero and the docked terminal
    ui.tsx             shared atoms: section headings, decrypt text, pulse dot, hooks
    Navbar · Hero · About · Findings · Research · Project · Skills · Timeline · Contact · Footer
    Overlays.tsx       CRT layer, boot screen, docked terminal, toast, alarm, FAB
```

## Keyboard

`1`–`7` jump to a section · `0` back to top · `/` or `` ` `` opens the terminal · `esc` closes it.
In the terminal: `tab` completes, `↑`/`↓` walks history, `ctrl+l` clears. `help` lists commands.
There is a Konami code.

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  BOOT,
  CONFIG,
  CONTACT,
  CVS,
  SECTIONS,
  SKILLS,
  TIMELINE,
  type SectionId,
} from '../data/portfolio'
import { CLASS_LABEL, FINDINGS, LEDGER_STATS, STATUS_META, group } from '../data/findings'
import { SEV, avg, hx } from '../lib/format'

const KONAMI = 'arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a'
const COMMANDS = [
  'help', 'about', 'findings', 'research', 'projects', 'skills', 'timeline', 'contact',
  'cv', 'ls', 'cd', 'cat', 'whoami', 'date', 'echo', 'history', 'clear', 'exit',
]

export type LineKind = 'cmd' | 'out' | 'dim' | 'ok' | 'warn' | 'err' | 'head' | 'link'

export type Line = {
  id: number
  k: LineKind
  t: string
  prompt?: string
  root?: boolean
  target?: SectionId
}

type NewLine = Omit<Line, 'id'>

export const LINE_COLOR: Record<string, string> = {
  out: 'var(--color-neutral-300)',
  dim: 'var(--color-neutral-500)',
  ok: 'var(--color-accent)',
  warn: 'var(--color-accent-2)',
  err: 'var(--color-accent-2-300)',
  head: 'var(--color-text)',
}

type Alarm = { kind: 'ok' | 'warn'; label: string; key: number }

type SiteValue = {
  lines: Line[]
  prompt: string
  root: boolean
  run: (raw: string) => void
  clear: () => void
  dockOpen: boolean
  closeDock: () => void
  openTerminal: () => void
  heroVisible: boolean
  setHeroVisible: (v: boolean) => void
  heroInputRef: RefObject<HTMLInputElement | null>
  dockInputRef: RefObject<HTMLInputElement | null>
  onTermKey: (e: React.KeyboardEvent<HTMLInputElement>) => void
  active: string
  goTo: (id: string, focus?: boolean) => void
  toast: { msg: string; kind: 'ok' | 'warn' } | null
  alarm: Alarm | null
  copy: (text: string, label: string) => void
  booting: boolean
  bootN: number
  bootFade: boolean
  endBoot: () => void
  reduced: boolean
}

const SiteContext = createContext<SiteValue | null>(null)

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}

const kv = (k: string, v: string): NewLine => ({ k: 'out', t: '  ' + k.padEnd(11) + v })

function initialBooting() {
  if (CONFIG.bootSequence === 'off') return false
  return true
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([
    { id: 1, k: 'dim', t: 'raf-sh 1.0 — tty1' },
    { id: 2, k: 'out', t: 'type `help` to list commands. tab completes, ↑↓ walks history.' },
  ])
  const [dockOpen, setDockOpen] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [root, setRoot] = useState(false)
  const [toast, setToast] = useState<{ msg: string; kind: 'ok' | 'warn' } | null>(null)
  const [alarm, setAlarm] = useState<Alarm | null>(null)
  const [active, setActive] = useState('top')
  const [booting, setBooting] = useState(initialBooting)
  const [bootN, setBootN] = useState(0)
  const [bootFade, setBootFade] = useState(false)
  const [reduced, setReduced] = useState(false)

  const heroInputRef = useRef<HTMLInputElement | null>(null)
  const dockInputRef = useRef<HTMLInputElement | null>(null)
  const lid = useRef(10)
  const hist = useRef<string[]>([])
  const histIdx = useRef<number | null>(null)
  const kq = useRef<string[]>([])
  const toastT = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const alarmT = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const sudoT = useRef<ReturnType<typeof setTimeout>[]>([])
  const bootT = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const prompt = root ? 'root@raf:~#' : 'visitor@raf:~$'

  /* — scrolling — */

  const reducedRef = useRef(false)
  const goTo = useCallback((id: string, focus = false) => {
    const el = id === 'top' ? null : document.getElementById(id)
    const y = el ? el.getBoundingClientRect().top + window.scrollY - 56 : 0
    window.scrollTo({ top: Math.max(0, y), behavior: reducedRef.current ? 'auto' : 'smooth' })
    if (focus && el) {
      const h = el.querySelector('h2')
      if (h instanceof HTMLElement) {
        h.setAttribute('tabindex', '-1')
        h.focus({ preventScroll: true })
      }
    }
  }, [])

  /* — output — */

  const print = useCallback((arr: NewLine[]) => {
    setLines((prev) => [...prev, ...arr.map((l) => ({ ...l, id: ++lid.current }))].slice(-250))
  }, [])

  const showToast = useCallback((msg: string, kind: 'ok' | 'warn' = 'ok') => {
    clearTimeout(toastT.current)
    setToast({ msg, kind })
    toastT.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const flash = useCallback((kind: 'ok' | 'warn', label: string) => {
    clearTimeout(alarmT.current)
    setAlarm({ kind, label, key: Date.now() })
    alarmT.current = setTimeout(() => setAlarm(null), 1300)
  }, [])

  const copy = useCallback(
    (text: string, label: string) => {
      const done = () => showToast(label + ' copied to clipboard', 'ok')
      const fallback = () => {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        try {
          document.execCommand('copy')
        } catch {
          /* clipboard unavailable */
        }
        ta.remove()
        done()
      }
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, fallback)
      else fallback()
    },
    [showToast],
  )

  /* — the shell — */

  const section = useCallback((id: SectionId): NewLine[] => {
    const link: NewLine = { k: 'link', t: '→ cd /' + id, target: id }
    switch (id) {
      case 'about':
        return [
          { k: 'head', t: 'Raouf "Raf" Laarbi — offensive security researcher, Paris' },
          kv('edu', 'ESILV Paris — final year, Cloud Computing & Cybersecurity'),
          kv('bounty', 'YesWeHack #1097 · SignalFisher #63'),
          kv('research', 'ICS/OT intrusion detection — Univ. of Tartu'),
          kv('available', 'September 2027 — CIFRE PhD / research roles'),
          link,
        ]
      case 'findings': {
        const top = FINDINGS.filter((f) => group(f) === 'validated' || group(f) === 'pending')
          .sort((a, b) => SEV[a.sev].rank - SEV[b.sev].rank || b.date.localeCompare(a.date))
          .slice(0, 10)
        return [
          { k: 'head', t: 'disclosure ledger — targets redacted' },
          kv('reports', String(LEDGER_STATS.total) + ' across ' + LEDGER_STATS.programs + ' programs'),
          kv('platforms', 'SignalFisher · YesWeHack'),
          kv('severity', LEDGER_STATS.critical + ' critical · ' + LEDGER_STATS.high + ' high'),
          kv('outcome', LEDGER_STATS.validated + ' accepted/resolved · ' + LEDGER_STATS.pending + ' open · ' + LEDGER_STATS.duplicate + ' duplicate'),
          { k: 'dim', t: '' },
          { k: 'dim', t: 'ID'.padEnd(13) + 'SEV'.padEnd(6) + 'CLASS'.padEnd(10) + 'STATUS' },
          ...top.map((f) => ({
            k: (SEV[f.sev].rank < 2 ? 'warn' : 'out') as LineKind,
            t:
              f.id.padEnd(13) +
              SEV[f.sev].short.padEnd(6) +
              f.cls.padEnd(10) +
              STATUS_META[f.status].label +
              (f.title ? '  — ' + f.title : '  — ' + CLASS_LABEL[f.cls]),
          })),
          { k: 'dim', t: 'full ledger in /findings — duplicates behind the toggle' },
          link,
        ]
      }
      case 'research':
        return [
          { k: 'out', t: '[0x01] ICS/OT intrusion detection on HAI — NordSec 2026, under revision' },
          { k: 'out', t: '[0x02] Decentralized FL with zk-SNARKs + BFT consensus — final proofreading' },
          link,
        ]
      case 'projects':
        return [
          kv('recon', 'AI-assisted recon & triage · Python/asyncio'),
          kv('legal-rag', 'RAG on fine-tuned Mistral · legal documents'),
          kv('kernelscope', 'process & memory monitoring · C/C++'),
          kv('passmanager', 'AES-128 local vault · C++'),
          { k: 'dim', t: '  …and more in /projects' },
          link,
        ]
      case 'skills':
        return [
          ...SKILLS.map((g) => {
            const a = avg(g)
            const n = Math.round(a * 10)
            return {
              k: 'out' as LineKind,
              t: g.hex + ' ' + g.short.padEnd(10) + '[' + '#'.repeat(n) + '.'.repeat(10 - n) + '] ' + hx(a),
            }
          }),
          link,
        ]
      case 'timeline':
        return [
          ...TIMELINE.map((c) => ({
            k: 'out' as LineKind,
            t: '* ' + c.sha + ' ' + c.subject + ' — ' + c.when,
          })),
          link,
        ]
      case 'contact':
        return [
          kv('email', CONTACT.email),
          ...CONTACT.links.map((l) => kv(l.key, l.label)),
          kv('cv', CVS.map((c) => c.lang).join(' · ') + ' — run `cv en` or `cv fr`'),
          link,
        ]
      default:
        return []
    }
  }, [])

  const download = useCallback((href: string, filename: string) => {
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }, [])

  const sudo = useCallback(
    (arg: string) => {
      sudoT.current.forEach(clearTimeout)
      if (root) {
        print([{ k: 'ok', t: 'you are already root. with great power comes great responsibility.' }])
        return
      }
      if (/make me a sandwich/i.test(arg)) {
        print([{ k: 'out', t: 'okay.' }])
        return
      }
      sudoT.current = [
        setTimeout(() => print([{ k: 'out', t: '[sudo] password for visitor: ********' }]), 380),
        setTimeout(() => {
          print([
            { k: 'warn', t: 'visitor is not in the sudoers file. This incident will be reported.' },
          ])
          flash('warn', 'privilege escalation attempt detected')
        }, 1050),
        setTimeout(
          () =>
            print([
              { k: 'dim', t: '# incident 0x1337 forwarded to raf@localhost. he says hi.' },
              { k: 'dim', t: '# real escalation starts with ↑ ↑' },
            ]),
          1900,
        ),
      ]
    },
    [flash, print, root],
  )

  const run = useCallback(
    (raw: string) => {
      const cmd = String(raw || '').replace(/\s+/g, ' ').trim()
      const echo: NewLine = { k: 'cmd', t: cmd, prompt, root }
      if (!cmd) {
        print([echo])
        return
      }
      hist.current.push(cmd)
      if (hist.current.length > 50) hist.current.shift()
      const [first, ...rest] = cmd.split(' ')
      const name = first.toLowerCase()
      const arg = rest.join(' ')

      const bare = name.replace(/^\//, '') as SectionId
      if (name.startsWith('/') && (SECTIONS as readonly string[]).includes(bare)) {
        goTo(bare)
        print([echo, { k: 'dim', t: '→ ' + name }])
        return
      }

      let out: NewLine[] = []
      switch (name) {
        case 'help':
        case 'man':
        case '?':
          out = [
            { k: 'head', t: 'commands:' },
            ...(
              [
                ['about', 'who is raf'],
                ['findings', 'disclosed vulnerabilities'],
                ['research', 'papers & dossiers'],
                ['projects', 'things I build'],
                ['skills', 'capability matrix'],
                ['timeline', 'git log --graph'],
                ['contact', 'open a channel'],
                ['cv [en|fr]', 'download the CV — english or french'],
                ['ls', 'list sections'],
                ['cd <path>', 'jump there — cd /findings'],
              ] as [string, string][]
            ).map(([c, d]) => ({ k: 'out' as LineKind, t: '  ' + c.padEnd(13) + d })),
            { k: 'dim', t: '  also: whoami · date · echo · history · clear' },
          ]
          if (root) out.push({ k: 'warn', t: '  root: cat /root/flag.txt' })
          break
        case 'about':
        case 'findings':
        case 'research':
        case 'projects':
        case 'skills':
        case 'timeline':
        case 'contact':
          out = section(name)
          break
        case 'cv':
        case 'resume': {
          const want = arg.toLowerCase().replace(/^--?(lang=)?/, '').trim()
          const hit = CVS.find((c) => c.lang === want || c.label.startsWith(want))
          if (!want) {
            out = [
              { k: 'head', t: 'curriculum vitae:' },
              ...CVS.map((c) => ({
                k: 'out' as LineKind,
                t: '  ' + ('cv ' + c.lang).padEnd(9) + c.download + '   ' + c.size + '  (' + c.label + ')',
              })),
              { k: 'dim', t: 'run `cv en` or `cv fr` to download' },
            ]
          } else if (hit) {
            download(hit.file, hit.download)
            out = [
              { k: 'ok', t: 'fetching ' + hit.download + ' …' },
              { k: 'dim', t: '→ saved to your downloads (' + hit.label + ', ' + hit.size + ')' },
            ]
          } else {
            out = [
              { k: 'err', t: 'cv: unknown language: ' + arg },
              { k: 'dim', t: 'available: ' + CVS.map((c) => c.lang).join(', ') },
            ]
          }
          break
        }
        case 'cd':
        case 'open':
        case 'goto': {
          const p = arg.toLowerCase().replace(/^~?\/?/, '').replace(/\/$/, '')
          if (!p || p === '..' || p === '~' || p === 'top') {
            goTo('top')
            out = [{ k: 'dim', t: '→ ~' }]
          } else if ((SECTIONS as readonly string[]).includes(p)) {
            goTo(p)
            out = [{ k: 'dim', t: '→ /' + p }]
          } else {
            out = [{ k: 'err', t: 'cd: no such file or directory: ' + arg }]
          }
          break
        }
        case 'ls':
          if (/^\/?root\/?$/.test(arg)) {
            out = [
              root
                ? { k: 'out', t: 'flag.txt' }
                : { k: 'err', t: "ls: cannot open directory '/root': Permission denied" },
            ]
          } else {
            out = [
              { k: 'out', t: SECTIONS.map((s) => '/' + s).join('  ') },
              { k: 'dim', t: CVS.map((c) => c.download).join('  ') },
            ]
          }
          break
        case 'cat': {
          const p = arg.toLowerCase().replace(/^~?\/?/, '')
          if (/flag/.test(p)) {
            out = root
              ? [
                  { k: 'ok', t: 'FLAG{k0nam1_m3ans_r00t}' },
                  { k: 'dim', t: 'nice. now go find real ones.' },
                ]
              : [{ k: 'err', t: 'cat: ' + arg + ': Permission denied' }]
          } else if ((SECTIONS as readonly string[]).includes(p)) {
            out = section(p as SectionId)
          } else {
            out = [
              { k: 'err', t: 'cat: ' + (arg || 'missing operand') + ': No such file or directory' },
            ]
          }
          break
        }
        case 'whoami':
          out = [{ k: 'out', t: root ? 'root' : 'visitor — the one behind this page is raf.' }]
          break
        case 'date':
          out = [{ k: 'out', t: new Date().toString() }]
          break
        case 'echo':
          out = [{ k: 'out', t: arg }]
          break
        case 'history':
          out = hist.current.map((h, i) => ({
            k: 'dim' as LineKind,
            t: String(i + 1).padStart(4) + '  ' + h,
          }))
          break
        case 'clear':
        case 'cls':
          setLines([])
          return
        case 'exit':
        case 'logout':
        case 'quit':
          if (dockOpen) {
            print([echo, { k: 'dim', t: 'logout' }])
            setTimeout(() => setDockOpen(false), 250)
            return
          }
          out = [{ k: 'dim', t: 'there is no exit. only scrolling.' }]
          break
        case 'sudo':
        case 'su':
          print([echo])
          sudo(arg)
          return
        case 'rm':
          out = [
            /-\w*r\w*f?\s+\/(\*|\s|$)|-\w*f\w*r\s+\//.test(arg + ' ')
              ? { k: 'warn', t: "rm: refusing to remove '/': this portfolio is load-bearing." }
              : { k: 'err', t: 'rm: permission denied' },
          ]
          break
        default:
          out = [
            { k: 'err', t: 'raf-sh: command not found: ' + first },
            { k: 'dim', t: 'type `help` to list commands' },
          ]
      }
      print([echo, ...out])
    },
    [dockOpen, download, goTo, print, prompt, root, section, sudo],
  )

  /* — input handling — */

  const complete = useCallback(
    (input: HTMLInputElement) => {
      const v = input.value
      const m = v.match(/^(cd|cat)\s+\/?(\S*)$/i)
      if (m) {
        const opts = SECTIONS.filter((s) => s.startsWith(m[2].toLowerCase()))
        if (opts.length === 1) input.value = m[1] + ' /' + opts[0]
        else if (opts.length > 1) print([{ k: 'dim', t: opts.map((o) => '/' + o).join('  ') }])
        return true
      }
      if (/\s/.test(v)) return false
      const opts = COMMANDS.filter((c) => c.startsWith(v.toLowerCase()))
      if (opts.length === 1) input.value = opts[0] + (opts[0] === 'cd' ? ' /' : '')
      else if (opts.length > 1) print([{ k: 'dim', t: opts.join('  ') }])
      return true
    },
    [print],
  )

  const onTermKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget
      if (e.key === 'Enter') {
        e.preventDefault()
        const v = input.value
        input.value = ''
        histIdx.current = null
        run(v)
      } else if (e.key === 'ArrowUp') {
        if (!hist.current.length) return
        e.preventDefault()
        histIdx.current =
          histIdx.current == null ? hist.current.length - 1 : Math.max(0, histIdx.current - 1)
        input.value = hist.current[histIdx.current]
      } else if (e.key === 'ArrowDown') {
        if (histIdx.current == null) return
        e.preventDefault()
        histIdx.current++
        if (histIdx.current >= hist.current.length) {
          histIdx.current = null
          input.value = ''
        } else input.value = hist.current[histIdx.current]
      } else if (e.key === 'Tab' && !e.shiftKey && input.value) {
        if (complete(input)) e.preventDefault()
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setLines([])
      } else if (e.key === 'Escape') {
        input.blur()
      }
    },
    [complete, run],
  )

  const openTerminal = useCallback(() => {
    if (dockOpen) {
      dockInputRef.current?.focus()
      return
    }
    if (heroVisible && heroInputRef.current) heroInputRef.current.focus({ preventScroll: true })
    else setDockOpen(true)
  }, [dockOpen, heroVisible])

  /* — boot — */

  const bootDone = useRef(false)
  const endBoot = useCallback(() => {
    if (bootDone.current) return
    bootDone.current = true
    clearTimeout(bootT.current)
    setBootN(BOOT.length)
    setBootFade(true)
    try {
      sessionStorage.setItem('raf.booted', '1')
    } catch {
      /* storage blocked */
    }
    bootT.current = setTimeout(() => {
      document.documentElement.style.overflow = ''
      setBooting(false)
    }, 320)
  }, [])

  useEffect(() => {
    const isReduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    reducedRef.current = isReduced
    setReduced(isReduced)

    setLines((prev) =>
      prev.map((l) =>
        l.id === 1
          ? { ...l, t: 'raf-sh 1.0 — last login ' + new Date().toUTCString().slice(0, 22) + ' on tty1' }
          : l,
      ),
    )

    let seen = false
    try {
      seen = sessionStorage.getItem('raf.booted') === '1'
    } catch {
      /* storage blocked */
    }
    const mode = CONFIG.bootSequence
    if (isReduced || mode === 'off' || (mode === 'once per session' && seen)) {
      setBooting(false)
      return
    }
    // Strict Mode remounts this effect; start the sequence from scratch.
    bootDone.current = false
    setBootFade(false)
    document.documentElement.style.overflow = 'hidden'
    let i = 0
    const step = 1300 / BOOT.length
    const tick = () => {
      i++
      setBootN(i)
      bootT.current =
        i < BOOT.length
          ? setTimeout(tick, step * (0.4 + Math.random() * 1.2))
          : setTimeout(endBoot, 560)
    }
    bootT.current = setTimeout(tick, 140)
    return () => {
      clearTimeout(bootT.current)
      document.documentElement.style.overflow = ''
    }
  }, [endBoot])

  /* — global keys — */

  const konami = useCallback(() => {
    if (root) {
      showToast('already root. the code only works once.', 'ok')
      return
    }
    setRoot(true)
    setDockOpen((d) => d || !heroVisible)
    flash('ok', 'root access granted')
    showToast('↑↑↓↓←→←→BA — cheat accepted · uid=0(root)', 'ok')
    print([
      { k: 'warn', t: '[konami] sequence accepted' },
      { k: 'ok', t: 'privilege escalation successful.' },
      { k: 'out', t: 'uid=0(root) gid=0(root) groups=0(root),27(sudo)' },
      { k: 'dim', t: 'hint: there is something in /root' },
    ])
  }, [flash, heroVisible, print, root, showToast])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || '').toLowerCase()
      kq.current = [...kq.current, k].slice(-10)
      if (kq.current.join(',') === KONAMI) {
        kq.current = []
        konami()
      }
      if (booting) {
        if (!['shift', 'control', 'alt', 'meta'].includes(k)) endBoot()
        return
      }
      if (e.key === 'Escape' && dockOpen) {
        setDockOpen(false)
        return
      }
      const t = e.target
      if (
        (t instanceof HTMLElement &&
          (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return
      if (e.key === '/' || e.key === '`') {
        e.preventDefault()
        openTerminal()
        return
      }
      const i = '01234567'.indexOf(e.key)
      if (i >= 0) {
        e.preventDefault()
        goTo(i === 0 ? 'top' : SECTIONS[i - 1], true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booting, dockOpen, endBoot, goTo, konami, openTerminal])

  /* — scroll spy — */

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ;['top', ...SECTIONS].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (dockOpen) dockInputRef.current?.focus({ preventScroll: true })
  }, [dockOpen])

  useEffect(() => {
    const pending = sudoT
    const toastTimer = toastT
    const alarmTimer = alarmT
    return () => {
      pending.current.forEach(clearTimeout)
      clearTimeout(toastTimer.current)
      clearTimeout(alarmTimer.current)
    }
  }, [])

  useEffect(() => {
    if (typeof console === 'undefined') return
    console.log(
      '%c raf // offensive security researcher ',
      'background:#39ff88;color:#0a0d10;font:600 12px monospace;padding:4px 6px',
      '\nPoking around the source? Good instinct.\nTry the Konami code, or type sudo in the terminal.',
    )
  }, [])

  const value = useMemo<SiteValue>(
    () => ({
      lines,
      prompt,
      root,
      run,
      clear: () => setLines([]),
      dockOpen,
      closeDock: () => setDockOpen(false),
      openTerminal,
      heroVisible,
      setHeroVisible,
      heroInputRef,
      dockInputRef,
      onTermKey,
      active,
      goTo,
      toast,
      alarm,
      copy,
      booting,
      bootN,
      bootFade,
      endBoot,
      reduced,
    }),
    [
      active, alarm, bootFade, bootN, booting, copy, dockOpen, endBoot, goTo, heroVisible,
      lines, onTermKey, openTerminal, prompt, reduced, root, run, toast,
    ],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

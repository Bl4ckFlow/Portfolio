// Every piece of copy, data and tunable on the site lives here.
// Edit this file, not the components.

export const SECTIONS = [
  'about',
  'findings',
  'research',
  'projects',
  'skills',
  'timeline',
  'contact',
] as const

export type SectionId = (typeof SECTIONS)[number]

/* ─── look & behaviour ─────────────────────────────────────────────────── */

export const CONFIG = {
  /** 'acid green' | 'cyan' — accent ramp applied to the whole page */
  accent: 'acid green' as 'acid green' | 'cyan',
  /** scanlines, vignette and film grain overlay */
  crtEffects: true,
  /** 'always' | 'once per session' | 'off' */
  bootSequence: 'once per session' as 'always' | 'once per session' | 'off',
  /** month the availability countdown targets (0-indexed month, like Date.UTC) */
  availableFrom: { year: 2027, month: 8, day: 1 },
}

/* ─── identity ─────────────────────────────────────────────────────────── */

export const PROFILE = {
  name: 'Abderraouf LAARBI',
  handle: 'om4ga_',
  github: 'Bl4ckFlow',
  role: 'offensive security researcher',
  location: 'paris, fr',
  available: 'available 09.2027',
  ranks: ['yeswehack #1097', 'signalfisher #63'],
  // rendered in the hero; `handle` gets the mono treatment between the two halves
  tagline: {
    before: 'Abderraouf “Raf” LAARBI — ',
    handle: 'Om4ga_',
    after:
      ' on the leaderboards. Final-year cybersecurity engineering student at ESILV Paris, bug bounty hunter, and researcher in intrusion detection for industrial control systems.',
  },
  /** what a screen reader and the <h1> fallback announce */
  srName: 'Abderraouf “Raf” LAARBI, offensive security researcher',
  lede: 'Bug bounty hunter and passionate cybersecurity researcher.',
  about: [
    'I’m a final-year cybersecurity and cloud computing engineering student at ESILV Paris, with a particular interest in offensive security, vulnerability research, and intrusion detection.',
    'I actively participate in bug bounty programs on YesWeHack and SignalFisher, focusing on web application vulnerabilities.',
    'At the University of Tartu, I’ve also worked with the Information Security research group on intrusion detection for industrial control systems, studying attacks that remain within normal operational thresholds.',
    'I’m interested in pursuing a CIFRE PhD or joining a research-driven offensive security team starting September 2027.',
  ],
}

export const CONTACT = {
  email: 'abderraouf.laarbi@gmail.com',
  links: [
    { key: 'github', label: 'github.com/Bl4ckFlow', href: 'https://github.com/Bl4ckFlow' },
    { key: 'yeswehack', label: 'yeswehack.com/om4ga', href: 'https://yeswehack.com/om4ga' },
    // { key: 'linkedin', label: 'linkedin.com/in/<handle>', href: 'https://www.linkedin.com/in/<handle>' },
  ],
  blurb:
    'Disclosure coordination, research collaborations, CIFRE PhD and research-engineering opportunities.',
  availability: 'available from september 2027 · paris or remote',
  /** Fill this in to show the PGP block in /contact; leave null to hide it. */
  pgp: null as null | { algo: string; created: string; fingerprint: string; uid: string; asc: string },
}

/** The two CVs, wired to the download buttons in /contact, the hero and `cv` in the shell. */
export const CVS = [
  {
    lang: 'en' as const,
    label: 'english',
    flag: 'EN',
    file: '/cv/Raouf_LAARBI_CV_EN.pdf',
    download: 'Raouf_LAARBI_CV_EN.pdf',
    size: '81 KB',
  },
  {
    lang: 'fr' as const,
    label: 'français',
    flag: 'FR',
    file: '/cv/Raouf_LAARBI_CV_FR.pdf',
    download: 'Raouf_LAARBI_CV_FR.pdf',
    size: '83 KB',
  },
]

export const SYS_STATUS: [string, string, 'text' | 'accent'][] = [
  ['handle', 'om4ga_ · gh/Bl4ckFlow', 'text'],
  ['role', 'offensive security researcher', 'text'],
  ['school', 'ESILV Paris · final year', 'text'],
  ['major', 'cloud computing · cybersecurity', 'text'],
  ['yeswehack', 'rank #1097', 'text'],
  ['signalfisher', 'rank #63', 'text'],
  ['research', 'ICS/OT intrusion detection', 'text'],
  ['lab', 'Univ. of Tartu · InfoSec', 'text'],
  ['languages', 'français · english (B2+)', 'text'],
  ['available', 'sept 2027 · CIFRE PhD', 'accent'],
]

/* ─── findings ───────────────────────────────────────────────────────── */

// The disclosure ledger lives in its own file — see src/data/findings.ts
export { FINDINGS, LEDGER_STATS, CLASS_LABEL, STATUS_META, group } from './findings'
export type { Finding, FindingClass, FindingStatus, Severity, StatusGroup } from './findings'

/* ─── research ─────────────────────────────────────────────────────────── */

export type Dossier = {
  file: string
  slug: string
  title: string
  stamp: string
  rotate: number
  meta: [string, string][]
  abstract: string
  tags: string[]
  footer: string
  subject: string
}

export const DOSSIERS: Dossier[] = [
  {
    file: 'file 0x01',
    slug: 'ics-ot',
    subject: 'Preprint request — ICS/OT intrusion detection',
    title: 'Intrusion detection for industrial control systems',
    stamp: 'under\nrevision',
    rotate: -5,
    meta: [
      ['affiliation', 'University of Tartu — InfoSec group'],
      ['venue', 'NordSec 2026 · submitted'],
      ['dataset', 'HAI — HIL-based augmented ICS'],
      ['period', 'jun 2026 · resuming feb–jun 2027'],
    ],
    abstract:
      'We benchmark learning-based detectors on HAI, a hardware-in-the-loop testbed spanning boiler, turbine and water-treatment processes, with a focus on stealthy attacks that keep sensor readings inside normal operating bounds — the ones threshold alarms never see.',
    tags: ['ics/ot', 'anomaly detection', 'time series', 'HAI dataset'],
    footer: 'under revision for resubmission',
  },
  {
    file: 'file 0x02',
    slug: 'zk-fl',
    subject: 'Preprint request — zk-SNARK federated learning',
    title: 'Decentralized federated learning with zk-SNARKs',
    stamp: 'final\nproofread',
    rotate: 4,
    meta: [
      ['proof system', 'zk-SNARKs — Circom, snarkjs'],
      ['consensus', 'Byzantine fault-tolerant — weighted vote'],
      ['status', 'paper in final proofreading'],
      ['period', '2025 → present'],
    ],
    abstract:
      'Each client proves in zero knowledge that its local gradient-descent steps were computed honestly, and a Byzantine fault-tolerant consensus layer — distributed weighted voting — replaces the central aggregator, so no single party can poison, censor or quietly rewrite training.',
    tags: ['zk-snarks', 'circom', 'snarkjs', 'bft consensus', 'federated learning'],
    footer: 'submission imminent',
  },
]

/* ─── projects ─────────────────────────────────────────────────────────── */

export type Project = {
  path: string
  status: 'wip' | 'active' | 'shipped'
  title: string
  blurb: string
  bullets: string[]
  tags: { t: string; accent?: boolean }[]
  repo?: string
}

export const PROJECTS: Project[] = [
  {
    path: '~/projects/recon-pipeline',
    status: 'active',
    title: 'Recon & triage pipeline',
    blurb:
      'AI-assisted bug bounty reconnaissance in Python/asyncio: concurrent asset discovery feeding a triage step that ranks what deserves a human look.',
    bullets: [
      'async stages: subdomains → ports → HTTP fingerprints',
      'diffs each scope snapshot to surface what changed overnight',
    ],
    tags: [{ t: 'Python', accent: true }, { t: 'asyncio', accent: true }, { t: 'LLM triage' }, { t: 'recon' }],
  },
  {
    path: '~/projects/legal-rag',
    status: 'shipped',
    title: 'Legal RAG on fine-tuned Mistral',
    blurb:
      'Retrieval-augmented generation over sensitive legal documents on a fine-tuned Mistral LLM, built at De Pardieu Brocas Maffei — answers come back with the clauses they’re grounded in.',
    bullets: [
      'extraction and cleaning pipeline for born-digital PDF and Word',
      'embeddings in a vector store for semantic search over case files',
    ],
    tags: [{ t: 'Python', accent: true }, { t: 'Mistral', accent: true }, { t: 'RAG' }, { t: 'fine-tuning' }],
  },
  {
    path: '~/projects/kernelscope',
    status: 'wip',
    title: 'KernelScope',
    blurb:
      'A system-level monitoring tool in C/C++ focused on process and memory protection, written against low-level security practice rather than around it.',
    bullets: [
      'process and memory telemetry straight off the kernel interfaces',
      'minimal, auditable surface — no agent, no daemon sprawl',
    ],
    tags: [{ t: 'C', accent: true }, { t: 'C++', accent: true }, { t: 'Linux internals' }, { t: 'telemetry' }],
  },
  {
    path: '~/projects/passmanager',
    status: 'shipped',
    title: 'Password manager',
    blurb:
      'A local password manager in C++ built on AES-128, with the vault file as the only trust boundary — nothing leaves the machine.',
    bullets: [
      'AES-128 encrypted vault, keyed from a derived master secret',
      'file-based design: no network, no sync, no third party',
    ],
    tags: [{ t: 'C++', accent: true }, { t: 'AES-128', accent: true }, { t: 'cryptography' }],
    repo: 'https://github.com/Bl4ckFlow/passManager',
  },
  {
    path: '~/projects/mini-os',
    status: 'shipped',
    title: 'Mini OS emulator',
    blurb:
      'A command-line operating-system simulation in C++: filesystem navigation, I/O and shell-like behaviour from first principles.',
    bullets: [
      'shell loop with its own command table and path resolution',
      'written to understand syscall surfaces by rebuilding one',
    ],
    tags: [{ t: 'C++', accent: true }, { t: 'systems' }, { t: 'simulation' }],
    repo: 'https://github.com/Bl4ckFlow/OS',
  },
  {
    path: '~/projects/pokeapp',
    status: 'shipped',
    title: 'PokeApp',
    blurb:
      'A terminal Pokédex in C++ on FTXUI — loads, filters and renders a CSV dataset entirely inside the TUI.',
    bullets: [
      'FTXUI component tree with keyboard-driven filtering',
      'CSV parsing and indexing with no runtime dependencies',
    ],
    tags: [{ t: 'C++', accent: true }, { t: 'FTXUI' }, { t: 'TUI' }],
    repo: 'https://github.com/Bl4ckFlow/PokeApp',
  },
  {
    path: '~/projects/rss-ansi',
    status: 'shipped',
    title: 'ANSI RSS reader',
    blurb:
      'A Python feed reader that fetches and parses RSS for monitoring online updates and firing custom alerts, rendered in ANSI straight to the terminal.',
    bullets: [
      'polls and diffs feeds, alerting only on what is new',
      'ANSI rendering — readable over SSH, scriptable in a pipe',
    ],
    tags: [{ t: 'Python', accent: true }, { t: 'RSS' }, { t: 'automation' }],
    repo: 'https://github.com/Bl4ckFlow/pythonProject',
  },
  {
    path: '~/projects/telecom-analysis',
    status: 'shipped',
    title: 'Telecom data analysis',
    blurb:
      'A statistical and machine-learning study of telecom and internet usage data: clustering, regression and forecasting over a real dataset.',
    bullets: [
      'clustering and regression models compared on the same features',
      'forecasting with the evaluation written up alongside the code',
    ],
    tags: [{ t: 'Python', accent: true }, { t: 'pandas' }, { t: 'ML' }, { t: 'stats' }],
    repo: 'https://github.com/Bl4ckFlow/Analyse_de_donn-e',
  },
]

/* ─── skills ───────────────────────────────────────────────────────────── */

// Levels are self-assessed, 0–1, rendered as a byte (0x00–0xFF). Tune freely.
export type SkillGroup = {
  hex: string
  name: string
  short: string
  items: [string, number][]
}

export const SKILLS: SkillGroup[] = [
  {
    hex: '0x01',
    name: 'Offensive Security & Bug Bounty',
    short: 'OFFSEC',
    items: [
      ['Manual web & API pentesting (OWASP Top 10)', 0.9],
      ['Broken access control & IDOR', 0.93],
      ['Exploit & tooling scripting', 0.86],
      ['Reproducible reports — impact, PoC, fix', 0.88],
    ],
  },
  {
    hex: '0x02',
    name: 'Reverse Engineering & Malware Analysis',
    short: 'RE/MAL',
    items: [
      ['Binary formats — PE, ELF, DLL, .so', 0.76],
      ['OEP & IAT analysis', 0.72],
      ['Entropy & packer analysis', 0.74],
      ['Feature extraction for triage', 0.7],
    ],
  },
  {
    hex: '0x03',
    name: 'Systems & Detection',
    short: 'SYS/DET',
    items: [
      ['Linux internals', 0.84],
      ['Windows Sysinternals', 0.7],
      ['eBPF', 0.72],
      ['System telemetry & log analysis', 0.82],
    ],
  },
  {
    hex: '0x04',
    name: 'Programming & Automation',
    short: 'CODE',
    items: [
      ['Python — advanced, asyncio', 0.93],
      ['C / C++', 0.8],
      ['Bash', 0.86],
    ],
  },
  {
    hex: '0x05',
    name: 'AI & Applied Cryptography',
    short: 'AI/CRYPTO',
    items: [
      ['ML for intrusion detection', 0.82],
      ['LLMs, RAG & fine-tuning', 0.8],
      ['zk-SNARKs — Circom, snarkjs', 0.7],
      ['Decentralized federated learning', 0.75],
    ],
  },
]

/* ─── timeline ─────────────────────────────────────────────────────────── */

export type Commit = {
  sha: string
  refs?: { t: string; kind: 'branch' | 'tag' }[]
  when: string
  subject: string
  body: string
  dot: 'target' | 'head' | 'done' | 'past'
}

export const TIMELINE: Commit[] = [
  {
    sha: '9f3c2e1',
    refs: [{ t: 'origin/next', kind: 'branch' }],
    when: '2027 · target',
    subject: 'wip(phd): CIFRE PhD — offensive security × ICS/OT',
    body: 'An industrial research doctorate pairing a security team with an academic lab. Not merged yet — open to the right branch.',
    dot: 'target',
  },
  {
    sha: 'a41d7b0',
    refs: [
      { t: 'HEAD -> main', kind: 'branch' },
      { t: 'tag: nordsec-26', kind: 'tag' },
    ],
    when: 'jun 2026 · feb–jun 2027',
    subject: 'feat(research): University of Tartu — InfoSec group',
    body: 'ICS/OT intrusion detection on the HAI dataset. First stint June 2026; back with the group February to June 2027. Paper submitted to NordSec 2026, now under revision for resubmission.',
    dot: 'head',
  },
  {
    sha: '5e8c0f3',
    refs: [{ t: 'work', kind: 'branch' }],
    when: 'jul 2024 → present',
    subject: 'feat(work): apprenticeship @ De Pardieu Brocas Maffei',
    body: 'Software & AI developer at a Paris business law firm: a RAG system on a fine-tuned Mistral LLM over sensitive legal documents, internal infrastructure-monitoring tools, and full-stack dashboards shipping AI features to users.',
    dot: 'done',
  },
  {
    sha: 'c27a914',
    refs: [{ t: 'edu', kind: 'branch' }],
    when: 'sept 2023 → aug 2027',
    subject: 'feat(edu): ESILV Paris — engineering degree',
    body: 'Major in Cloud Computing & Cybersecurity. Final year, degree expected August 2027.',
    dot: 'done',
  },
  {
    sha: '3b6e5d2',
    when: 'sept 2022 → jun 2023',
    subject: 'feat(edu): ENSIA Algiers',
    body: 'National Higher School of Artificial Intelligence — preparatory cycle in artificial intelligence, CPGE equivalent.',
    dot: 'past',
  },
  {
    sha: '0d1e7aa',
    refs: [{ t: 'root commit', kind: 'tag' }],
    when: 'sept 2021 → jun 2022',
    subject: 'init: baccalauréat — mathematics',
    body: 'National Mathematics High School, Algiers — where the habit of proving things started.',
    dot: 'past',
  },
]

/* ─── boot sequence ────────────────────────────────────────────────────── */

export const BOOT: [string, string][] = [
  ['[    0.000000]', 'Linux version 6.11.0-om4ga (raf@bl4ckflow) #1 SMP PREEMPT_DYNAMIC'],
  ['[    0.000000]', 'Command line: root=/dev/portfolio ro quiet lockdown=confidentiality'],
  ['[    0.004112]', 'x86/cpu: SMEP, SMAP and UMIP enabled'],
  ['[    0.012733]', 'Memory: 16384K/16384K available (caffeine reserved)'],
  ['[    0.031337]', 'LSM: initializing capability, landlock, lockdown, yama'],
  ['[    0.048920]', 'audit: tracking disabled — 0 cookies, 0 trackers'],
  ['[    0.067004]', 'bpf: JIT hardening enabled, 4 probes attached'],
  ['[    0.081560]', 'ics-ids: loading HAI baseline model ............ ok'],
  ['[    0.094208]', 'zk: verifying groth16 proofs (snarkjs) ......... ok'],
  ['[    0.112877]', 'redact: masking program identifiers ........... ok'],
  ['[    0.130245]', 'net: tun0 up — route to paris, fr (48.85N 2.35E)'],
  ['[  OK  ]', 'Mounted /findings (read-only).'],
  ['[  OK  ]', 'Started offensive security research daemon.'],
  ['[  OK  ]', 'Reached target visitor session.'],
  ['[ AUTH ]', 'verifying visitor fingerprint … done'],
  ['grant', 'access granted: welcome, visitor'],
]

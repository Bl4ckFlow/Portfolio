// ─── disclosure ledger ──────────────────────────────────────────────────
//
// Reports on SignalFisher (Bug Bounty Switzerland) and YesWeHack that a triage
// team confirmed as a real bug — accepted, resolved, or duplicate of a report
// someone else filed first. Reports still in triage, and ones closed as
// informative / invalid / out of scope, are deliberately not listed.
//
// Keeping only confirmed bugs also keeps the ledger safe to publish: nothing
// here is an open report against an unpatched target.
//
// REDACTION POLICY: program names, assets, hostnames and endpoints are NOT in
// this file and must not be added. What ships is the shape of the work: class,
// severity, triage outcome, date. Programs are referred to by opaque ids
// (p01, p02 …) so the program count stays truthful without naming anyone.
//
// Rewards are deliberately not tracked here — the ledger shows findings, not money.

export type Severity = 'critical' | 'high' | 'medium' | 'low'

export type FindingClass =
  | 'XSS' | 'BAC' | 'IDOR' | 'AUTH' | 'INJ' | 'EXPO'
  | 'MISCONF' | 'LOGIC' | 'SSRF' | 'REDIRECT' | 'TRAVERSAL'

export type FindingStatus =
  | 'accepted' | 'resolved'   // triaged as a real bug
  | 'duplicate'               // real bug, someone filed it first

export type StatusGroup = 'validated' | 'duplicate'

export type Finding = {
  id: string
  date: string
  platform: 'SignalFisher' | 'YesWeHack'
  sev: Severity
  cls: FindingClass
  status: FindingStatus
  prog: string
  /** CVSS base score, where the platform assigns one. */
  cvss?: string
  /** Redacted one-liner. Omitted where only the class is known. */
  title?: string
}

export const CLASS_LABEL: Record<FindingClass, string> = {
  XSS: 'cross-site scripting',
  BAC: 'broken access control',
  IDOR: 'insecure direct object reference',
  AUTH: 'broken authentication',
  INJ: 'injection',
  EXPO: 'sensitive data exposure',
  MISCONF: 'security misconfiguration',
  LOGIC: 'business logic flaw',
  SSRF: 'server-side request forgery',
  REDIRECT: 'open redirect',
  TRAVERSAL: 'path traversal',
}

export const STATUS_META: Record<FindingStatus, { label: string; group: StatusGroup }> = {
  accepted: { label: 'accepted', group: 'validated' },
  resolved: { label: 'resolved', group: 'validated' },
  duplicate: { label: 'duplicate', group: 'duplicate' },
}

/* ─── SignalFisher · Bug Bounty Switzerland ─────────────────────────────
   id | date | severity | class | status | program */
type SfRow = [string, string, Severity, FindingClass, FindingStatus, string]

const SIGNALFISHER: SfRow[] = [
  ['subtly-VIRTUE',      '2026-10-26', 'high',     'BAC',     'duplicate',   'p01'],
  ['retinal-TZAR',       '2026-10-27', 'medium',   'BAC',     'duplicate',   'p01'],
  ['charge-COUNTY',      '2026-09-15', 'medium',   'BAC',     'duplicate',   'p04'],
  ['taper-CULVERT',      '2026-09-15', 'medium',   'BAC',     'accepted',    'p04'],
  ['vinous-TOURIST',     '2026-09-26', 'high',     'INJ',     'duplicate',   'p04'],
  ['WHOOP-tumble',       '2026-09-21', 'medium',   'XSS',     'duplicate',   'p06'],
  ['net-CURIA',          '2026-08-12', 'medium',   'MISCONF', 'duplicate',   'p08'],
  ['BING-savagery',      '2026-06-30', 'medium',   'INJ',     'duplicate',   'p08'],
  ['VALUE-inverse',      '2026-09-14', 'medium',   'BAC',     'duplicate',   'p09'],
  ['VATIC-tilde',        '2026-09-14', 'medium',   'BAC',     'accepted',    'p09'],
  ['GOUGE-ship',         '2026-08-27', 'medium',   'INJ',     'duplicate',   'p10'],
  ['vendee-VIEW',        '2026-08-30', 'high',     'AUTH',    'duplicate',   'p10'],
  ['leafage-TRANQUIL',   '2026-09-15', 'high',     'INJ',     'duplicate',   'p11'],
  ['LAYS-catlike',       '2026-09-15', 'medium',   'INJ',     'duplicate',   'p12'],
  ['POLTROON-pimiento',  '2026-09-10', 'low',      'MISCONF', 'accepted',    'p13'],
  ['thrips-GIBBET',      '2026-09-09', 'medium',   'EXPO',    'duplicate',   'p15'],
  ['HASSOCK-puffery',    '2026-09-29', 'medium',   'AUTH',    'accepted',    'p15'],
  ['product-VERGER',     '2026-09-04', 'high',     'AUTH',    'accepted',    'p15'],
  ['affable-GRATIS',     '2026-09-09', 'medium',   'INJ',     'resolved',    'p15'],
  ['SNOWY-paradox',      '2026-09-03', 'medium',   'INJ',     'resolved',    'p15'],
  ['sheath-STOKE',       '2026-10-07', 'medium',   'AUTH',    'duplicate',   'p15'],
  ['TRUTH-ash',          '2026-10-09', 'critical', 'AUTH',    'accepted',    'p16'],
  ['VIOLIST-sheriff',    '2026-10-19', 'critical', 'INJ',     'accepted',    'p16'],
  ['teal-ORNATE',        '2026-10-14', 'high',     'BAC',     'duplicate',   'p16'],
  ['clown-GRUNT',        '2026-10-14', 'medium',   'MISCONF', 'accepted',    'p16'],
  ['celtuce-OBLIVION',   '2026-10-21', 'critical', 'XSS',     'accepted',    'p16'],
  ['nonesuch-SIMPLY',    '2026-10-09', 'high',     'EXPO',    'accepted',    'p16'],
]

/* ─── YesWeHack ─────────────────────────────────────────────────────────
   id | date | severity | cvss | class | status | program | redacted title */
type YwhRow = [string, string, Severity, string, FindingClass, FindingStatus, string, string]

const YESWEHACK: YwhRow[] = [
  ['#11082-68',  '2026-10-08', 'high',     '8.0',  'XSS',       'accepted',    'p18', 'Reflected XSS → account takeover'],
  ['#11082-69',  '2026-10-08', 'high',     '8.1',  'BAC',       'duplicate',   'p18', 'Direct request → sensitive data exposure'],
  ['#11082-57',  '2026-09-11', 'high',     '8.8',  'XSS',       'resolved',    'p18', 'Stored XSS → account takeover'],
  ['#797-95',    '2026-05-24', 'medium',   '5.8',  'EXPO',      'duplicate',   'p20', 'Information disclosure via a JSON:API endpoint'],
  ['#15848-774', '2026-08-31', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'DOM XSS via a URL parameter'],
  ['#15848-740', '2026-08-10', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'XSS via a vendored PDF.js — CVE-2024-4367 → sensitive data exposure'],
  ['#15848-739', '2026-08-10', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'XSS via a vendored PDF.js — CVE-2024-4367'],
  ['#4397-2181', '2026-08-04', 'critical', '10.0', 'TRAVERSAL', 'duplicate',   'p22', 'Path traversal → arbitrary file write'],
  ['#4397-2173', '2026-08-02', 'medium',   '5.3',  'IDOR',      'accepted',    'p22', 'IDOR → media track disclosure'],
  ['#4397-2172', '2026-08-02', 'medium',   '6.1',  'REDIRECT',  'duplicate',   'p22', 'Open redirect via a return-URL parameter'],
  ['#9420-942',  '2026-08-17', 'critical', '9.3',  'INJ',       'duplicate',   'p23', 'Deep-link injection → PII leak'],
  ['#11731-85',  '2026-08-30', 'critical', '9.1',  'IDOR',      'duplicate',   'p24', 'IDOR on an enrolment endpoint'],
  ['#2713-1651', '2026-08-02', 'critical', '9.1',  'INJ',       'duplicate',   'p27', 'SQL injection on a public API'],
  ['#14330-869', '2026-07-12', 'medium',   '5.3',  'LOGIC',     'duplicate',   'p28', 'Business logic flaw → payment manipulation'],
]

export const FINDINGS: Finding[] = [
  ...SIGNALFISHER.map(
    ([id, date, sev, cls, status, prog]): Finding => ({
      id, date, sev, cls, status, prog, platform: 'SignalFisher',
    }),
  ),
  ...YESWEHACK.map(
    ([id, date, sev, cvss, cls, status, prog, title]): Finding => ({
      id, date, sev, cvss, cls, status, prog, title, platform: 'YesWeHack',
    }),
  ),
]

export const group = (f: Finding): StatusGroup => STATUS_META[f.status].group

export const LEDGER_STATS = {
  total: FINDINGS.length,
  programs: new Set(FINDINGS.map((f) => f.prog)).size,
  platforms: new Set(FINDINGS.map((f) => f.platform)).size,
  critical: FINDINGS.filter((f) => f.sev === 'critical').length,
  high: FINDINGS.filter((f) => f.sev === 'high').length,
  validated: FINDINGS.filter((f) => group(f) === 'validated').length,
  duplicate: FINDINGS.filter((f) => group(f) === 'duplicate').length,
  since: FINDINGS.reduce((m, f) => (f.date < m ? f.date : m), '9999'),
}

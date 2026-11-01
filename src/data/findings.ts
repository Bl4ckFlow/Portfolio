// ─── disclosure ledger ──────────────────────────────────────────────────
//
// Every report filed on SignalFisher (Bug Bounty Switzerland) and YesWeHack.
//
// REDACTION POLICY: program names, assets, hostnames and endpoints are NOT in
// this file and must not be added. Several of these reports are still open
// (review / more-info / rtfs), so their targets are unpatched. What ships is
// the shape of the work: class, severity, triage outcome, date. Programs are
// referred to by opaque ids (p01, p02 …) so the program count stays truthful
// without naming anyone.
//
// Rewards are deliberately not tracked here — the ledger shows findings, not money.

export type Severity = 'critical' | 'high' | 'medium' | 'low'

export type FindingClass =
  | 'XSS' | 'BAC' | 'IDOR' | 'AUTH' | 'INJ' | 'EXPO'
  | 'MISCONF' | 'LOGIC' | 'SSRF' | 'REDIRECT' | 'TRAVERSAL'

export type FindingStatus =
  | 'accepted' | 'resolved'                              // validated
  | 'new' | 'review' | 'moreinfo' | 'rtfs'               // still moving
  | 'duplicate'                                          // someone got there first
  | 'informative' | 'invalid' | 'notvuln' | 'outofscope' | 'wontfix'

export type StatusGroup = 'validated' | 'pending' | 'duplicate' | 'closed'

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
  new: { label: 'new', group: 'pending' },
  review: { label: 'under review', group: 'pending' },
  moreinfo: { label: 'need more info', group: 'pending' },
  rtfs: { label: 'rtfs', group: 'pending' },
  duplicate: { label: 'duplicate', group: 'duplicate' },
  informative: { label: 'informative', group: 'closed' },
  invalid: { label: 'invalid', group: 'closed' },
  notvuln: { label: 'intended behaviour', group: 'closed' },
  outofscope: { label: 'out of scope', group: 'closed' },
  wontfix: { label: "won't fix", group: 'closed' },
}

/* ─── SignalFisher · Bug Bounty Switzerland ─────────────────────────────
   id | date | severity | class | status | program */
type SfRow = [string, string, Severity, FindingClass, FindingStatus, string]

const SIGNALFISHER: SfRow[] = [
  ['subtly-VIRTUE',      '2026-10-26', 'high',     'BAC',     'duplicate',   'p01'],
  ['retinal-TZAR',       '2026-10-27', 'medium',   'BAC',     'duplicate',   'p01'],
  ['cupric-FORCIBLE',    '2026-10-27', 'medium',   'BAC',     'new',         'p02'],
  ['neutron-GENOCIDE',   '2026-10-13', 'medium',   'BAC',     'new',         'p02'],
  ['bunk-CHARITY',       '2026-10-27', 'medium',   'BAC',     'invalid',     'p03'],
  ['mycology-CONFLICT',  '2026-10-07', 'medium',   'BAC',     'notvuln',     'p03'],
  ['BURUNDI-mutt',       '2026-10-07', 'medium',   'BAC',     'notvuln',     'p03'],
  ['ambience-IBERIA',    '2026-09-23', 'medium',   'INJ',     'informative', 'p04'],
  ['charge-COUNTY',      '2026-09-15', 'medium',   'BAC',     'duplicate',   'p04'],
  ['taper-CULVERT',      '2026-09-15', 'medium',   'BAC',     'accepted',    'p04'],
  ['vinous-TOURIST',     '2026-09-26', 'high',     'INJ',     'duplicate',   'p04'],
  ['TRIVIUM-sundown',    '2026-10-16', 'medium',   'EXPO',    'invalid',     'p05'],
  ['vibrance-CALLOUS',   '2026-09-21', 'low',      'BAC',     'informative', 'p06'],
  ['WHOOP-tumble',       '2026-09-21', 'medium',   'XSS',     'duplicate',   'p06'],
  ['APART-thai',         '2026-09-25', 'medium',   'EXPO',    'notvuln',     'p07'],
  ['net-CURIA',          '2026-08-12', 'medium',   'MISCONF', 'duplicate',   'p08'],
  ['user-DOORSTEP',      '2026-06-30', 'high',     'INJ',     'invalid',     'p08'],
  ['BING-savagery',      '2026-06-30', 'medium',   'INJ',     'duplicate',   'p08'],
  ['DROVE-migrate',      '2026-10-14', 'high',     'MISCONF', 'invalid',     'p08'],
  ['florida-ONSET',      '2026-08-12', 'high',     'AUTH',    'informative', 'p08'],
  ['VALUE-inverse',      '2026-09-14', 'medium',   'BAC',     'duplicate',   'p09'],
  ['VATIC-tilde',        '2026-09-14', 'medium',   'BAC',     'accepted',    'p09'],
  ['rainbow-CAIMAN',     '2026-09-14', 'medium',   'AUTH',    'outofscope',  'p09'],
  ['paradox-PARIETAL',   '2026-08-26', 'high',     'BAC',     'informative', 'p10'],
  ['FEARFUL-typed',      '2026-08-30', 'high',     'AUTH',    'informative', 'p10'],
  ['GOUGE-ship',         '2026-08-27', 'medium',   'INJ',     'duplicate',   'p10'],
  ['vendee-VIEW',        '2026-08-30', 'high',     'AUTH',    'duplicate',   'p10'],
  ['leafage-TRANQUIL',   '2026-09-15', 'high',     'INJ',     'duplicate',   'p11'],
  ['LAYS-catlike',       '2026-09-15', 'medium',   'INJ',     'duplicate',   'p12'],
  ['crepe-AXIOLOG',      '2026-09-26', 'low',      'BAC',     'review',      'p13'],
  ['DARE-pinnate',       '2026-09-10', 'medium',   'BAC',     'review',      'p13'],
  ['POLTROON-pimiento',  '2026-09-10', 'low',      'MISCONF', 'accepted',    'p13'],
  ['engaging-PARLANCE',  '2026-09-26', 'medium',   'BAC',     'informative', 'p13'],
  ['masthead-NUMINOUS',  '2026-09-26', 'low',      'INJ',     'informative', 'p13'],
  ['fathom-DRAPE',       '2026-09-09', 'medium',   'AUTH',    'invalid',     'p14'],
  ['boxing-REPEL',       '2026-09-29', 'medium',   'BAC',     'informative', 'p15'],
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
  ['hurdle-VIRTUOSA',    '2026-10-07', 'high',     'MISCONF', 'new',         'p17'],
  ['maxim-LANYARD',      '2026-10-07', 'high',     'MISCONF', 'new',         'p17'],
]

/* ─── YesWeHack ─────────────────────────────────────────────────────────
   id | date | severity | cvss | class | status | program | redacted title */
type YwhRow = [string, string, Severity, string, FindingClass, FindingStatus, string, string]

const YESWEHACK: YwhRow[] = [
  ['#11082-88',  '2026-10-24', 'medium',   '5.3',  'LOGIC',     'rtfs',        'p18', 'Business logic flaw → email verification bypass'],
  ['#11082-87',  '2026-10-24', 'medium',   '5.4',  'AUTH',      'review',      'p18', 'Improper authentication → unauthorized account manipulation'],
  ['#11082-86',  '2026-10-24', 'high',     '7.5',  'EXPO',      'review',      'p18', 'Information disclosure → sensitive data exposure'],
  ['#11082-68',  '2026-10-08', 'high',     '8.0',  'XSS',       'accepted',    'p18', 'Reflected XSS → account takeover'],
  ['#11082-69',  '2026-10-08', 'high',     '8.1',  'BAC',       'duplicate',   'p18', 'Direct request → sensitive data exposure'],
  ['#11082-79',  '2026-10-14', 'high',     '8.2',  'XSS',       'informative', 'p18', 'XSS → sensitive data exposure'],
  ['#11082-80',  '2026-10-14', 'high',     '8.3',  'BAC',       'review',      'p18', 'Improper access control → unauthorized account manipulation'],
  ['#11082-57',  '2026-09-11', 'high',     '8.8',  'XSS',       'resolved',    'p18', 'Stored XSS → account takeover'],
  ['#293-280',   '2026-09-02', 'critical', '9.1',  'BAC',       'moreinfo',    'p19', 'Unauthenticated batch-delete endpoint'],
  ['#797-103',   '2026-08-02', 'medium',   '6.1',  'XSS',       'review',      'p20', 'Reflected XSS on a public contact form'],
  ['#797-95',    '2026-05-24', 'medium',   '5.8',  'EXPO',      'duplicate',   'p20', 'Information disclosure via a JSON:API endpoint'],
  ['#15848-774', '2026-08-31', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'DOM XSS via a URL parameter'],
  ['#15848-773', '2026-08-31', 'high',     '8.1',  'XSS',       'invalid',     'p21', 'DOM XSS via redirect parameters'],
  ['#15848-740', '2026-08-10', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'XSS via a vendored PDF.js — CVE-2024-4367 → sensitive data exposure'],
  ['#15848-739', '2026-08-10', 'high',     '8.1',  'XSS',       'duplicate',   'p21', 'XSS via a vendored PDF.js — CVE-2024-4367'],
  ['#4397-2175', '2026-08-03', 'critical', '9.8',  'LOGIC',     'moreinfo',    'p22', 'Business logic flaw → checkout of unavailable stock'],
  ['#4397-2181', '2026-08-04', 'critical', '10.0', 'TRAVERSAL', 'duplicate',   'p22', 'Path traversal → arbitrary file write'],
  ['#4397-2173', '2026-08-02', 'medium',   '5.3',  'IDOR',      'accepted',    'p22', 'IDOR → media track disclosure'],
  ['#4397-2172', '2026-08-02', 'medium',   '6.1',  'REDIRECT',  'duplicate',   'p22', 'Open redirect via a return-URL parameter'],
  ['#9420-942',  '2026-08-17', 'critical', '9.3',  'INJ',       'duplicate',   'p23', 'Deep-link injection → PII leak'],
  ['#9420-941',  '2026-08-17', 'medium',   '4.4',  'BAC',       'informative', 'p23', 'Improper access control in a mobile WebView'],
  ['#11731-85',  '2026-08-30', 'critical', '9.1',  'IDOR',      'duplicate',   'p24', 'IDOR on an enrolment endpoint'],
  ['#174-1231',  '2026-08-27', 'high',     '8.1',  'BAC',       'wontfix',     'p25', 'Improper access control → unauthorized account manipulation'],
  ['#42507-108', '2026-08-03', 'critical', '9.3',  'REDIRECT',  'rtfs',        'p26', 'Open redirect in an OIDC flow → account takeover'],
  ['#42507-48',  '2026-04-25', 'critical', '9.3',  'SSRF',      'rtfs',        'p26', 'SSRF in an OIDC authorization flow'],
  ['#2713-1651', '2026-08-02', 'critical', '9.1',  'INJ',       'duplicate',   'p27', 'SQL injection on a public API'],
  ['#14330-869', '2026-07-12', 'medium',   '5.3',  'LOGIC',     'duplicate',   'p28', 'Business logic flaw → payment manipulation'],
  ['#15629-142', '2026-04-30', 'medium',   '5.8',  'LOGIC',     'informative', 'p29', 'Business logic flaw → authentication bypass'],
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
  pending: FINDINGS.filter((f) => group(f) === 'pending').length,
  duplicate: FINDINGS.filter((f) => group(f) === 'duplicate').length,
  closed: FINDINGS.filter((f) => group(f) === 'closed').length,
  since: FINDINGS.reduce((m, f) => (f.date < m ? f.date : m), '9999'),
}

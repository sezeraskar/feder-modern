export interface Member {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  birthDate: string
  address: string
  occupation: string
  status: 'active' | 'passive'
  boardMember: boolean
  boardBoard?: 1 | 2
  boardTitle?: string
  notes: string
  createdAt: string
  password?: string
}

export interface Due {
  id: string
  memberId: string
  year: number
  amount: number
  paid: boolean
  paidDate: string
  notes: string
}

export interface NewsItem {
  id: number
  category: string
  title: string
  excerpt: string
  date: string
  image?: string | null
}

export interface AboutValue {
  id: string
  iconName: string
  title: string
  description: string
}

export interface HistoryEntry {
  id: string
  year: string
  title: string
  description: string
}

export interface SiteContent {
  // ── Hero & Anasayfa ──────────────────────────────
  heroBadge: string
  heroLine1: string
  heroLine2: string
  heroLine3: string
  heroSubtitle: string
  heroCta1: string
  heroCta2: string
  heroQuote: string
  heroQuoteAuthor: string
  heroQuoteRole: string

  // ── Anasayfa Misyon/Vizyon kartları ──────────────
  homeMissionTitle: string
  homeMissionText: string
  homeVisionTitle: string
  homeVisionText: string
  homeCtaTitle: string
  homeCtaSub: string

  // ── İstatistikler ─────────────────────────────────
  stats: { value: string; label: string }[]

  // ── Haberler / Blog ───────────────────────────────
  news: NewsItem[]

  // ── Hakkımızda ────────────────────────────────────
  aboutHeroSub: string
  aboutFounding1: string
  aboutFounding2: string
  aboutMissionTitle: string
  aboutMission: string
  aboutVisionTitle: string
  aboutVision: string
  aboutValues: AboutValue[]

  // ── Tarihçe ───────────────────────────────────────
  history: HistoryEntry[]

  // ── İletişim ──────────────────────────────────────
  contactAddress: string
  contactPhone: string
  contactEmail: string
  socialTwitter: string
  socialInstagram: string
  socialFacebook: string
  socialYoutube: string
  socialThreads: string
}

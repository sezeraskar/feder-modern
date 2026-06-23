import { useState, useCallback } from 'react'
import type { Member, Due, SiteContent } from './types'
import { SEED_MEMBERS, SEED_DUES } from './seedData'
import { stats, news, historyTimeline, contact } from '../data/content'

export const CONTENT_KEY = 'feder_content'

const KEY = {
  AUTH: 'feder_admin_auth',
  MEMBERS: 'feder_members',
  DUES: 'feder_dues',
  CONTENT: CONTENT_KEY,
}

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, v: unknown) {
  localStorage.setItem(key, JSON.stringify(v))
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36)
}

export const DEFAULT_CONTENT: SiteContent = {
  // Hero
  heroBadge: "Türkiye'nin İlk Taraftar Derneği · 1986",
  heroLine1: 'Fenerbahçe',
  heroLine2: 'Tutkusunu',
  heroLine3: 'Yaşıyoruz',
  heroSubtitle: "1986'dan bu yana bilinçli, eğitimli ve tutkulu Fenerbahçe taraftarı yetiştiriyoruz. Birlik, dayanışma ve saygı değerlerimizle büyümeye devam ediyoruz.",
  heroCta1: 'Hakkımızda',
  heroCta2: 'Son Haberler',
  heroQuote: "Bilgili, yaratıcı, bağımsız ve Fenerbahçe'ye olan tutkusunu hiç yitirmeyen taraftarlar yetiştirmek için çalışıyoruz.",
  heroQuoteAuthor: 'Emre Ersel Sayar',
  heroQuoteRole: 'FeDeR Başkanı',

  // Home cards
  homeMissionTitle: 'Bilinçli Taraftar, Güçlü Kulüp',
  homeMissionText: "Atatürk ilkeleri ve Türk Anayasası çerçevesinde, Fenerbahçe sevgisi ve saygıyla bütün taraftarları birleştirmek; önderlik ve yardımlaşma ruhuyla hareket etmek.",
  homeVisionTitle: 'Birlik, Dayanışma, Tarihsel Değerler',
  homeVisionText: "Taraftarlar arasındaki birlik ve dayanışmayı yükseltmek; kulübün tarihsel değerlerini koruyarak karşılıksız hizmet anlayışı içinde bir kültür oluşturmak.",
  homeCtaTitle: 'FeDeR Ailesine Katılın',
  homeCtaSub: "38 yılı aşkın deneyimimizle Fenerbahçe taraftarlığını en güzel şekilde yaşayın.",

  // Stats
  stats: stats.map(s => ({ ...s })),

  // News
  news: news.map(n => ({ ...n })),

  // About
  aboutHeroSub: "Türkiye'nin ilk taraftar derneği olarak 1986'dan bu yana Fenerbahçe sevgisini, birlik ruhunu ve taraftar kültürünü yaşatıyoruz.",
  aboutFounding1: "FeDeR — Fenerbahçeliler Derneği, 1986 yılında Türkiye'nin ilk resmi taraftar derneği olarak kuruldu. Kuruluşumuzdan bu yana temel amacımız; bilinçli, eğitimli ve Fenerbahçe'ye olan tutkusunu yitirmeyen taraftarlar yetiştirmektir.",
  aboutFounding2: "Derneğimiz, Atatürk ilkeleri ve Türk Anayasası çerçevesinde, tüm Fenerbahçe taraftarlarını sevgi, saygı ve karşılıklı yardım anlayışıyla bir araya getirmeyi amaçlamaktadır.",
  aboutMissionTitle: 'Bilinçli Taraftar, Güçlü Kulüp',
  aboutMission: "Atatürk ilkeleri ve Türk Anayasası çerçevesinde, Fenerbahçe sevgisi ve saygıyla bütün taraftarları birleştirmek; önderlik ve yardımlaşma ruhuyla hareket etmek. Sporda şiddetin önlenmesi ve spor etiğinin geliştirilmesi için öncü çalışmalar yürütmek.",
  aboutVisionTitle: 'Birlik, Dayanışma, Tarihsel Değerler',
  aboutVision: "Taraftarlar arasındaki birlik ve dayanışmayı yükseltmek; kulübün tarihsel değerlerini koruyarak karşılıksız hizmet anlayışı içinde bir kültür oluşturmak ve Fenerbahçe'nin küresel düzeyde en güçlü taraftar örgütü olmak.",
  aboutValues: [
    { id: '1', iconName: 'Shield', title: 'Sporda Şiddetin Önlenmesi', description: 'Spor ortamlarında şiddet ve kötü davranışların önlenmesi için aktif çalışmalar yürütüyoruz.' },
    { id: '2', iconName: 'Users', title: 'Birlik ve Dayanışma', description: 'Tüm Fenerbahçe taraftarlarını ortak bir çatı altında birleştiriyor, dayanışma kültürünü güçlendiriyoruz.' },
    { id: '3', iconName: 'Globe', title: 'Uluslararası Temsil', description: "Football Supporters Europe'un (FSE) kurucu üyesi olarak Türkiye'yi uluslararası arenada temsil ediyoruz." },
    { id: '4', iconName: 'Heart', title: 'Taraftar Kültürü', description: 'Bilinçli, saygılı ve eğitimli taraftar profili oluşturma yolunda sosyal ve kültürel etkinlikler düzenliyoruz.' },
    { id: '5', iconName: 'Award', title: 'Spor Etiği', description: 'Fair play ilkeleri ve spor ahlakının yaygınlaşması için eğitimler ve sempozyumlar organize ediyoruz.' },
    { id: '6', iconName: 'Target', title: 'Liderlik ve Öncülük', description: "Türkiye'nin ilk taraftar derneği olarak sektörde liderlik rolümüzü sürdürüyoruz." },
  ],

  // History
  history: historyTimeline.map((h, i) => ({ ...h, id: String(i + 1) })),

  // Contact
  contactAddress: contact.address,
  contactPhone: contact.phone,
  contactEmail: 'info@feder.org.tr',
  socialTwitter: contact.social.twitter,
  socialInstagram: contact.social.instagram,
  socialFacebook: contact.social.facebook,
  socialYoutube: contact.social.youtube,
  socialThreads: contact.social.threads,
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export function useAdminAuth() {
  const check = () => {
    const v = load<{ ok: boolean; exp: number }>(KEY.AUTH, { ok: false, exp: 0 })
    return v.ok && v.exp > Date.now()
  }
  const [isLoggedIn, setIsLoggedIn] = useState(check)

  const login = useCallback((username: string, password: string): boolean => {
    if (username === 'admin' && password === 'feder2024') {
      save(KEY.AUTH, { ok: true, exp: Date.now() + 8 * 3600 * 1000 })
      setIsLoggedIn(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(KEY.AUTH)
    setIsLoggedIn(false)
  }, [])

  return { isLoggedIn, login, logout }
}

// ── Members ───────────────────────────────────────────────────────────────────
export function useMembers() {
  const [members, setMembers] = useState<Member[]>(() => load(KEY.MEMBERS, SEED_MEMBERS))

  const addMember = useCallback((data: Omit<Member, 'id' | 'createdAt'>) => {
    setMembers(prev => {
      const next = [...prev, { ...data, id: uid(), createdAt: new Date().toISOString() }]
      save(KEY.MEMBERS, next)
      return next
    })
  }, [])

  const updateMember = useCallback((id: string, updates: Partial<Member>) => {
    setMembers(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...updates } : m)
      save(KEY.MEMBERS, next)
      return next
    })
  }, [])

  const deleteMember = useCallback((id: string) => {
    setMembers(prev => {
      const next = prev.filter(m => m.id !== id)
      save(KEY.MEMBERS, next)
      return next
    })
  }, [])

  return { members, addMember, updateMember, deleteMember }
}

// ── Dues ──────────────────────────────────────────────────────────────────────
export function useDues() {
  const [dues, setDues] = useState<Due[]>(() => load(KEY.DUES, SEED_DUES))

  const addDue = useCallback((data: Omit<Due, 'id'>) => {
    setDues(prev => {
      const next = [...prev, { ...data, id: uid() }]
      save(KEY.DUES, next)
      return next
    })
  }, [])

  const updateDue = useCallback((id: string, updates: Partial<Due>) => {
    setDues(prev => {
      const next = prev.map(d => d.id === id ? { ...d, ...updates } : d)
      save(KEY.DUES, next)
      return next
    })
  }, [])

  const deleteDue = useCallback((id: string) => {
    setDues(prev => {
      const next = prev.filter(d => d.id !== id)
      save(KEY.DUES, next)
      return next
    })
  }, [])

  const generateForYear = useCallback((members: Member[], year: number, amount: number) => {
    setDues(prev => {
      const existing = new Set(prev.filter(d => d.year === year).map(d => d.memberId))
      const toAdd: Due[] = members
        .filter(m => m.status === 'active' && !existing.has(m.id))
        .map(m => ({ id: uid(), memberId: m.id, year, amount, paid: false, paidDate: '', notes: '' }))
      const next = [...prev, ...toAdd]
      save(KEY.DUES, next)
      return next
    })
  }, [])

  return { dues, addDue, updateDue, deleteDue, generateForYear }
}

// ── Site Content ──────────────────────────────────────────────────────────────
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = load<Partial<SiteContent>>(KEY.CONTENT, {})
    return { ...DEFAULT_CONTENT, ...saved }
  })

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent(prev => {
      const next = { ...prev, ...updates }
      save(KEY.CONTENT, next)
      return next
    })
  }, [])

  const resetContent = useCallback(() => {
    save(KEY.CONTENT, DEFAULT_CONTENT)
    setContent(DEFAULT_CONTENT)
  }, [])

  return { content, updateContent, resetContent }
}

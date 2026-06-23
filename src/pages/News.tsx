import { useState } from 'react'
import NewsCard from '../components/NewsCard'
import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'
const ALL_CATS = ['Tümü', 'Dernek Haberleri', 'Spor Haberleri', 'Voleybol', 'FeDeR Akademi', 'Duyuru']

export default function News() {
  const c = useContent()
  const [activeCategory, setActiveCategory] = useState('Tümü')

  const filtered = activeCategory === 'Tümü'
    ? c.news
    : c.news.filter(n => n.category === activeCategory)

  return (
    <>
      <section style={{ paddingTop: 128, paddingBottom: 80, background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Güncel</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px,6vw,68px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-1.5px' }}>
            Son <span style={{ color: YELLOW }}>Haberler</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18 }}>FeDeR ve Fenerbahçe dünyasından en son gelişmeler.</p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {ALL_CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 18px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activeCategory === cat ? NAVY : 'white',
                color: activeCategory === cat ? 'white' : '#5A6A9A',
                border: activeCategory === cat ? 'none' : '1px solid #E2E8F5',
                boxShadow: activeCategory === cat ? '0 4px 14px rgba(0,51,153,0.25)' : 'none',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => <NewsCard key={item.id} {...item} index={i} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9AA5C0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📰</div>
              <p>Bu kategoride haber bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

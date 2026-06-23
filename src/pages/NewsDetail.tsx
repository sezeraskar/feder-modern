import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

const CAT_COLORS: Record<string, { text: string; bg: string }> = {
  'Dernek Haberleri': { text: '#003399', bg: 'rgba(0,51,153,0.08)' },
  'Spor Haberleri':   { text: '#0B6B1F', bg: 'rgba(11,107,31,0.08)' },
  'Voleybol':         { text: '#6B0BB5', bg: 'rgba(107,11,181,0.08)' },
  'FeDeR Akademi':    { text: '#B56B00', bg: 'rgba(181,107,0,0.08)' },
  'Duyuru':           { text: '#B58A00', bg: 'rgba(181,138,0,0.10)' },
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const c = useContent()
  const item = c.news.find(n => String(n.id) === id)

  if (!item) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📰</div>
        <h2 style={{ color: '#0D1B52', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Haber bulunamadı</h2>
        <p style={{ color: '#9AA5C0', marginBottom: 24 }}>Aradığınız haber mevcut değil veya kaldırılmış.</p>
        <Link to="/haberler" style={{ color: NAVY, fontWeight: 700, textDecoration: 'none' }}>← Haberlere Dön</Link>
      </div>
    )
  }

  const col = CAT_COLORS[item.category] ?? { text: NAVY, bg: 'rgba(0,51,153,0.08)' }
  const related = c.news.filter(n => n.id !== item.id && n.category === item.category).slice(0, 3)

  return (
    <>
      {/* Hero image */}
      <div style={{
        height: 400,
        background: item.image
          ? `url(${item.image}) center/cover no-repeat`
          : `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
        position: 'relative',
        marginTop: 80,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: YELLOW }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 24px', maxWidth: 900, margin: '0 auto', left: 0, right: 0 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10,
              padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              marginBottom: 20, width: 'fit-content',
            }}
          >
            <ArrowLeft size={15} /> Geri Dön
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: 'rgba(255,255,255,0.15)', color: 'white',
            }}>
              <Tag size={11} /> {item.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Calendar size={12} /> {item.date}
            </span>
          </div>

          <h1 style={{ color: 'white', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
            {item.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          {/* Main content */}
          <article style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: 'white', borderRadius: 20, padding: '36px 40px',
              border: '1px solid #E2E8F5', boxShadow: '0 4px 20px rgba(0,51,153,0.06)',
            }}>
              <p style={{ color: '#3A4A6A', fontSize: 17, lineHeight: 1.85, marginBottom: 24 }}>
                {item.excerpt}
              </p>
              <p style={{ color: '#5A6A9A', fontSize: 15, lineHeight: 1.85, marginBottom: 24 }}>
                Fenerbahçeliler Derneği (FeDeR), Türkiye'nin ilk taraftar derneği olarak 1986'dan bu yana Fenerbahçe sevgisini, birlik ruhunu ve taraftar kültürünü yaşatmaktadır. Bu etkinlik ve gelişme de derneğimizin bu misyonu doğrultusunda hayata geçirilen önemli adımlardan birini oluşturmaktadır.
              </p>
              <p style={{ color: '#5A6A9A', fontSize: 15, lineHeight: 1.85 }}>
                Derneğimiz, tüm Fenerbahçe taraftarlarını birleştirmek ve kulübümüzün tarihi değerlerini gelecek nesillere aktarmak amacıyla çalışmalarını sürdürmektedir. Üyelerimizin ve taraftarlarımızın desteğiyle bu güzel yolculuk devam etmektedir.
              </p>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #F0F3FA', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#9AA5C0', fontSize: 13 }}>Kategori:</span>
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  color: col.text, background: col.bg,
                }}>{item.category}</span>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <h3 style={{ color: '#0D1B52', fontWeight: 800, fontSize: 18, marginBottom: 20 }}>İlgili Haberler</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {related.map(r => (
                    <Link key={r.id} to={`/haberler/${r.id}`} style={{
                      display: 'flex', gap: 16, background: 'white',
                      border: '1px solid #E2E8F5', borderRadius: 16, overflow: 'hidden',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,51,153,0.2)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,51,153,0.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F5'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      {r.image && (
                        <div style={{ width: 120, flexShrink: 0, background: `url(${r.image}) center/cover` }} />
                      )}
                      <div style={{ padding: '14px 16px', flex: 1, minWidth: 0 }}>
                        <div style={{ color: '#9AA5C0', fontSize: 11, marginBottom: 6 }}>{r.date}</div>
                        <div style={{ color: '#0D1B52', fontWeight: 700, fontSize: 14, lineHeight: 1.4 }}>{r.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/haberler" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', background: NAVY, color: 'white',
            fontWeight: 700, fontSize: 14, borderRadius: 12, textDecoration: 'none',
          }}>
            <ArrowLeft size={16} /> Tüm Haberlere Dön
          </Link>
        </div>
      </div>
    </>
  )
}

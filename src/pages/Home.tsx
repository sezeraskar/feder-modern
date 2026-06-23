import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Award, Heart, ChevronDown } from 'lucide-react'
import NewsCard from '../components/NewsCard'
import SectionHeader from '../components/SectionHeader'
import HeroParticles from '../components/HeroParticles'
import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'


export default function Home() {
  const c = useContent()
  const news = useMemo(() => c.news.slice(0, 6), [c.news])

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(145deg, #001F6B 0%, #003399 45%, #0044CC 100%)`,
      }}>
        {/* ── Animated background ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>

          {/* Bold floating blobs */}
          <div className="hero-blob-1" style={{
            position: 'absolute', top: '-20%', right: '-15%',
            width: 800, height: 800, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,205,0,0.22) 0%, transparent 60%)',
            filter: 'blur(25px)',
          }} />
          <div className="hero-blob-2" style={{
            position: 'absolute', bottom: '-25%', left: '-15%',
            width: 750, height: 750, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,100,255,0.45) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }} />
          <div className="hero-blob-3" style={{
            position: 'absolute', top: '20%', left: '30%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,205,0,0.14) 0%, transparent 60%)',
            filter: 'blur(35px)',
          }} />
          <div className="hero-blob-2" style={{
            position: 'absolute', top: '-5%', left: '-8%',
            width: 450, height: 450, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,140,255,0.3) 0%, transparent 60%)',
            filter: 'blur(25px)',
            animationDelay: '-5s',
          }} />
          <div className="hero-blob-1" style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: 380, height: 380, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,205,0,0.18) 0%, transparent 60%)',
            filter: 'blur(20px)',
            animationDelay: '-3s',
          }} />

          {/* Rotating ring */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 700, height: 700, borderRadius: '50%',
            border: '1px solid rgba(255,205,0,0.08)',
            transform: 'translate(-50%, -50%)',
            animation: 'blob3 25s linear infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 1000, height: 1000, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
            transform: 'translate(-50%, -50%)',
            animation: 'blob1 35s linear infinite reverse',
          }} />

          {/* Pulsing grid */}
          <div className="hero-grid" style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Canvas particle network */}
          <HeroParticles count={75} />

          {/* Scrolling wave */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, overflow: 'hidden' }}>
            <svg className="hero-wave" style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%' }}
              viewBox="0 0 2880 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,45 C360,90 720,0 1080,45 C1440,90 1800,0 2160,45 C2520,90 2880,0 2880,45 L2880,90 L0,90 Z"
                fill="rgba(255,255,255,0.05)" />
            </svg>
          </div>

          {/* Yellow stripe */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: YELLOW }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '96px 24px 80px', textAlign: 'center' }}>
          <div className="animate-fadeIn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,205,0,0.12)', border: `1px solid rgba(255,205,0,0.3)`, borderRadius: 100, padding: '6px 18px', marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 13, fontWeight: 600 }}>{c.heroBadge}</span>
          </div>

          <h1 className="animate-fadeInUp" style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, color: 'white', lineHeight: 0.95, letterSpacing: '-2px', marginBottom: 28 }}>
            {c.heroLine1}<br />
            <span style={{ color: YELLOW }}>{c.heroLine2}</span><br />
            {c.heroLine3}
          </h1>

          <p className="animate-fadeInUp delay-200" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
            {c.heroSubtitle}
          </p>

          <div className="animate-fadeInUp delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link to="/hakkimizda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: YELLOW, color: NAVY_DARK, fontWeight: 800, fontSize: 15, borderRadius: 14, textDecoration: 'none', boxShadow: `0 8px 28px rgba(255,205,0,0.35)` }}>
              {c.heroCta1} <ArrowRight size={18} />
            </Link>
            <Link to="/haberler" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: 15, borderRadius: 14, textDecoration: 'none' }}>
              {c.heroCta2}
            </Link>
          </div>

          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)' }} className="animate-bounce">
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '56px 0', backgroundColor: 'white', borderBottom: '1px solid #E2E8F5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {c.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, color: NAVY, marginBottom: 6 }}>{stat.value}</div>
                <div style={{ color: '#5A6A9A', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader tag="Biz Kimiz" title="Türkiye'nin İlk " highlight="Taraftar Derneği" subtitle="1986 yılında kurulan FeDeR, bilinçli ve eğitimli Fenerbahçe taraftarı yetiştirme misyonuyla Türkiye'nin ilk resmi taraftar derneğidir." />
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <Shield size={18} />, text: 'Sporda şiddetin önlenmesi için öncü çalışmalar' },
                  { icon: <Users size={18} />, text: 'Taraftarlar arasında birlik ve dayanışma' },
                  { icon: <Award size={18} />, text: 'Football Supporters Europe kurucu üyesi' },
                  { icon: <Heart size={18} />, text: 'Sosyal ve kültürel etkinlikler' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', backgroundColor: 'white', border: '1px solid #E2E8F5', borderRadius: 14, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,51,153,0.2)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,51,153,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F5'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ color: NAVY, flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ color: '#3A4A6A', fontSize: 14 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/hakkimizda" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, color: NAVY, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Daha Fazla Bilgi <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quote card */}
            <div style={{ position: 'relative' }}>
              <div style={{ background: `linear-gradient(145deg, ${NAVY} 0%, ${NAVY_DARK} 100%)`, borderRadius: 28, padding: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,51,153,0.25)' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, backgroundColor: YELLOW }} />
                <div style={{ width: 64, height: 64, borderRadius: 16, background: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 24px rgba(255,205,0,0.4)' }}>
                  <span style={{ color: NAVY_DARK, fontWeight: 900, fontSize: 22 }}>FB</span>
                </div>
                <blockquote style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, fontStyle: 'italic', lineHeight: 1.7, marginBottom: 28 }}>
                  "{c.heroQuote}"
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,205,0,0.15)', border: `2px solid ${YELLOW}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: YELLOW, fontWeight: 700, fontSize: 12 }}>
                      {c.heroQuoteAuthor.split(' ').map(n => n[0]).join('').slice(0, 3)}
                    </span>
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{c.heroQuoteAuthor}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{c.heroQuoteRole}</div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: -20, left: -20, background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '14px 20px', boxShadow: '0 8px 32px rgba(0,51,153,0.12)' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: NAVY }}>1986</div>
                <div style={{ color: '#9AA5C0', fontSize: 12 }}>Kuruluş Yılı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section style={{ padding: '80px 0', backgroundColor: '#F0F3FA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
            <SectionHeader tag="Güncel" title="Son " highlight="Haberler" />
            <Link to="/haberler" style={{ display: 'flex', alignItems: 'center', gap: 6, color: NAVY, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Tümü <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => <NewsCard key={item.id} {...item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionHeader tag="Değerlerimiz" title="Misyon & " highlight="Vizyon" center />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div style={{ background: `linear-gradient(145deg, ${NAVY} 0%, ${NAVY_DARK} 100%)`, borderRadius: 24, padding: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,51,153,0.2)' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
              <p style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Misyon</p>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{c.homeMissionTitle}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: 15 }}>{c.homeMissionText}</p>
            </div>
            <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 24, padding: '40px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,51,153,0.06)' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${NAVY}, #0044CC)` }} />
              <p style={{ color: NAVY, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Vizyon</p>
              <h3 style={{ color: '#0D1B52', fontSize: 22, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{c.homeVisionTitle}</h3>
              <p style={{ color: '#5A6A9A', lineHeight: 1.75, fontSize: 15 }}>{c.homeVisionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '24px 0 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: YELLOW, borderRadius: 28, padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(255,205,0,0.3)' }}>
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, color: NAVY_DARK, marginBottom: 12 }}>{c.homeCtaTitle}</h2>
              <p style={{ color: 'rgba(0,31,107,0.65)', fontSize: 17, marginBottom: 32 }}>{c.homeCtaSub}</p>
              <Link to="/uye-ol" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: NAVY_DARK, color: 'white', fontWeight: 800, fontSize: 15, borderRadius: 14, textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,31,107,0.3)' }}>
                Üye Ol <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

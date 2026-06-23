import { Shield, Users, Globe, Heart, Award, Target, Star, Zap } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield size={22} />, Users: <Users size={22} />, Globe: <Globe size={22} />,
  Heart: <Heart size={22} />, Award: <Award size={22} />, Target: <Target size={22} />,
  Star: <Star size={22} />, Zap: <Zap size={22} />,
}

export default function About() {
  const c = useContent()

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 80, background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
              <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Hakkımızda</span>
            </div>
            <h1 style={{ fontSize: 'clamp(44px,6vw,72px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 20, letterSpacing: '-1.5px' }}>
              Biz <span style={{ color: YELLOW }}>FeDeR</span>'iz
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7 }}>{c.aboutHeroSub}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Founding */}
              <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
                <h2 style={{ color: '#0D1B52', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Kuruluş Hikayemiz</h2>
                <p style={{ color: '#5A6A9A', lineHeight: 1.75, fontSize: 15, marginBottom: 12 }}>{c.aboutFounding1}</p>
                <p style={{ color: '#5A6A9A', lineHeight: 1.75, fontSize: 15 }}>{c.aboutFounding2}</p>
              </div>
              {/* Mission */}
              <div style={{ background: `linear-gradient(145deg, ${NAVY}, ${NAVY_DARK})`, border: 'none', borderRadius: 20, padding: '28px 32px', boxShadow: '0 12px 36px rgba(0,51,153,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: YELLOW }} />
                <h2 style={{ color: YELLOW, fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{c.aboutMissionTitle}</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, fontSize: 15 }}>{c.aboutMission}</p>
              </div>
              {/* Vision */}
              <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
                <h2 style={{ color: NAVY, fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{c.aboutVisionTitle}</h2>
                <p style={{ color: '#5A6A9A', lineHeight: 1.75, fontSize: 15 }}>{c.aboutVision}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: `linear-gradient(145deg, ${NAVY}, ${NAVY_DARK})`, borderRadius: 24, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,51,153,0.25)' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
                <div style={{ width: 72, height: 72, borderRadius: 20, background: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(255,205,0,0.4)' }}>
                  <span style={{ color: NAVY_DARK, fontWeight: 900, fontSize: 24 }}>FB</span>
                </div>
                <div style={{ fontSize: 64, fontWeight: 900, color: YELLOW, lineHeight: 1 }}>1986</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: 15 }}>Kuruluş Yılı</div>
                <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', margin: '20px auto' }} />
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7 }}>
                  Türkiye'nin ilk taraftar derneği olma unvanıyla 38 yılı aşkın süredir kesintisiz hizmet veriyoruz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ value: 'FSE', label: 'Kurucu Üye' }, { value: '38+', label: 'Yıl Deneyim' }, { value: '30', label: 'Yönetim Üyesi' }, { value: '#1', label: 'Türkiye' }].map((item, i) => (
                  <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,51,153,0.05)' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 4 }}>{item.value}</div>
                    <div style={{ color: '#9AA5C0', fontSize: 12 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0', backgroundColor: '#F0F3FA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionHeader tag="Değerlerimiz" title="Neler " highlight="Yapıyoruz" subtitle="Derneğimizin temel faaliyet alanları ve çalışma prensipleri" center />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.aboutValues.map((item, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '28px', transition: 'all 0.25s', boxShadow: '0 2px 10px rgba(0,51,153,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,51,153,0.04)'; e.currentTarget.style.borderColor = '#E2E8F5'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,51,153,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: NAVY, marginBottom: 20 }}>
                  {ICON_MAP[item.iconName] ?? <Star size={22} />}
                </div>
                <h3 style={{ color: '#0D1B52', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: '#5A6A9A', fontSize: 14, lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

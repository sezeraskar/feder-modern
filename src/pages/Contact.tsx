import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'
import { TwitterIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from '../components/SocialIcons'
import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

export default function Contact() {
  const c = useContent()

  return (
    <>
      <section style={{ paddingTop: 128, paddingBottom: 80, background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Bize Ulaşın</span>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
          </div>
          <h1 style={{ fontSize: 'clamp(40px,6vw,68px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-1.5px' }}>
            İleti<span style={{ color: YELLOW }}>şim</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7 }}>
            Sorularınız, önerileriniz veya üyelik başvurusu için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

          {/* Contact cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <MapPin size={22} />,
                title: 'Adres',
                content: c.contactAddress,
                extra: <a href={`https://maps.google.com/?q=${encodeURIComponent(c.contactAddress)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 14, color: NAVY, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  Haritada Gör <ExternalLink size={13} />
                </a>
              },
              {
                icon: <Phone size={22} />,
                title: 'Telefon',
                content: <a href={`tel:${c.contactPhone.replace(/\s/g, '')}`} style={{ color: '#3A4A6A', textDecoration: 'none' }}>{c.contactPhone}</a>,
                extra: <p style={{ marginTop: 6, color: '#9AA5C0', fontSize: 12 }}>Hafta içi 09:00 - 18:00</p>
              },
              {
                icon: <Mail size={22} />,
                title: 'E-posta',
                content: <a href={`mailto:${c.contactEmail}`} style={{ color: '#3A4A6A', textDecoration: 'none' }}>{c.contactEmail || '—'}</a>,
                extra: <p style={{ marginTop: 6, color: '#9AA5C0', fontSize: 12 }}>7/24 yanıt</p>
              },
            ].map((card, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '28px', boxShadow: '0 2px 12px rgba(0,51,153,0.05)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,51,153,0.05)'; e.currentTarget.style.borderColor = '#E2E8F5' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(0,51,153,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: NAVY, marginBottom: 20 }}>
                  {card.icon}
                </div>
                <h3 style={{ color: '#0D1B52', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{card.title}</h3>
                <div style={{ color: '#5A6A9A', fontSize: 14, lineHeight: 1.65 }}>{card.content}</div>
                {card.extra}
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, borderRadius: 24, padding: '32px 36px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: YELLOW }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,205,0,0.15)', border: '1px solid rgba(255,205,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: YELLOW }}>
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: 17 }}>Sosyal Medya</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Bizi takip edin</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <TwitterIcon size={20} />, label: 'Twitter / X', href: c.socialTwitter },
                { icon: <InstagramIcon size={20} />, label: 'Instagram', href: c.socialInstagram },
                { icon: <FacebookIcon size={20} />, label: 'Facebook', href: c.socialFacebook },
                { icon: <YoutubeIcon size={20} />, label: 'YouTube', href: c.socialYoutube },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,205,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,205,0,0.3)'; e.currentTarget.style.color = YELLOW }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 24, padding: '36px', boxShadow: '0 4px 20px rgba(0,51,153,0.06)' }}>
            <h3 style={{ color: '#0D1B52', fontWeight: 800, fontSize: 20, marginBottom: 28 }}>Mesaj Gönder</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={e => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                {[{ label: 'Ad Soyad', type: 'text', ph: 'Adınız Soyadınız' }, { label: 'E-posta', type: 'email', ph: 'email@example.com' }].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} style={{ width: '100%', background: '#F5F7FC', border: '1px solid #E2E8F5', borderRadius: 12, padding: '12px 16px', color: '#0D1B52', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = NAVY}
                      onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Konu</label>
                <input type="text" placeholder="Mesajınızın konusu" style={{ width: '100%', background: '#F5F7FC', border: '1px solid #E2E8F5', borderRadius: 12, padding: '12px 16px', color: '#0D1B52', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }}
                  onFocus={e => e.target.style.borderColor = NAVY}
                  onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Mesaj</label>
                <textarea rows={5} placeholder="Mesajınızı buraya yazın..." style={{ width: '100%', background: '#F5F7FC', border: '1px solid #E2E8F5', borderRadius: 12, padding: '12px 16px', color: '#0D1B52', fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box' as const }}
                  onFocus={e => e.target.style.borderColor = NAVY}
                  onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <button type="submit" style={{ padding: '13px 36px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`, color: 'white', fontWeight: 800, fontSize: 14, borderRadius: 12, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,51,153,0.3)' }}>
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

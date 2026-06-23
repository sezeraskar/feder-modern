import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { navLinks, contact } from '../data/content'
import { TwitterIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons'
import logo from '../assets/logo.png'

const YELLOW = '#FFCD00'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1B52', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, textDecoration: 'none' }}>
              <img src={logo} alt="FeDeR Logo" style={{ width: 48, height: 48, objectFit: 'contain' }} />
              <div>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 22 }}>
                  Fe<span style={{ color: YELLOW }}>De</span>R
                </span>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Fenerbahçeliler Derneği</p>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, maxWidth: 300, marginBottom: 24 }}>
              Türkiye'nin ilk taraftar derneği. 1986'dan bu yana bilinçli ve eğitimli Fenerbahçe taraftarı yetiştirme misyonuyla hizmet veriyoruz.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: <TwitterIcon size={16} />, href: contact.social.twitter, label: 'Twitter' },
                { icon: <InstagramIcon size={16} />, href: contact.social.instagram, label: 'Instagram' },
                { icon: <FacebookIcon size={16} />, href: contact.social.facebook, label: 'Facebook' },
                { icon: <YoutubeIcon size={16} />, href: contact.social.youtube, label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: '1px solid rgba(255,205,0,0.2)',
                    backgroundColor: 'rgba(255,205,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.color = YELLOW
                    el.style.borderColor = 'rgba(255,205,0,0.5)'
                    el.style.backgroundColor = 'rgba(255,205,0,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.color = 'rgba(255,255,255,0.5)'
                    el.style.borderColor = 'rgba(255,205,0,0.2)'
                    el.style.backgroundColor = 'rgba(255,205,0,0.05)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Sayfalar</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = YELLOW)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>İletişim</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: YELLOW, marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{contact.address}</span>
              </li>
              <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={16} style={{ color: YELLOW, flexShrink: 0 }} />
                <a href={`tel:${contact.phone}`} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none' }}>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
            © 2023 FeDeR — Fenerbahçeliler Derneği. Tüm hakları saklıdır.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Gizlilik Politikası', 'KVKK', 'Çerez Politikası'].map(t => (
              <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

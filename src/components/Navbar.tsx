import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { navLinks } from '../data/content'
import { getMemberSession } from '../hooks/useMemberAuth'
import logo from '../assets/logo.png'

const NAVY = '#003399'
const YELLOW = '#FFCD00'
const MEMBERS_KEY = 'feder_members'

function useIsDesktop() {
  const [d, setD] = useState(() => window.innerWidth >= 768)
  useEffect(() => {
    const fn = () => setD(window.innerWidth >= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return d
}

function getMemberName(memberId: string): string {
  try {
    const members = JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]')
    const m = members.find((x: { id: string; name: string }) => x.id === memberId)
    return m ? m.name.split(' ')[0] : 'Profilim'
  } catch { return 'Profilim' }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [session, setSession] = useState(() => getMemberSession())
  const location = useLocation()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    // Re-check session on every navigation
    setSession(getMemberSession())
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('feder_member_session')
    setSession(null)
    navigate('/')
  }

  const memberName = session ? getMemberName(session.memberId) : null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid #E2E8F5' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 24px rgba(0,51,153,0.08)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <img src={logo} alt="FeDeR Logo" style={{ width: 42, height: 42, objectFit: 'contain' }} />
            <div>
              <span style={{ color: NAVY, fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px', display: 'block', lineHeight: 1.1 }}>
                Fe<span style={{ color: YELLOW }}>De</span>R
              </span>
              <span style={{ color: '#9AA5C0', fontSize: 10, display: 'block' }}>Fenerbahçeliler Derneği</span>
            </div>
          </Link>

          {/* Desktop nav */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navLinks.map(link => {
                const active = location.pathname === link.href
                return (
                  <Link key={link.href} to={link.href} style={{
                    padding: '8px 14px', fontSize: 14, fontWeight: 500, borderRadius: 10,
                    color: active ? NAVY : '#5A6A9A',
                    backgroundColor: active ? 'rgba(0,51,153,0.07)' : 'transparent',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}>
                    {link.label}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isDesktop && (
              session ? (
                <>
                  <Link to="/profilim" style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '9px 16px',
                    background: 'rgba(0,51,153,0.07)', border: '1px solid rgba(0,51,153,0.12)',
                    borderRadius: 11, color: NAVY, fontSize: 13, fontWeight: 600,
                    textDecoration: 'none',
                  }}>
                    <User size={15} /> {memberName}
                  </Link>
                  <button onClick={handleLogout} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '9px 14px', background: 'none',
                    border: '1px solid #E2E8F5', borderRadius: 11,
                    color: '#9AA5C0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>
                    <LogOut size={15} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/giris" style={{
                    padding: '9px 16px',
                    background: 'rgba(0,51,153,0.07)', border: '1px solid rgba(0,51,153,0.12)',
                    borderRadius: 11, color: NAVY, fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  }}>
                    Giriş Yap
                  </Link>
                  <Link to="/uye-ol" style={{
                    padding: '9px 20px',
                    background: `linear-gradient(135deg, ${NAVY} 0%, #0044CC 100%)`,
                    color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 11,
                    textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
                  }}>
                    Üye Ol
                  </Link>
                </>
              )
            )}

            {/* Hamburger — only on mobile */}
            {!isDesktop && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(0,51,153,0.07)', border: '1px solid rgba(0,51,153,0.12)',
                  color: NAVY, cursor: 'pointer',
                }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {!isDesktop && (
        <div style={{
          maxHeight: isOpen ? 600 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          backgroundColor: 'white',
          borderTop: isOpen ? '1px solid #E2E8F5' : 'none',
        }}>
          <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(link => {
              const active = location.pathname === link.href
              return (
                <Link key={link.href} to={link.href} style={{
                  padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 500,
                  color: active ? NAVY : '#5A6A9A',
                  backgroundColor: active ? 'rgba(0,51,153,0.07)' : 'transparent',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </Link>
              )
            })}
            <div style={{ height: 1, background: '#F0F3FA', margin: '8px 0' }} />
            {session ? (
              <>
                <Link to="/profilim" style={{ padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <User size={16} /> {memberName}
                </Link>
                <button onClick={handleLogout} style={{ padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#DC2626', background: 'rgba(220,38,38,0.05)', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LogOut size={16} /> Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link to="/giris" style={{ padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: NAVY, textDecoration: 'none' }}>
                  Giriş Yap
                </Link>
                <Link to="/uye-ol" style={{ padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, textAlign: 'center', background: `linear-gradient(135deg, ${NAVY}, #0044CC)`, color: 'white', textDecoration: 'none' }}>
                  Üye Ol
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

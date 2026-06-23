import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'

const NAVY = '#003399'
const YELLOW = '#FFCD00'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #E2E8F5' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,51,153,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${NAVY} 0%, #001F6B 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  backgroundColor: YELLOW,
                }}
              />
              <span style={{ color: 'white', fontWeight: 900, fontSize: 13, position: 'relative', zIndex: 1 }}>FB</span>
            </div>
            <div>
              <span style={{ color: NAVY, fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>
                Fe<span style={{ color: YELLOW }}>De</span>R
              </span>
              <p style={{ color: '#5A6A9A', fontSize: 11, lineHeight: 1 }}>Fenerbahçeliler Derneği</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 500,
                    borderRadius: 10,
                    color: isActive ? NAVY : '#5A6A9A',
                    backgroundColor: isActive ? 'rgba(0,51,153,0.07)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/iletisim"
              style={{
                padding: '10px 22px',
                background: `linear-gradient(135deg, ${NAVY} 0%, #0044CC 100%)`,
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 12,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,51,153,0.3)',
                transition: 'all 0.2s',
              }}
            >
              Üye Ol
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              padding: 8,
              borderRadius: 10,
              color: NAVY,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            className="md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          maxHeight: isOpen ? 500 : 0,
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          backgroundColor: 'white',
          borderTop: '1px solid #E2E8F5',
        }}
        className="md:hidden"
      >
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? NAVY : '#5A6A9A',
                  backgroundColor: isActive ? 'rgba(0,51,153,0.07)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            to="/iletisim"
            style={{
              marginTop: 8,
              padding: '12px 16px',
              background: `linear-gradient(135deg, ${NAVY} 0%, #0044CC 100%)`,
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 12,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Üye Ol
          </Link>
        </div>
      </div>
    </nav>
  )
}

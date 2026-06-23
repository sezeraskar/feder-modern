import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, DollarSign, LogOut,
  Menu, X, ExternalLink, ChevronRight,
  Home, Newspaper, Info, Clock, Phone,
} from 'lucide-react'
import { useAdminAuth } from './store'
import logo from '../assets/logo.png'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Dues from './pages/Dues'
import HeroEditor from './pages/HeroEditor'
import NewsEditor from './pages/NewsEditor'
import AboutEditor from './pages/AboutEditor'
import HistoryEditor from './pages/HistoryEditor'
import ContactEditor from './pages/ContactEditor'

const SIDEBAR_BG = '#0D1B52'
const NAVY = '#003399'
const YELLOW = '#FFCD00'
const SIDEBAR_W = 252

const SITE_NAV = [
  { path: '/admin/site/hero',       label: 'Anasayfa & Hero',  icon: <Home size={16} /> },
  { path: '/admin/site/haberler',   label: 'Haberler & Blog',  icon: <Newspaper size={16} /> },
  { path: '/admin/site/hakkimizda', label: 'Hakkımızda',       icon: <Info size={16} /> },
  { path: '/admin/site/tarihce',    label: 'Tarihçe',          icon: <Clock size={16} /> },
  { path: '/admin/site/iletisim',   label: 'İletişim',         icon: <Phone size={16} /> },
]

const MEMBER_NAV = [
  { path: '/admin/uyeler',   label: 'Üye Listesi',  icon: <Users size={16} /> },
  { path: '/admin/aidatlar', label: 'Aidat Takibi', icon: <DollarSign size={16} /> },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)
  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isDesktop
}

function NavSection({ title, items, pathname, onClose }: {
  title: string
  items: { path: string; label: string; icon: React.ReactNode }[]
  pathname: string
  onClose: () => void
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      <p style={{
        color: 'rgba(255,255,255,0.28)', fontSize: 10, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        padding: '14px 12px 6px',
      }}>{title}</p>
      {items.map(item => {
        const active = pathname.startsWith(item.path)
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '10px 12px', borderRadius: 10, marginBottom: 2,
              textDecoration: 'none', transition: 'all 0.15s',
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: active ? 'white' : 'rgba(255,255,255,0.52)',
              borderLeft: `3px solid ${active ? YELLOW : 'transparent'}`,
              fontWeight: active ? 700 : 400,
              fontSize: 13.5,
            }}
          >
            <span style={{ color: active ? YELLOW : 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
              {item.icon}
            </span>
            {item.label}
            {active && <ChevronRight size={13} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)' }} />}
          </Link>
        )
      })}
    </div>
  )
}

function Sidebar({ open, isDesktop, onClose, logout }: {
  open: boolean; isDesktop: boolean; onClose: () => void; logout: () => void
}) {
  const { pathname } = useLocation()
  const visible = isDesktop || open

  return (
    <>
      {/* Mobile overlay */}
      {open && !isDesktop && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 39, background: 'rgba(0,0,0,0.55)' }}
        />
      )}

      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        width: SIDEBAR_W,
        background: SIDEBAR_BG,
        display: 'flex', flexDirection: 'column',
        transform: visible ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
        transition: 'transform 0.25s ease',
        boxShadow: visible ? '4px 0 32px rgba(0,0,0,0.25)' : 'none',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
              <img src={logo} alt="FeDeR Logo" style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }} />
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 15 }}>
                  Fe<span style={{ color: YELLOW }}>De</span>R
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>Admin Panel</div>
              </div>
            </Link>
            {!isDesktop && (
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8,
                padding: 6, color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              }}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Dashboard */}
        <div style={{ padding: '10px 12px 0' }}>
          {(() => {
            const active = pathname === '/admin'
            return (
              <Link to="/admin" onClick={onClose} style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 10,
                textDecoration: 'none', transition: 'all 0.15s',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? 'white' : 'rgba(255,255,255,0.52)',
                borderLeft: `3px solid ${active ? YELLOW : 'transparent'}`,
                fontWeight: active ? 700 : 400, fontSize: 13.5,
              }}>
                <LayoutDashboard size={16} style={{ color: active ? YELLOW : 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
                Dashboard
                {active && <ChevronRight size={13} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)' }} />}
              </Link>
            )
          })()}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
          <NavSection title="🌐 Websitesi Ayarları" items={SITE_NAV} pathname={pathname} onClose={onClose} />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '6px 0' }} />
          <NavSection title="👥 Üye İşlemleri" items={MEMBER_NAV} pathname={pathname} onClose={onClose} />
        </nav>

        {/* Bottom */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
            color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 2,
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}
          >
            <ExternalLink size={14} /> Siteye Git
          </a>
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: 9, width: '100%',
            padding: '9px 12px', borderRadius: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'left',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FCA5A5'; e.currentTarget.style.background = 'rgba(220,38,38,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}
          >
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  )
}

function TopBar({ onMenuClick, isDesktop }: { onMenuClick: () => void; isDesktop: boolean }) {
  const { pathname } = useLocation()

  const pageTitle = (() => {
    if (pathname === '/admin') return 'Dashboard'
    return [...SITE_NAV, ...MEMBER_NAV].find(n => pathname.startsWith(n.path))?.label ?? 'Admin Panel'
  })()

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(245,247,252,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E8F5',
      padding: '0 24px',
      height: 62,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      {!isDesktop && (
        <button onClick={onMenuClick} style={{
          padding: 8, background: 'white', border: '1px solid #E2E8F5',
          borderRadius: 10, cursor: 'pointer', color: '#5A6A9A', flexShrink: 0,
        }}>
          <Menu size={18} />
        </button>
      )}
      <h2 style={{ flex: 1, color: '#0D1B52', fontSize: 17, fontWeight: 800 }}>{pageTitle}</h2>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9,
        background: 'white', border: '1px solid #E2E8F5',
        borderRadius: 12, padding: '7px 14px', flexShrink: 0,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: `linear-gradient(135deg, ${SIDEBAR_BG}, ${NAVY})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: YELLOW, fontWeight: 800, fontSize: 10,
        }}>A</div>
        <span style={{ color: '#0D1B52', fontSize: 13, fontWeight: 600 }}>Admin</span>
      </div>
    </header>
  )
}

export default function AdminLayout() {
  const { isLoggedIn, login, logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useIsDesktop()

  if (!isLoggedIn) return <Login onLogin={login} />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7FC' }}>
      <Sidebar
        open={sidebarOpen}
        isDesktop={isDesktop}
        onClose={() => setSidebarOpen(false)}
        logout={logout}
      />

      {/* Main — push right when sidebar visible */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        marginLeft: isDesktop ? SIDEBAR_W : 0,
        transition: 'margin-left 0.25s ease',
      }}>
        <TopBar onMenuClick={() => setSidebarOpen(true)} isDesktop={isDesktop} />
        <div style={{ flex: 1, padding: '28px 24px', maxWidth: 1100, width: '100%' }}>
          <Routes>
            <Route path="/"                element={<Dashboard />} />
            <Route path="/site/hero"       element={<HeroEditor />} />
            <Route path="/site/haberler"   element={<NewsEditor />} />
            <Route path="/site/hakkimizda" element={<AboutEditor />} />
            <Route path="/site/tarihce"    element={<HistoryEditor />} />
            <Route path="/site/iletisim"   element={<ContactEditor />} />
            <Route path="/uyeler"          element={<Members />} />
            <Route path="/aidatlar"        element={<Dues />} />
            <Route path="*"                element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

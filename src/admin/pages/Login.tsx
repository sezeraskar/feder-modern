import { useState } from 'react'
import type { FormEvent } from 'react'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

interface LoginProps {
  onLogin: (username: string, password: string) => boolean
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 350))
    const ok = onLogin(username, password)
    setLoading(false)
    if (!ok) setError('Kullanıcı adı veya şifre hatalı.')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -120, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,205,0,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: YELLOW }} />

      <div style={{
        width: '100%', maxWidth: 420,
        background: 'white', borderRadius: 24,
        padding: '44px 40px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', backgroundColor: YELLOW }} />
            <span style={{ color: 'white', fontWeight: 900, fontSize: 18, position: 'relative', zIndex: 1 }}>FB</span>
          </div>
          <h1 style={{ color: NAVY_DARK, fontSize: 22, fontWeight: 900, marginBottom: 4 }}>FeDeR Admin</h1>
          <p style={{ color: '#9AA5C0', fontSize: 14 }}>Yönetim Paneline Giriş</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
              style={{
                width: '100%', padding: '12px 16px',
                background: '#F5F7FC', border: `2px solid ${error ? '#FECACA' : '#E2E8F5'}`,
                borderRadius: 12, fontSize: 15, color: NAVY_DARK,
                outline: 'none', transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = NAVY}
              onBlur={e => e.target.style.borderColor = error ? '#FECACA' : '#E2E8F5'}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              style={{
                width: '100%', padding: '12px 16px',
                background: '#F5F7FC', border: `2px solid ${error ? '#FECACA' : '#E2E8F5'}`,
                borderRadius: 12, fontSize: 15, color: NAVY_DARK,
                outline: 'none', transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = NAVY}
              onBlur={e => e.target.style.borderColor = error ? '#FECACA' : '#E2E8F5'}
            />
          </div>

          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: 10, padding: '10px 14px',
              color: '#DC2626', fontSize: 13, fontWeight: 500,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              background: loading ? '#C0CADC' : `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
              color: 'white', fontWeight: 800, fontSize: 15,
              border: 'none', borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(0,51,153,0.3)',
              transition: 'all 0.2s',
              marginTop: 4,
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{ marginTop: 28, padding: '14px 16px', background: '#F5F7FC', borderRadius: 12 }}>
          <p style={{ color: '#9AA5C0', fontSize: 12, textAlign: 'center', marginBottom: 6 }}>Varsayılan giriş bilgileri:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#9AA5C0', fontSize: 11 }}>Kullanıcı adı</p>
              <code style={{ color: NAVY, fontWeight: 700, fontSize: 14 }}>admin</code>
            </div>
            <div style={{ width: 1, background: '#E2E8F5' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#9AA5C0', fontSize: 11 }}>Şifre</p>
              <code style={{ color: NAVY, fontWeight: 700, fontSize: 14 }}>feder2024</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

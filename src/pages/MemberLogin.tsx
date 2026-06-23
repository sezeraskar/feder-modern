import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useMemberAuth } from '../hooks/useMemberAuth'
import logo from '../assets/logo.png'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'

const F: React.CSSProperties = {
  width: '100%', padding: '12px 16px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 12, fontSize: 15, color: '#0D1B52',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export default function MemberLogin() {
  const navigate = useNavigate()
  const { login } = useMemberAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const ok = login(email, password, remember)
    setLoading(false)
    if (ok) {
      navigate('/profilim')
    } else {
      setError('E-posta veya şifre hatalı.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#F5F7FC',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 40px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 24, padding: '44px 40px',
          boxShadow: '0 8px 40px rgba(0,51,153,0.1)', border: '1px solid #E2E8F5',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <img src={logo} alt="FeDeR" style={{ height: 56, objectFit: 'contain', marginBottom: 16 }} />
            <h1 style={{ color: '#0D1B52', fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Üye Girişi</h1>
            <p style={{ color: '#9AA5C0', fontSize: 14 }}>FeDeR hesabınıza giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>E-posta</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ornek@email.com" required style={F}
                onFocus={e => e.target.style.borderColor = NAVY}
                onBlur={e => e.target.style.borderColor = '#E2E8F5'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#5A6A9A', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Şifre</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required style={{ ...F, paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = NAVY}
                  onBlur={e => e.target.style.borderColor = '#E2E8F5'}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9AA5C0', padding: 0,
                }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div
                onClick={() => setRemember(!remember)}
                style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  border: `2px solid ${remember ? NAVY : '#D1D5DB'}`,
                  background: remember ? NAVY : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {remember && <div style={{ width: 8, height: 8, borderRadius: 2, background: 'white' }} />}
              </div>
              <span style={{ color: '#5A6A9A', fontSize: 14 }}>Beni hatırla</span>
            </label>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', color: '#DC2626', fontSize: 13, fontWeight: 500 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '14px', background: loading ? '#C0CADC' : `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
              color: 'white', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 6px 20px rgba(0,51,153,0.3)',
              marginTop: 4,
            }}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 24, borderTop: '1px solid #F0F3FA' }}>
            <p style={{ color: '#9AA5C0', fontSize: 14 }}>
              Hesabınız yok mu?{' '}
              <Link to="/uye-ol" style={{ color: NAVY, fontWeight: 700, textDecoration: 'none' }}>Üye Ol</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

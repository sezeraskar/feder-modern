import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../assets/logo.png'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const MEMBERS_KEY = 'feder_members'

const F: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

function uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36) }

function Lbl({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{children}</label>
}

export default function MemberRegister() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', birthDate: '',
    address: '', occupation: '', notes: '',
    password: '', confirmPassword: '',
  })

  const set = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Şifreler eşleşmiyor.')
      return
    }
    if (form.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }

    const existing = JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]')
    if (existing.find((m: { email: string }) => m.email.toLowerCase() === form.email.toLowerCase())) {
      setError('Bu e-posta adresi zaten kayıtlı.')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 500))

    const newMember = {
      id: uid(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      joinDate: new Date().toISOString().slice(0, 10),
      birthDate: form.birthDate,
      address: form.address,
      occupation: form.occupation,
      status: 'active' as const,
      boardMember: false,
      notes: form.notes,
      createdAt: new Date().toISOString(),
      password: form.password,
    }

    localStorage.setItem(MEMBERS_KEY, JSON.stringify([...existing, newMember]))
    setLoading(false)
    navigate('/giris', { state: { registered: true } })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FC', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '44px 40px', boxShadow: '0 8px 40px rgba(0,51,153,0.1)', border: '1px solid #E2E8F5' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <img src={logo} alt="FeDeR" style={{ height: 56, objectFit: 'contain', marginBottom: 16 }} />
            <h1 style={{ color: '#0D1B52', fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Üye Ol</h1>
            <p style={{ color: '#9AA5C0', fontSize: 14 }}>FeDeR ailesine katılın</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="grid sm:grid-cols-2 gap-4" style={{ marginBottom: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Lbl>Ad Soyad *</Lbl>
                <input value={form.name} onChange={e => set('name')(e.target.value)} placeholder="Adınız Soyadınız" required style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <Lbl>E-posta *</Lbl>
                <input type="email" value={form.email} onChange={e => set('email')(e.target.value)} placeholder="ornek@email.com" required style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <Lbl>Telefon</Lbl>
                <input value={form.phone} onChange={e => set('phone')(e.target.value)} placeholder="0532 xxx xx xx" style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <Lbl>Doğum Tarihi</Lbl>
                <input type="date" value={form.birthDate} onChange={e => set('birthDate')(e.target.value)} style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div>
                <Lbl>Meslek</Lbl>
                <input value={form.occupation} onChange={e => set('occupation')(e.target.value)} placeholder="Mühendis, Avukat..." style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Lbl>Adres</Lbl>
                <input value={form.address} onChange={e => set('address')(e.target.value)} placeholder="İlçe, Şehir" style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #F0F3FA', margin: '8px 0 20px' }} />
            <p style={{ color: '#9AA5C0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Şifre Bilgileri</p>

            <div className="grid sm:grid-cols-2 gap-4" style={{ marginBottom: 20 }}>
              <div>
                <Lbl>Şifre *</Lbl>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password')(e.target.value)}
                    placeholder="En az 6 karakter" required style={{ ...F, paddingRight: 44 }}
                    onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9AA5C0' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <Lbl>Şifre Tekrar *</Lbl>
                <input type={showPw ? 'text' : 'password'} value={form.confirmPassword} onChange={e => set('confirmPassword')(e.target.value)}
                  placeholder="Şifreyi tekrar girin" required style={F}
                  onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#E2E8F5'} />
              </div>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', color: '#DC2626', fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '14px', background: loading ? '#C0CADC' : `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
              color: 'white', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 6px 20px rgba(0,51,153,0.3)',
            }}>
              {loading ? 'Kayıt yapılıyor...' : 'Üye Ol'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F0F3FA' }}>
            <p style={{ color: '#9AA5C0', fontSize: 14 }}>
              Zaten üye misiniz?{' '}
              <Link to="/giris" style={{ color: NAVY, fontWeight: 700, textDecoration: 'none' }}>Giriş Yap</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

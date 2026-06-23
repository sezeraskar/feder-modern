import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Mail, MapPin, Briefcase, Calendar, CheckCircle2, XCircle, LogOut } from 'lucide-react'
import { useMemberAuth } from '../hooks/useMemberAuth'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'
const DUES_KEY = 'feder_dues'

interface Due {
  id: string; memberId: string; year: number
  amount: number; paid: boolean; paidDate: string
}

function loadDues(memberId: string): Due[] {
  try {
    const all: Due[] = JSON.parse(localStorage.getItem(DUES_KEY) || '[]')
    return all.filter(d => d.memberId === memberId).sort((a, b) => b.year - a.year)
  } catch { return [] }
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F3FA' }}>
      <div style={{ color: NAVY, flexShrink: 0, marginTop: 1 }}>{icon}</div>
      <div>
        <div style={{ color: '#9AA5C0', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
        <div style={{ color: '#0D1B52', fontSize: 15, fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  )
}

export default function MemberProfile() {
  const navigate = useNavigate()
  const { isLoggedIn, getProfile, logout } = useMemberAuth()
  const member = getProfile()
  const dues = member ? loadDues(member.id) : []

  useEffect(() => {
    if (!isLoggedIn) navigate('/giris')
  }, [isLoggedIn, navigate])

  if (!member) return null

  const totalPaid = dues.filter(d => d.paid).reduce((s, d) => s + d.amount, 0)
  const totalUnpaid = dues.filter(d => !d.paid).reduce((s, d) => s + d.amount, 0)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      {/* Header */}
      <section style={{
        paddingTop: 120, paddingBottom: 60,
        background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 8px 24px rgba(255,205,0,0.4)',
              }}>
                <span style={{ color: NAVY_DARK, fontWeight: 900, fontSize: 24 }}>
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h1 style={{ color: 'white', fontSize: 28, fontWeight: 900, marginBottom: 4 }}>{member.name}</h1>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: member.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                    color: member.status === 'active' ? '#4ADE80' : 'rgba(255,255,255,0.6)',
                  }}>
                    {member.status === 'active' ? 'Aktif Üye' : 'Pasif Üye'}
                  </span>
                  {member.boardMember && (
                    <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: `rgba(255,205,0,0.2)`, color: YELLOW }}>
                      {member.boardTitle ?? 'Yönetim Kurulu'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12,
              color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}>
              <LogOut size={16} /> Çıkış Yap
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
              <h2 style={{ color: '#0D1B52', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Kişisel Bilgiler</h2>
              <div>
                <InfoRow icon={<User size={16} />} label="Ad Soyad" value={member.name} />
                <InfoRow icon={<Mail size={16} />} label="E-posta" value={member.email} />
                <InfoRow icon={<Phone size={16} />} label="Telefon" value={member.phone} />
                <InfoRow icon={<MapPin size={16} />} label="Adres" value={member.address} />
                <InfoRow icon={<Briefcase size={16} />} label="Meslek" value={member.occupation} />
                <InfoRow icon={<Calendar size={16} />} label="Üyelik Tarihi" value={member.joinDate} />
                <InfoRow icon={<Calendar size={16} />} label="Doğum Tarihi" value={member.birthDate} />
              </div>
            </div>
          </div>

          {/* Dues */}
          <div style={{ gridColumn: 'span 2' }}>
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4" style={{ marginBottom: 20 }}>
              {[
                { label: 'Toplam Aidat', value: `₺${(totalPaid + totalUnpaid).toLocaleString('tr-TR')}`, color: NAVY },
                { label: 'Ödendi', value: `₺${totalPaid.toLocaleString('tr-TR')}`, color: '#16A34A' },
                { label: 'Bekliyor', value: `₺${totalUnpaid.toLocaleString('tr-TR')}`, color: '#DC2626' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,51,153,0.04)' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ color: '#9AA5C0', fontSize: 12 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Dues table */}
            <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F3FA' }}>
                <h2 style={{ color: '#0D1B52', fontWeight: 800, fontSize: 16, margin: 0 }}>Aidat Geçmişi</h2>
              </div>
              {dues.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9AA5C0' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
                  <p>Henüz aidat kaydı bulunmuyor.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F5F7FC' }}>
                      {['Yıl', 'Tutar', 'Durum', 'Ödeme Tarihi'].map(h => (
                        <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dues.map((d, i) => (
                      <tr key={d.id} style={{ borderTop: i > 0 ? '1px solid #F0F3FA' : 'none' }}>
                        <td style={{ padding: '14px 20px', color: '#0D1B52', fontWeight: 700 }}>{d.year}</td>
                        <td style={{ padding: '14px 20px', color: '#0D1B52', fontWeight: 600 }}>₺{d.amount.toLocaleString('tr-TR')}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                            background: d.paid ? '#DCFCE7' : '#FEF2F2',
                            color: d.paid ? '#16A34A' : '#DC2626',
                          }}>
                            {d.paid ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            {d.paid ? 'Ödendi' : 'Bekliyor'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', color: '#9AA5C0', fontSize: 13 }}>{d.paidDate || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

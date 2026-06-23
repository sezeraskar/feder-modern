import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Users, UserCheck, UserX, Crown,
  Newspaper, Clock, Phone, Info, Home,
  ArrowRight, CheckCircle2, DollarSign,
} from 'lucide-react'
import { useMembers, useDues, useSiteContent } from '../store'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'
const THIS_YEAR = new Date().getFullYear()

function StatCard({ icon, label, value, color, to }: {
  icon: React.ReactNode; label: string; value: string | number; color: string; to?: string
}) {
  const inner = (
    <div style={{
      background: 'white', borderRadius: 18, padding: '20px 24px',
      border: '1px solid #E2E8F5', boxShadow: '0 2px 10px rgba(0,51,153,0.05)',
      transition: 'all 0.2s', cursor: to ? 'pointer' : 'default',
    }}
      onMouseEnter={e => to && (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,51,153,0.1)')}
      onMouseLeave={e => to && (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,51,153,0.05)')}
    >
      <div style={{ width: 40, height: 40, borderRadius: 11, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 14 }}>
        {icon}
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color: NAVY_DARK, lineHeight: 1, marginBottom: 5 }}>{value}</div>
      <div style={{ color: '#9AA5C0', fontSize: 13 }}>{label}</div>
    </div>
  )
  return to ? <Link to={to} style={{ textDecoration: 'none' }}>{inner}</Link> : inner
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ width: 3, height: 20, background: NAVY, borderRadius: 2 }} />
      <h2 style={{ color: NAVY_DARK, fontSize: 16, fontWeight: 800 }}>{children}</h2>
    </div>
  )
}

export default function Dashboard() {
  const { members } = useMembers()
  const { dues } = useDues()
  const { content } = useSiteContent()

  const memberStats = useMemo(() => ({
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    passive: members.filter(m => m.status === 'passive').length,
    board: members.filter(m => m.boardMember).length,
  }), [members])

  const dueStats = useMemo(() => {
    const yd = dues.filter(d => d.year === THIS_YEAR)
    const paid = yd.filter(d => d.paid)
    return {
      collected: paid.reduce((s, d) => s + d.amount, 0),
      outstanding: yd.filter(d => !d.paid).reduce((s, d) => s + d.amount, 0),
      paidCount: paid.length,
      total: yd.length,
      rate: yd.length > 0 ? Math.round((paid.length / yd.length) * 100) : 0,
    }
  }, [dues])

  const siteStats = useMemo(() => ({
    news: content.news.length,
    history: content.history.length,
    values: content.aboutValues.length,
  }), [content])

  const recentMembers = useMemo(() =>
    [...members].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
    [members])

  const recentPayments = useMemo(() => {
    const map = Object.fromEntries(members.map(m => [m.id, m]))
    return dues
      .filter(d => d.paid && d.paidDate)
      .sort((a, b) => b.paidDate.localeCompare(a.paidDate))
      .slice(0, 5)
      .map(d => ({ due: d, member: map[d.memberId] }))
      .filter(x => x.member)
  }, [dues, members])

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Dashboard</h1>
        <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>Genel bakış — FeDeR Yönetim Paneli</p>
      </div>

      {/* ── Websitesi Ayarları ── */}
      <SectionTitle>🌐 Websitesi Ayarları</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { icon: <Home size={18} />,      label: 'Anasayfa & Hero',  value: '1',             color: NAVY,     to: '/admin/site/hero' },
          { icon: <Newspaper size={18} />, label: 'Haberler',         value: siteStats.news,  color: '#0B6B1F', to: '/admin/site/haberler' },
          { icon: <Info size={18} />,      label: 'Hakkımızda',       value: siteStats.values, color: '#6B0BB5', to: '/admin/site/hakkimizda' },
          { icon: <Clock size={18} />,     label: 'Tarihçe Dönemi',   value: siteStats.history, color: '#B45309', to: '/admin/site/tarihce' },
          { icon: <Phone size={18} />,     label: 'İletişim',         value: '1',             color: '#0891B2', to: '/admin/site/iletisim' },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── Aidat özeti banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
        borderRadius: 20, padding: '24px 28px', marginBottom: 32,
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,51,153,0.2)',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: YELLOW }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
          <div>
            <h2 style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>{THIS_YEAR} Aidat Durumu</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{dueStats.paidCount}/{dueStats.total} üye ödedi</p>
          </div>
          <Link to="/admin/aidatlar" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: YELLOW, color: NAVY_DARK,
            padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none',
          }}>
            Detaylar <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Tahsil Edilen', value: `₺${dueStats.collected.toLocaleString('tr-TR')}`, color: '#4ADE80' },
            { label: 'Bekleyen', value: `₺${dueStats.outstanding.toLocaleString('tr-TR')}`, color: '#FCA5A5' },
            { label: 'Ödeme Oranı', value: `%${dueStats.rate}`, color: YELLOW },
            { label: 'Toplam Kayıt', value: dueStats.total, color: 'rgba(255,255,255,0.7)' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 100, height: 7, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: `linear-gradient(90deg, ${YELLOW}, #FFE066)`, width: `${dueStats.rate}%`, borderRadius: 100, transition: 'width 0.8s ease' }} />
        </div>
      </div>

      {/* ── Üye İşlemleri ── */}
      <SectionTitle>👥 Üye İşlemleri</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={18} />}     label="Toplam Üye"       value={memberStats.total}   color={NAVY}      to="/admin/uyeler" />
        <StatCard icon={<UserCheck size={18} />} label="Aktif Üye"        value={memberStats.active}  color="#16A34A"   to="/admin/uyeler" />
        <StatCard icon={<UserX size={18} />}     label="Pasif Üye"        value={memberStats.passive} color="#DC2626"   to="/admin/uyeler" />
        <StatCard icon={<Crown size={18} />}     label="Yönetim Kurulu"   value={memberStats.board}   color="#B45309"   to="/admin/uyeler" />
      </div>

      {/* ── Recent ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent members */}
        <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '24px 26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 15 }}>Son Eklenen Üyeler</h3>
            <Link to="/admin/uyeler" style={{ color: NAVY, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Tümü →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {recentMembers.map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: m.boardMember ? 'rgba(0,51,153,0.12)' : '#F0F3FA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: m.boardMember ? NAVY : '#9AA5C0', fontWeight: 800, fontSize: 11,
                }}>
                  {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: NAVY_DARK, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                  <div style={{ color: '#B0BAD0', fontSize: 11 }}>{m.joinDate}</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: m.status === 'active' ? '#DCFCE7' : '#F3F4F6',
                  color: m.status === 'active' ? '#16A34A' : '#6B7280',
                }}>
                  {m.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '24px 26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 15 }}>Son Ödemeler</h3>
            <Link to="/admin/aidatlar" style={{ color: NAVY, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Tümü →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {recentPayments.length > 0 ? recentPayments.map(({ due, member }) => (
              <div key={due.id} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: NAVY_DARK, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
                  <div style={{ color: '#B0BAD0', fontSize: 11 }}>{due.year} · {due.paidDate}</div>
                </div>
                <span style={{ color: '#16A34A', fontWeight: 700, fontSize: 14 }}>₺{due.amount}</span>
              </div>
            )) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#B0BAD0', padding: '12px 0' }}>
                <DollarSign size={20} style={{ opacity: 0.4 }} />
                <span style={{ fontSize: 13 }}>Henüz ödeme kaydı yok.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

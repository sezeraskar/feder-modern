import { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, RefreshCw, TrendingUp, DollarSign, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useMembers, useDues } from '../store'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = [CURRENT_YEAR + 1, CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3]

function formatCurrency(n: number) {
  return `₺${n.toLocaleString('tr-TR')}`
}

export default function Dues() {
  const { members } = useMembers()
  const { dues, updateDue, generateForYear, addDue } = useDues()
  const [year, setYear] = useState(CURRENT_YEAR)
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all')
  const [search, setSearch] = useState('')
  const [defaultAmount, setDefaultAmount] = useState(500)
  const [toast, setToast] = useState('')
  const [sortField, setSortField] = useState<'name' | 'status'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const duesByMember = useMemo(() => {
    const map: Record<string, typeof dues[0]> = {}
    dues.filter(d => d.year === year).forEach(d => { map[d.memberId] = d })
    return map
  }, [dues, year])

  // Build rows: one per active member
  const rows = useMemo(() => {
    return members
      .filter(m => {
        const q = search.toLowerCase()
        return !q || m.name.toLowerCase().includes(q)
      })
      .map(m => ({ member: m, due: duesByMember[m.id] ?? null }))
      .filter(row => {
        if (filterStatus === 'paid') return row.due?.paid === true
        if (filterStatus === 'unpaid') return row.due?.paid === false || !row.due
        return true
      })
      .sort((a, b) => {
        let cmp = 0
        if (sortField === 'name') cmp = a.member.name.localeCompare(b.member.name, 'tr')
        if (sortField === 'status') cmp = (a.due?.paid ? 1 : 0) - (b.due?.paid ? 1 : 0)
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [members, duesByMember, search, filterStatus, sortField, sortDir])

  const stats = useMemo(() => {
    const yearDues = dues.filter(d => d.year === year)
    const paid = yearDues.filter(d => d.paid)
    const unpaid = yearDues.filter(d => !d.paid)
    const collected = paid.reduce((s, d) => s + d.amount, 0)
    const outstanding = unpaid.reduce((s, d) => s + d.amount, 0)
    const rate = yearDues.length > 0 ? Math.round((paid.length / yearDues.length) * 100) : 0
    return { total: yearDues.length, paid: paid.length, unpaid: unpaid.length, collected, outstanding, rate }
  }, [dues, year])

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const handleTogglePaid = (row: typeof rows[0]) => {
    if (!row.due) {
      addDue({ memberId: row.member.id, year, amount: defaultAmount, paid: true, paidDate: new Date().toISOString().slice(0, 10), notes: '' })
      showToast('Ödeme kaydedildi.')
    } else {
      const nowPaid = !row.due.paid
      updateDue(row.due.id, {
        paid: nowPaid,
        paidDate: nowPaid ? new Date().toISOString().slice(0, 10) : '',
      })
      showToast(nowPaid ? 'Ödeme işaretlendi.' : 'Ödeme geri alındı.')
    }
  }

  const handleGenerate = () => {
    generateForYear(members, year, defaultAmount)
    showToast(`${year} yılı aidatları aktif üyeler için oluşturuldu.`)
  }

  const handleMarkAllPaid = () => {
    const today = new Date().toISOString().slice(0, 10)
    rows.forEach(row => {
      if (row.due && !row.due.paid) updateDue(row.due.id, { paid: true, paidDate: today })
      else if (!row.due) addDue({ memberId: row.member.id, year, amount: defaultAmount, paid: true, paidDate: today, notes: '' })
    })
    showToast('Görünümdeki tüm üyeler ödedi olarak işaretlendi.')
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
  }

  return (
    <div>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          background: NAVY_DARK, color: 'white', padding: '12px 24px', borderRadius: 12,
          fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          borderLeft: `4px solid ${YELLOW}`,
        }}>{toast}</div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Aidat Takibi</h1>
        <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>Üye aidat ödemelerini yönetin</p>
      </div>

      {/* Year + controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', background: 'white', border: '1px solid #E2E8F5', borderRadius: 12, overflow: 'hidden' }}>
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              style={{
                padding: '10px 18px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: year === y ? NAVY : 'transparent',
                color: year === y ? 'white' : '#5A6A9A',
                transition: 'all 0.15s',
              }}
            >
              {y}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#5A6A9A', fontSize: 13 }}>Aidat:</span>
            <input
              type="number"
              value={defaultAmount}
              onChange={e => setDefaultAmount(Number(e.target.value))}
              style={{ width: 90, padding: '8px 12px', border: '1px solid #E2E8F5', borderRadius: 8, fontSize: 14, color: NAVY_DARK, outline: 'none' }}
            />
            <span style={{ color: '#9AA5C0', fontSize: 13 }}>₺</span>
          </div>
          <button
            onClick={handleGenerate}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 18px', background: 'rgba(0,51,153,0.08)',
              border: '1px solid rgba(0,51,153,0.15)', borderRadius: 10,
              color: NAVY, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} /> {year} İçin Oluştur
          </button>
          <button
            onClick={handleMarkAllPaid}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 18px',
              background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
              border: 'none', borderRadius: 10,
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,51,153,0.25)',
            }}
          >
            <CheckCircle2 size={14} /> Tümünü Ödendi İşaretle
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { icon: <DollarSign size={18} />, label: 'Tahsil Edilen', value: formatCurrency(stats.collected), color: '#16A34A' },
          { icon: <AlertCircle size={18} />, label: 'Bekleyen', value: formatCurrency(stats.outstanding), color: '#DC2626' },
          { icon: <CheckCircle2 size={18} />, label: 'Ödeyen Üye', value: `${stats.paid} / ${stats.total}`, color: NAVY },
          { icon: <TrendingUp size={18} />, label: 'Tahsilat Oranı', value: `%${stats.rate}`, color: '#B45309' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 16, padding: '20px 22px',
            border: '1px solid #E2E8F5', boxShadow: '0 2px 8px rgba(0,51,153,0.04)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: s.color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 12,
            }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: NAVY_DARK }}>{s.value}</div>
            <div style={{ color: '#9AA5C0', fontSize: 13, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: NAVY_DARK, fontSize: 14, fontWeight: 700 }}>{year} Tahsilat Durumu</span>
          <span style={{ color: NAVY, fontSize: 14, fontWeight: 800 }}>%{stats.rate}</span>
        </div>
        <div style={{ background: '#F0F3FA', borderRadius: 100, height: 10, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: `linear-gradient(90deg, ${NAVY}, #0044CC)`,
            borderRadius: 100, width: `${stats.rate}%`, transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Filter + search */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="İsim ara..."
          style={{ padding: '9px 14px', border: '1px solid #E2E8F5', borderRadius: 10, fontSize: 14, color: NAVY_DARK, outline: 'none', background: 'white', width: 220 }}
        />
        <div style={{ display: 'flex', background: 'white', border: '1px solid #E2E8F5', borderRadius: 10, overflow: 'hidden' }}>
          {(['all', 'paid', 'unpaid'] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '9px 16px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: filterStatus === s ? NAVY : 'transparent',
              color: filterStatus === s ? 'white' : '#5A6A9A',
            }}>
              {s === 'all' ? 'Tümü' : s === 'paid' ? 'Ödedi' : 'Ödemedi'}
            </button>
          ))}
        </div>
        <span style={{ color: '#9AA5C0', fontSize: 13, marginLeft: 'auto' }}>{rows.length} kayıt</span>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F5', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#F5F7FC', borderBottom: '1px solid #E2E8F5' }}>
                <th onClick={() => toggleSort('name')} style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', userSelect: 'none' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Üye <SortIcon field="name" /></span>
                </th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Yıl</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tutar</th>
                <th onClick={() => toggleSort('status')} style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', userSelect: 'none' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Durum <SortIcon field="status" /></span>
                </th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ödeme Tarihi</th>
                <th style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ member: m, due }, i) => (
                <tr key={m.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F0F3FA' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFBFF')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >
                  <td style={{ padding: '13px 20px' }}>
                    <div style={{ color: NAVY_DARK, fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                    <div style={{ color: '#9AA5C0', fontSize: 12 }}>{m.status === 'active' ? 'Aktif' : 'Pasif'} {m.boardMember ? '· YK' : ''}</div>
                  </td>
                  <td style={{ padding: '13px 20px', color: '#5A6A9A', fontSize: 14 }}>{year}</td>
                  <td style={{ padding: '13px 20px', color: NAVY_DARK, fontSize: 14, fontWeight: 700 }}>
                    {due ? formatCurrency(due.amount) : '—'}
                  </td>
                  <td style={{ padding: '13px 20px' }}>
                    {due ? (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                        background: due.paid ? '#DCFCE7' : '#FEF2F2',
                        color: due.paid ? '#16A34A' : '#DC2626',
                      }}>
                        {due.paid ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {due.paid ? 'Ödedi' : 'Ödemedi'}
                      </span>
                    ) : (
                      <span style={{ color: '#D1D5DB', fontSize: 13 }}>Kayıt yok</span>
                    )}
                  </td>
                  <td style={{ padding: '13px 20px', color: '#5A6A9A', fontSize: 13 }}>
                    {due?.paidDate || '—'}
                  </td>
                  <td style={{ padding: '13px 20px' }}>
                    <button
                      onClick={() => handleTogglePaid({ member: m, due })}
                      style={{
                        padding: '6px 14px', border: 'none', borderRadius: 8, cursor: 'pointer',
                        fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
                        background: due?.paid ? 'rgba(220,38,38,0.08)' : 'rgba(22,163,74,0.08)',
                        color: due?.paid ? '#DC2626' : '#16A34A',
                      }}
                    >
                      {due?.paid ? 'Geri Al' : 'Ödendi'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#9AA5C0' }}>
              <DollarSign size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <p>Bu yıl için aidat kaydı bulunamadı.</p>
              <button onClick={handleGenerate} style={{
                marginTop: 16, padding: '10px 20px', background: NAVY, color: 'white',
                border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>
                {year} için aidat oluştur
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

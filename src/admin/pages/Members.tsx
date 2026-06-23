import { useState, useMemo } from 'react'
import type { FormEvent } from 'react'
import { Search, Plus, Edit2, Trash2, X, Users, UserCheck, UserX, Crown } from 'lucide-react'
import { useMembers } from '../store'
import type { Member } from '../types'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

type Filter = 'all' | 'active' | 'passive' | 'board'

const EMPTY: Omit<Member, 'id' | 'createdAt'> = {
  name: '', email: '', phone: '', joinDate: '', birthDate: '',
  address: '', occupation: '', status: 'active', boardMember: false,
  boardBoard: undefined, boardTitle: '', notes: '',
}

function initials(name: string) {
  return name.split(' ').map(n => n[0] ?? '').join('').slice(0, 2).toUpperCase()
}

function avatarColor(id: string) {
  const colors = ['#003399','#0044CC','#0D1B52','#1A3A8F','#0055DD','#002277']
  const idx = id.charCodeAt(0) % colors.length
  return colors[idx]
}

interface ModalProps {
  member: Omit<Member, 'id' | 'createdAt'> | null
  editId: string | null
  onClose: () => void
  onSave: (data: Omit<Member, 'id' | 'createdAt'>) => void
}

function MemberModal({ member, editId, onClose, onSave }: ModalProps) {
  const [form, setForm] = useState<Omit<Member, 'id' | 'createdAt'>>(member ?? { ...EMPTY })

  const set = (field: string, value: string | boolean | number) =>
    setForm(p => ({ ...p, [field]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '40px 16px', overflowY: 'auto',
    }} onClick={onClose}>
      <div style={{
        background: 'white', borderRadius: 24, width: '100%', maxWidth: 620,
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
          padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: YELLOW }} />
          <h2 style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>
            {editId ? 'Üye Düzenle' : 'Yeni Üye Ekle'}
          </h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: 8, color: 'white', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '28px 32px' }}>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Ad Soyad *</Label>
              <Input value={form.name} onChange={v => set('name', v)} placeholder="Adı Soyadı" required />
            </div>
            {/* Email */}
            <div>
              <Label>E-posta</Label>
              <Input value={form.email} onChange={v => set('email', v)} placeholder="email@example.com" type="email" />
            </div>
            {/* Phone */}
            <div>
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={v => set('phone', v)} placeholder="0532 xxx xx xx" />
            </div>
            {/* Join date */}
            <div>
              <Label>Üyelik Tarihi</Label>
              <Input value={form.joinDate} onChange={v => set('joinDate', v)} type="date" />
            </div>
            {/* Birth date */}
            <div>
              <Label>Doğum Tarihi</Label>
              <Input value={form.birthDate} onChange={v => set('birthDate', v)} type="date" />
            </div>
            {/* Address */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Adres</Label>
              <Input value={form.address} onChange={v => set('address', v)} placeholder="İlçe, Şehir" />
            </div>
            {/* Occupation */}
            <div>
              <Label>Meslek</Label>
              <Input value={form.occupation} onChange={v => set('occupation', v)} placeholder="Mühendis, Avukat..." />
            </div>
            {/* Status */}
            <div>
              <Label>Durum</Label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value)}
                style={{ ...inputStyle }}
              >
                <option value="active">Aktif</option>
                <option value="passive">Pasif</option>
              </select>
            </div>
            {/* Board member toggle */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div
                  onClick={() => set('boardMember', !form.boardMember)}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: form.boardMember ? NAVY : '#D1D5DB',
                    position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3, left: form.boardMember ? 23 : 3,
                    width: 18, height: 18, borderRadius: '50%', background: 'white',
                    transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <span style={{ color: NAVY_DARK, fontSize: 14, fontWeight: 500 }}>Yönetim Kurulu Üyesi</span>
              </label>
            </div>
            {form.boardMember && (
              <>
                <div>
                  <Label>Kurul</Label>
                  <select value={form.boardBoard ?? ''} onChange={e => set('boardBoard', Number(e.target.value))} style={{ ...inputStyle }}>
                    <option value="">Seç</option>
                    <option value={1}>1. Yönetim Kurulu</option>
                    <option value={2}>2. Yönetim Kurulu</option>
                  </select>
                </div>
                <div>
                  <Label>Unvan</Label>
                  <Input value={form.boardTitle ?? ''} onChange={v => set('boardTitle', v)} placeholder="Başkan, Üye..." />
                </div>
              </>
            )}
            {/* Notes */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Notlar</Label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                placeholder="Ek bilgiler..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '11px 24px', border: '1px solid #E2E8F5', borderRadius: 12,
              background: 'white', color: '#5A6A9A', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}>
              İptal
            </button>
            <button type="submit" style={{
              padding: '11px 28px', border: 'none', borderRadius: 12,
              background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
              color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,51,153,0.3)',
            }}>
              {editId ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52',
  outline: 'none',
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{children}</label>
}

function Input({ value, onChange, placeholder, type = 'text', required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={{ ...inputStyle }}
    />
  )
}

export default function Members() {
  const { members, addMember, updateMember, deleteMember } = useMembers()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [modal, setModal] = useState<{ open: boolean; editId: string | null }>({ open: false, editId: null })
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const filtered = useMemo(() => {
    return members
      .filter(m => {
        if (filter === 'active') return m.status === 'active'
        if (filter === 'passive') return m.status === 'passive'
        if (filter === 'board') return m.boardMember
        return true
      })
      .filter(m => {
        const q = search.toLowerCase()
        return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q)
      })
  }, [members, search, filter])

  const counts = useMemo(() => ({
    all: members.length,
    active: members.filter(m => m.status === 'active').length,
    passive: members.filter(m => m.status === 'passive').length,
    board: members.filter(m => m.boardMember).length,
  }), [members])

  const editingMember = modal.editId ? members.find(m => m.id === modal.editId) : null

  const handleSave = (data: Omit<Member, 'id' | 'createdAt'>) => {
    if (modal.editId) {
      updateMember(modal.editId, data)
      showToast('Üye güncellendi.')
    } else {
      addMember(data)
      showToast('Üye eklendi.')
    }
  }

  const handleDelete = (id: string) => {
    deleteMember(id)
    setDeleteConfirm(null)
    showToast('Üye silindi.')
  }

  const toggleStatus = (m: Member) => {
    updateMember(m.id, { status: m.status === 'active' ? 'passive' : 'active' })
    showToast(m.status === 'active' ? 'Üye pasife alındı.' : 'Üye aktife alındı.')
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          background: NAVY_DARK, color: 'white',
          padding: '12px 24px', borderRadius: 12,
          fontSize: 14, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          borderLeft: `4px solid ${YELLOW}`,
          animation: 'fadeIn 0.3s ease',
        }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Üye Yönetimi</h1>
          <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>{members.length} kayıtlı üye</p>
        </div>
        <button
          onClick={() => setModal({ open: true, editId: null })}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
            color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer',
            fontSize: 14, fontWeight: 700, boxShadow: '0 4px 14px rgba(0,51,153,0.3)',
          }}
        >
          <Plus size={16} /> Yeni Üye
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([
          { key: 'all', label: 'Tümü', count: counts.all, icon: <Users size={13} /> },
          { key: 'active', label: 'Aktif', count: counts.active, icon: <UserCheck size={13} /> },
          { key: 'passive', label: 'Pasif', count: counts.passive, icon: <UserX size={13} /> },
          { key: 'board', label: 'Yönetim Kurulu', count: counts.board, icon: <Crown size={13} /> },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
              background: filter === tab.key ? NAVY : 'white',
              color: filter === tab.key ? 'white' : '#5A6A9A',
              border: filter === tab.key ? 'none' : '1px solid #E2E8F5',
              boxShadow: filter === tab.key ? '0 4px 12px rgba(0,51,153,0.2)' : 'none',
            }}
          >
            {tab.icon} {tab.label}
            <span style={{
              background: filter === tab.key ? 'rgba(255,255,255,0.2)' : '#F0F3FA',
              color: filter === tab.key ? 'white' : '#5A6A9A',
              padding: '1px 7px', borderRadius: 20, fontSize: 11,
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 400 }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9AA5C0' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="İsim, e-posta veya telefon ara..."
          style={{
            width: '100%', padding: '11px 14px 11px 40px',
            background: 'white', border: '1.5px solid #E2E8F5',
            borderRadius: 12, fontSize: 14, color: NAVY_DARK, outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F5', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#F5F7FC', borderBottom: '1px solid #E2E8F5' }}>
                {['Üye', 'İletişim', 'Üyelik', 'Durum', 'İşlemler'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: '#9AA5C0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F0F3FA' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFBFF')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >
                  {/* Name + avatar */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: avatarColor(m.id),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: m.id.startsWith('brd') ? YELLOW : 'white',
                        fontWeight: 800, fontSize: 12,
                      }}>
                        {initials(m.name)}
                      </div>
                      <div>
                        <div style={{ color: NAVY_DARK, fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                        {m.boardMember && (
                          <div style={{ color: NAVY, fontSize: 11, fontWeight: 600 }}>{m.boardTitle}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Contact */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ color: '#5A6A9A', fontSize: 13 }}>{m.email || '—'}</div>
                    <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{m.phone || '—'}</div>
                  </td>
                  {/* Join date */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ color: '#5A6A9A', fontSize: 13 }}>{m.joinDate || '—'}</div>
                    <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{m.occupation || '—'}</div>
                  </td>
                  {/* Status */}
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      onClick={() => toggleStatus(m)}
                      style={{
                        padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                        fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
                        background: m.status === 'active' ? '#DCFCE7' : '#F3F4F6',
                        color: m.status === 'active' ? '#16A34A' : '#6B7280',
                      }}
                    >
                      {m.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => setModal({ open: true, editId: m.id })}
                        style={{ padding: '7px 8px', background: 'rgba(0,51,153,0.07)', border: 'none', borderRadius: 8, cursor: 'pointer', color: NAVY }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(m.id)}
                        style={{ padding: '7px 8px', background: 'rgba(220,38,38,0.07)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#DC2626' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: '#9AA5C0' }}>
              <Users size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <p>Sonuç bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Modal */}
      {modal.open && (
        <MemberModal
          member={editingMember ? (() => {
            const { id: _id, createdAt: _c, ...rest } = editingMember
            return rest
          })() : null}
          editId={modal.editId}
          onClose={() => setModal({ open: false, editId: null })}
          onSave={handleSave}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '32px', maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Üyeyi Sil</h3>
            <p style={{ color: '#5A6A9A', fontSize: 14, lineHeight: 1.6 }}>
              Bu üyeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', border: '1px solid #E2E8F5', borderRadius: 10, background: 'white', color: '#5A6A9A', cursor: 'pointer', fontWeight: 600 }}>İptal</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: '11px', border: 'none', borderRadius: 10, background: '#DC2626', color: 'white', cursor: 'pointer', fontWeight: 700 }}>Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

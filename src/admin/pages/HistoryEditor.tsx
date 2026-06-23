import { useState } from 'react'
import { Save, Plus, Trash2, GripVertical } from 'lucide-react'
import { useSiteContent } from '../store'
import type { HistoryEntry } from '../types'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

const F: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52', outline: 'none', boxSizing: 'border-box',
}

export default function HistoryEditor() {
  const { content, updateContent } = useSiteContent()
  const [items, setItems] = useState<HistoryEntry[]>(content.history.map(h => ({ ...h })))
  const [expanded, setExpanded] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const add = () => {
    const newItem: HistoryEntry = {
      id: Date.now().toString(),
      year: String(new Date().getFullYear()),
      title: 'Yeni Dönem',
      description: 'Bu dönemde neler yaşandığını buraya yazın.',
    }
    setItems(p => [...p, newItem])
    setExpanded(newItem.id)
  }

  const upd = (id: string, field: keyof HistoryEntry, val: string) =>
    setItems(p => p.map(h => h.id === id ? { ...h, [field]: val } : h))

  const remove = (id: string) => {
    setItems(p => p.filter(h => h.id !== id))
    if (expanded === id) setExpanded(null)
    showToast('Dönem silindi.')
  }

  const moveUp = (i: number) => {
    if (i === 0) return
    setItems(p => { const a = [...p]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a })
  }
  const moveDown = (i: number) => {
    setItems(p => { if (i >= p.length - 1) return p; const a = [...p]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a })
  }

  const saveAll = () => {
    updateContent({ history: items })
    showToast('Tarihçe kaydedildi.')
  }

  return (
    <div>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          background: NAVY_DARK, color: 'white', padding: '12px 24px', borderRadius: 12,
          fontSize: 14, fontWeight: 600, borderLeft: `4px solid ${YELLOW}`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>{toast}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Tarihçe</h1>
          <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>Zaman çizelgesindeki dönemleri yönetin</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={add} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', background: 'rgba(0,51,153,0.08)',
            border: '1px solid rgba(0,51,153,0.15)', borderRadius: 10,
            color: NAVY, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            <Plus size={14} /> Dönem Ekle
          </button>
          <button onClick={saveAll} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 22px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
            border: 'none', borderRadius: 10, color: 'white',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
          }}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </div>

      {/* Timeline preview hint */}
      <div style={{
        background: 'rgba(0,51,153,0.05)', border: '1px solid rgba(0,51,153,0.12)',
        borderRadius: 12, padding: '12px 18px', marginBottom: 20,
        color: '#5A6A9A', fontSize: 13,
      }}>
        💡 Dönemler zaman çizelgesinde listelendikleri sırada görünür. Sıralamayı değiştirmek için oklara tıklayın.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => {
          const open = expanded === item.id
          return (
            <div key={item.id} style={{
              background: 'white', border: `1px solid ${open ? 'rgba(0,51,153,0.2)' : '#E2E8F5'}`,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: open ? '0 4px 20px rgba(0,51,153,0.08)' : 'none',
            }}>
              {/* Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
                {/* Order controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <button onClick={() => moveUp(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0CADC', padding: 2, fontSize: 10 }}>▲</button>
                  <button onClick={() => moveDown(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0CADC', padding: 2, fontSize: 10 }}>▼</button>
                </div>
                <GripVertical size={16} style={{ color: '#C0CADC' }} />

                {/* Year badge */}
                <div style={{
                  background: NAVY, color: YELLOW,
                  padding: '4px 12px', borderRadius: 8,
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>{item.year}</div>

                {/* Title */}
                <div
                  style={{ flex: 1, cursor: 'pointer', color: NAVY_DARK, fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  onClick={() => setExpanded(open ? null : item.id)}
                >
                  {item.title}
                </div>

                <button onClick={() => remove(item.id)} style={{
                  padding: 5, background: 'rgba(220,38,38,0.08)', border: 'none',
                  borderRadius: 7, cursor: 'pointer', color: '#DC2626', flexShrink: 0,
                }}>
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Expanded form */}
              {open && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F0F3FA' }}>
                  <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Yıl / Dönem</label>
                        <input value={item.year} onChange={e => upd(item.id, 'year', e.target.value)} style={F} placeholder="1986, 1990'lar..." />
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Dönem Başlığı</label>
                        <input value={item.title} onChange={e => upd(item.id, 'title', e.target.value)} style={F} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Açıklama</label>
                      <textarea value={item.description} onChange={e => upd(item.id, 'description', e.target.value)} rows={3} style={{ ...F, resize: 'vertical' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {items.length === 0 && (
          <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <p style={{ color: '#9AA5C0', marginBottom: 16 }}>Henüz dönem eklenmemiş.</p>
            <button onClick={add} style={{
              padding: '10px 22px', background: NAVY, color: 'white',
              border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>İlk dönemi ekle</button>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Plus, Trash2, Save, GripVertical } from 'lucide-react'
import { useSiteContent } from '../store'
import type { NewsItem } from '../types'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'
const CATS = ['Dernek Haberleri', 'Spor Haberleri', 'Voleybol', 'FeDeR Akademi', 'Duyuru']

const F: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52', outline: 'none', boxSizing: 'border-box',
}

const CAT_COLORS: Record<string, { text: string; bg: string }> = {
  'Dernek Haberleri': { text: '#003399', bg: 'rgba(0,51,153,0.08)' },
  'Spor Haberleri':   { text: '#0B6B1F', bg: 'rgba(11,107,31,0.08)' },
  'Voleybol':         { text: '#6B0BB5', bg: 'rgba(107,11,181,0.08)' },
  'FeDeR Akademi':    { text: '#B56B00', bg: 'rgba(181,107,0,0.08)' },
  'Duyuru':           { text: '#B58A00', bg: 'rgba(181,138,0,0.10)' },
}

export default function NewsEditor() {
  const { content, updateContent } = useSiteContent()
  const [items, setItems] = useState<NewsItem[]>(content.news.map(n => ({ ...n })))
  const [toast, setToast] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const add = () => {
    const newItem: NewsItem = {
      id: Date.now(),
      category: 'Dernek Haberleri',
      title: 'Yeni Haber Başlığı',
      excerpt: 'Haber özeti buraya yazılacak.',
      date: new Date().toLocaleDateString('tr-TR'),
    }
    setItems(p => [newItem, ...p])
    setExpanded(newItem.id)
  }

  const update = (id: number, field: keyof NewsItem, val: string) =>
    setItems(p => p.map(n => n.id === id ? { ...n, [field]: val } : n))

  const remove = (id: number) => {
    setItems(p => p.filter(n => n.id !== id))
    if (expanded === id) setExpanded(null)
    showToast('Haber silindi.')
  }

  const saveAll = () => {
    updateContent({ news: items })
    showToast('Tüm haberler kaydedildi.')
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

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Haberler & Blog</h1>
          <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>{items.length} içerik</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={add} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', background: 'rgba(0,51,153,0.08)',
            border: '1px solid rgba(0,51,153,0.18)', borderRadius: 10,
            color: NAVY, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            <Plus size={15} /> Yeni Haber
          </button>
          <button onClick={saveAll} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 22px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
            border: 'none', borderRadius: 10, color: 'white',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
          }}>
            <Save size={15} /> Tümünü Kaydet
          </button>
        </div>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => {
          const col = CAT_COLORS[item.category] ?? { text: NAVY, bg: 'rgba(0,51,153,0.08)' }
          const open = expanded === item.id
          return (
            <div key={item.id} style={{
              background: 'white', border: `1px solid ${open ? 'rgba(0,51,153,0.2)' : '#E2E8F5'}`,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: open ? '0 4px 20px rgba(0,51,153,0.08)' : 'none',
              transition: 'all 0.2s',
            }}>
              {/* Row header */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', cursor: 'pointer' }}
                onClick={() => setExpanded(open ? null : item.id)}
              >
                <GripVertical size={16} style={{ color: '#C0CADC', flexShrink: 0 }} />
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  color: col.text, background: col.bg, flexShrink: 0,
                }}>{item.category}</span>
                <span style={{ flex: 1, color: NAVY_DARK, fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </span>
                <span style={{ color: '#B0BAD0', fontSize: 12, flexShrink: 0 }}>{item.date}</span>
                <button
                  onClick={e => { e.stopPropagation(); remove(item.id) }}
                  style={{ padding: '5px', background: 'rgba(220,38,38,0.07)', border: 'none', borderRadius: 7, cursor: 'pointer', color: '#DC2626', flexShrink: 0 }}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Expanded form */}
              {open && (
                <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid #F0F3FA' }}>
                  <div style={{ paddingTop: 16 }} className="grid sm:grid-cols-2 gap-4">
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Başlık</label>
                      <input value={item.title} onChange={e => update(item.id, 'title', e.target.value)} style={F} />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Kategori</label>
                      <select value={item.category} onChange={e => update(item.id, 'category', e.target.value)} style={F}>
                        {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Tarih</label>
                      <input value={item.date} onChange={e => update(item.id, 'date', e.target.value)} style={F} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Özet</label>
                      <textarea value={item.excerpt} onChange={e => update(item.id, 'excerpt', e.target.value)} rows={3} style={{ ...F, resize: 'vertical' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {items.length === 0 && (
          <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '48px', textAlign: 'center' }}>
            <p style={{ color: '#9AA5C0', marginBottom: 16 }}>Henüz haber yok.</p>
            <button onClick={add} style={{
              padding: '10px 22px', background: NAVY, color: 'white', border: 'none',
              borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>İlk haberi ekle</button>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import { useSiteContent } from '../store'
import type { AboutValue } from '../types'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

const F: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52', outline: 'none', boxSizing: 'border-box',
}

const ICONS = ['Shield', 'Users', 'Globe', 'Heart', 'Award', 'Target', 'Star', 'Zap', 'BookOpen', 'Flag', 'Handshake', 'Trophy']

function Lbl({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{children}</label>
}
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: 28, marginBottom: 20 }}>
      <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 16, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F0F3FA' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  )
}
function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '10px 24px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
        color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
        cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
      }}>
        <Save size={15} /> Kaydet
      </button>
    </div>
  )
}

export default function AboutEditor() {
  const { content, updateContent } = useSiteContent()
  const [f, setF] = useState({ ...content })
  const [toast, setToast] = useState('')

  const set = (k: keyof typeof f) => (v: string) => setF(p => ({ ...p, [k]: v }))
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }
  const save = (section: string) => { updateContent(f); showToast(`${section} kaydedildi.`) }

  const addValue = () => {
    const v: AboutValue = { id: Date.now().toString(), iconName: 'Star', title: 'Yeni Değer', description: 'Açıklama buraya yazılacak.' }
    setF(p => ({ ...p, aboutValues: [...p.aboutValues, v] }))
  }

  const updateValue = (id: string, field: keyof AboutValue, val: string) =>
    setF(p => ({ ...p, aboutValues: p.aboutValues.map(v => v.id === id ? { ...v, [field]: val } : v) }))

  const removeValue = (id: string) =>
    setF(p => ({ ...p, aboutValues: p.aboutValues.filter(v => v.id !== id) }))

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

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Hakkımızda</h1>
        <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>Hakkımızda sayfasının içeriğini düzenleyin</p>
      </div>

      <Card title="🏠 Sayfa Başlığı">
        <div>
          <Lbl>Hero Alt Metni</Lbl>
          <textarea value={f.aboutHeroSub} onChange={e => set('aboutHeroSub')(e.target.value)} rows={2} style={{ ...F, resize: 'vertical' }} />
        </div>
        <SaveBtn onClick={() => save('Sayfa başlığı')} />
      </Card>

      <Card title="📖 Kuruluş Hikayemiz">
        <div>
          <Lbl>1. Paragraf</Lbl>
          <textarea value={f.aboutFounding1} onChange={e => set('aboutFounding1')(e.target.value)} rows={4} style={{ ...F, resize: 'vertical' }} />
        </div>
        <div>
          <Lbl>2. Paragraf</Lbl>
          <textarea value={f.aboutFounding2} onChange={e => set('aboutFounding2')(e.target.value)} rows={4} style={{ ...F, resize: 'vertical' }} />
        </div>
        <SaveBtn onClick={() => save('Kuruluş hikayesi')} />
      </Card>

      <Card title="🎯 Misyon Kartı">
        <div>
          <Lbl>Başlık</Lbl>
          <input value={f.aboutMissionTitle} onChange={e => set('aboutMissionTitle')(e.target.value)} style={F} />
        </div>
        <div>
          <Lbl>Metin</Lbl>
          <textarea value={f.aboutMission} onChange={e => set('aboutMission')(e.target.value)} rows={4} style={{ ...F, resize: 'vertical' }} />
        </div>
        <SaveBtn onClick={() => save('Misyon')} />
      </Card>

      <Card title="🔭 Vizyon Kartı">
        <div>
          <Lbl>Başlık</Lbl>
          <input value={f.aboutVisionTitle} onChange={e => set('aboutVisionTitle')(e.target.value)} style={F} />
        </div>
        <div>
          <Lbl>Metin</Lbl>
          <textarea value={f.aboutVision} onChange={e => set('aboutVision')(e.target.value)} rows={4} style={{ ...F, resize: 'vertical' }} />
        </div>
        <SaveBtn onClick={() => save('Vizyon')} />
      </Card>

      {/* Values */}
      <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F0F3FA' }}>
          <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 16 }}>✨ Değerlerimiz ({f.aboutValues.length})</h3>
          <button onClick={addValue} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', background: 'rgba(0,51,153,0.08)', border: '1px solid rgba(0,51,153,0.15)',
            borderRadius: 8, color: NAVY, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            <Plus size={14} /> Ekle
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {f.aboutValues.map((v) => (
            <div key={v.id} style={{ background: '#F5F7FC', border: '1px solid #E2E8F5', borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(0,51,153,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: NAVY, fontSize: 14, fontWeight: 800,
                }}>{v.iconName[0]}</div>
                <button onClick={() => removeValue(v.id)} style={{
                  padding: 5, background: 'rgba(220,38,38,0.08)', border: 'none',
                  borderRadius: 7, cursor: 'pointer', color: '#DC2626',
                }}>
                  <Trash2 size={13} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <Lbl>İkon</Lbl>
                  <select value={v.iconName} onChange={e => updateValue(v.id, 'iconName', e.target.value)} style={F}>
                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <Lbl>Başlık</Lbl>
                  <input value={v.title} onChange={e => updateValue(v.id, 'title', e.target.value)} style={F} />
                </div>
                <div>
                  <Lbl>Açıklama</Lbl>
                  <textarea value={v.description} onChange={e => updateValue(v.id, 'description', e.target.value)} rows={2} style={{ ...F, resize: 'none' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button onClick={() => save('Değerler')} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 24px', background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`,
            color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
          }}>
            <Save size={15} /> Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}

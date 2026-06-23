import { useState } from 'react'
import { Save, MapPin, Phone, Mail, Globe } from 'lucide-react'
import { useSiteContent } from '../store'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

const F: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52', outline: 'none', boxSizing: 'border-box',
}

function Lbl({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{children}</label>
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: 28, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F0F3FA' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,51,153,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: NAVY }}>
          {icon}
        </div>
        <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 16 }}>{title}</h3>
      </div>
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

export default function ContactEditor() {
  const { content, updateContent } = useSiteContent()
  const [f, setF] = useState({ ...content })
  const [toast, setToast] = useState('')

  const set = (k: keyof typeof f) => (v: string) => setF(p => ({ ...p, [k]: v }))
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }
  const save = (section: string) => { updateContent(f); showToast(`${section} kaydedildi.`) }

  const socials = [
    { key: 'socialTwitter' as const, label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
    { key: 'socialInstagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/...' },
    { key: 'socialFacebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/...' },
    { key: 'socialYoutube' as const, label: 'YouTube', placeholder: 'https://youtube.com/...' },
    { key: 'socialThreads' as const, label: 'Threads', placeholder: 'https://threads.net/...' },
  ]

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
        <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>İletişim Bilgileri</h1>
        <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>İletişim sayfasında görünecek bilgileri düzenleyin</p>
      </div>

      <Card title="Adres & İletişim" icon={<MapPin size={18} />}>
        <div>
          <Lbl>Adres</Lbl>
          <textarea
            value={f.contactAddress}
            onChange={e => set('contactAddress')(e.target.value)}
            rows={2}
            style={{ ...F, resize: 'none' }}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Lbl>Telefon</Lbl>
            <div style={{ position: 'relative' }}>
              <Phone size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9AA5C0' }} />
              <input
                value={f.contactPhone}
                onChange={e => set('contactPhone')(e.target.value)}
                style={{ ...F, paddingLeft: 34 }}
                placeholder="+90 5xx xxx xx xx"
              />
            </div>
          </div>
          <div>
            <Lbl>E-posta</Lbl>
            <div style={{ position: 'relative' }}>
              <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9AA5C0' }} />
              <input
                value={f.contactEmail}
                onChange={e => set('contactEmail')(e.target.value)}
                style={{ ...F, paddingLeft: 34 }}
                placeholder="info@feder.org.tr"
                type="email"
              />
            </div>
          </div>
        </div>
        <SaveBtn onClick={() => save('İletişim bilgileri')} />
      </Card>

      <Card title="Sosyal Medya Linkleri" icon={<Globe size={18} />}>
        <div style={{
          background: 'rgba(0,51,153,0.04)', border: '1px solid rgba(0,51,153,0.1)',
          borderRadius: 10, padding: '10px 14px', color: '#5A6A9A', fontSize: 13,
        }}>
          💡 Linkleri tam URL olarak girin (https:// ile başlamalı)
        </div>
        {socials.map(s => (
          <div key={s.key}>
            <Lbl>{s.label}</Lbl>
            <input
              value={f[s.key]}
              onChange={e => set(s.key)(e.target.value)}
              style={F}
              placeholder={s.placeholder}
            />
          </div>
        ))}
        <SaveBtn onClick={() => save('Sosyal medya linkleri')} />
      </Card>

      {/* Preview */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`, borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: YELLOW }} />
        <h3 style={{ color: 'white', fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Önizleme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <MapPin size={16} style={{ color: YELLOW, flexShrink: 0, marginTop: 2 }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{f.contactAddress || '—'}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Phone size={16} style={{ color: YELLOW, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{f.contactPhone || '—'}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Mail size={16} style={{ color: YELLOW, flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{f.contactEmail || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

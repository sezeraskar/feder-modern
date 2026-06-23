import { useState } from 'react'
import { Save, Eye } from 'lucide-react'
import { useSiteContent } from '../store'

const NAVY = '#003399'
const NAVY_DARK = '#0D1B52'
const YELLOW = '#FFCD00'

const F: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: '#F5F7FC', border: '1.5px solid #E2E8F5',
  borderRadius: 10, fontSize: 14, color: '#0D1B52', outline: 'none',
  boxSizing: 'border-box',
}

function Lbl({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', color: '#5A6A9A', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{children}</label>
}

function Field({ label, value, onChange, multiline, rows, hint }: {
  label: string; value: string; onChange: (v: string) => void
  multiline?: boolean; rows?: number; hint?: string
}) {
  return (
    <div>
      <Lbl>{label}</Lbl>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows ?? 3} style={{ ...F, resize: 'vertical' }} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={F} />}
      {hint && <p style={{ color: '#B0BAD0', fontSize: 11, marginTop: 4 }}>{hint}</p>}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: 28, marginBottom: 20 }}>
      <h3 style={{ color: NAVY_DARK, fontWeight: 800, fontSize: 16, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #F0F3FA' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  )
}

export default function HeroEditor() {
  const { content, updateContent } = useSiteContent()
  const [toast, setToast] = useState('')

  const [f, setF] = useState({ ...content })
  const set = (k: keyof typeof f) => (v: string) => setF(p => ({ ...p, [k]: v }))

  const save = (section: string) => {
    updateContent(f)
    setToast(`${section} kaydedildi.`)
    setTimeout(() => setToast(''), 2500)
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: NAVY_DARK, fontSize: 26, fontWeight: 900 }}>Anasayfa & Hero</h1>
          <p style={{ color: '#9AA5C0', fontSize: 14, marginTop: 4 }}>Ana sayfanın tüm metinlerini buradan düzenleyin</p>
        </div>
        <a href="/" target="_blank" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 18px', background: 'white', border: '1px solid #E2E8F5',
          borderRadius: 10, color: '#5A6A9A', fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>
          <Eye size={14} /> Siteyi Önizle
        </a>
      </div>

      {/* Hero Banner */}
      <Card title="🦸 Hero Bölümü">
        <div className="grid sm:grid-cols-2 gap-4">
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Üst Rozet Yazısı" value={f.heroBadge} onChange={set('heroBadge')} hint="Hero bölümünün üstündeki küçük rozet" />
          </div>
          <Field label="Başlık — 1. Satır" value={f.heroLine1} onChange={set('heroLine1')} />
          <Field label="Başlık — 2. Satır (sarı vurgulu)" value={f.heroLine2} onChange={set('heroLine2')} />
          <Field label="Başlık — 3. Satır" value={f.heroLine3} onChange={set('heroLine3')} />
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Alt Metin (subtitle)" value={f.heroSubtitle} onChange={set('heroSubtitle')} multiline rows={3} />
          </div>
          <Field label="1. Buton Yazısı" value={f.heroCta1} onChange={set('heroCta1')} />
          <Field label="2. Buton Yazısı" value={f.heroCta2} onChange={set('heroCta2')} />
        </div>
        <SaveBtn onClick={() => save('Hero bölümü')} />
      </Card>

      {/* Quote card */}
      <Card title="💬 Alıntı Kartı">
        <Field label="Alıntı Metni" value={f.heroQuote} onChange={set('heroQuote')} multiline rows={3} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Alıntı Sahibi" value={f.heroQuoteAuthor} onChange={set('heroQuoteAuthor')} />
          <Field label="Alıntı Sahibi Ünvanı" value={f.heroQuoteRole} onChange={set('heroQuoteRole')} />
        </div>
        <SaveBtn onClick={() => save('Alıntı kartı')} />
      </Card>

      {/* Stats */}
      <Card title="📊 İstatistik Kartları (4 adet)">
        <div className="grid sm:grid-cols-2 gap-4">
          {f.stats.map((s, i) => (
            <div key={i} style={{ background: '#F5F7FC', border: '1px solid #E2E8F5', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: NAVY, textAlign: 'center', marginBottom: 14 }}>{s.value || '—'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <Lbl>Değer</Lbl>
                  <input value={s.value} onChange={e => setF(p => ({ ...p, stats: p.stats.map((x, j) => j === i ? { ...x, value: e.target.value } : x) }))} style={F} placeholder="1986, 38+..." />
                </div>
                <div>
                  <Lbl>Etiket</Lbl>
                  <input value={s.label} onChange={e => setF(p => ({ ...p, stats: p.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) }))} style={F} placeholder="Kuruluş Yılı..." />
                </div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onClick={() => save('İstatistikler')} />
      </Card>

      {/* Mission / Vision */}
      <Card title="🎯 Misyon & Vizyon Kartları">
        <div className="grid sm:grid-cols-2 gap-5">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Misyon Başlığı" value={f.homeMissionTitle} onChange={set('homeMissionTitle')} />
            <Field label="Misyon Metni" value={f.homeMissionText} onChange={set('homeMissionText')} multiline rows={4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Vizyon Başlığı" value={f.homeVisionTitle} onChange={set('homeVisionTitle')} />
            <Field label="Vizyon Metni" value={f.homeVisionText} onChange={set('homeVisionText')} multiline rows={4} />
          </div>
        </div>
        <SaveBtn onClick={() => save('Misyon & Vizyon')} />
      </Card>

      {/* CTA Banner */}
      <Card title="📣 CTA Banner">
        <Field label="Başlık" value={f.homeCtaTitle} onChange={set('homeCtaTitle')} />
        <Field label="Alt Metin" value={f.homeCtaSub} onChange={set('homeCtaSub')} multiline rows={2} />
        <SaveBtn onClick={() => save('CTA Banner')} />
      </Card>
    </div>
  )
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '10px 24px', background: `linear-gradient(135deg, #0D1B52, #003399)`,
        color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
        cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,51,153,0.25)',
      }}>
        <Save size={15} /> Kaydet
      </button>
    </div>
  )
}

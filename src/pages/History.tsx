import { useContent } from '../hooks/useContent'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

export default function History() {
  const c = useContent()

  return (
    <>
      <section style={{ paddingTop: 128, paddingBottom: 80, background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Geçmişten Bugüne</span>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
          </div>
          <h1 style={{ fontSize: 'clamp(40px,6vw,68px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-1.5px' }}>
            Tarihçe<span style={{ color: YELLOW }}>miz</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7 }}>
            1986'dan günümüze FeDeR'in kesintisiz ve onurlu yolculuğu.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${NAVY}, rgba(0,51,153,0.1))` }} className="sm:left-1/2 sm:-translate-x-px" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {c.history.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', gap: 0, position: 'relative' }} className={i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}>
                  <div style={{ flex: 1, paddingLeft: 64 }} className={`sm:!p-0 ${i % 2 === 0 ? 'sm:pr-16' : 'sm:pl-16'}`}>
                    <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, padding: '24px 28px', boxShadow: '0 4px 16px rgba(0,51,153,0.06)', transition: 'all 0.25s', borderLeft: `4px solid ${NAVY}` }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,51,153,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,51,153,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ display: 'inline-block', background: NAVY, color: YELLOW, fontSize: 12, fontWeight: 800, padding: '3px 12px', borderRadius: 100, marginBottom: 12 }}>
                        {item.year}
                      </div>
                      <h3 style={{ color: '#0D1B52', fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{item.title}</h3>
                      <p style={{ color: '#5A6A9A', fontSize: 14, lineHeight: 1.75 }}>{item.description}</p>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', left: 20, top: 24, width: 18, height: 18, borderRadius: '50%', background: YELLOW, border: `3px solid ${NAVY}`, boxShadow: `0 0 0 4px rgba(0,51,153,0.12)`, zIndex: 10 }} className="sm:left-1/2 sm:-translate-x-1/2" />
                  <div className="hidden sm:block" style={{ flex: 1 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

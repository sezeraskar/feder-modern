import { useState } from 'react'
import { boardMembers } from '../data/content'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const avatarColors = [
  { bg: NAVY, text: 'white' },
  { bg: '#0044CC', text: 'white' },
  { bg: NAVY_DARK, text: YELLOW },
  { bg: '#1A3A8F', text: 'white' },
  { bg: '#0055DD', text: 'white' },
  { bg: '#002277', text: YELLOW },
]

function getColor(i: number) {
  return avatarColors[i % avatarColors.length]
}

export default function Management() {
  const [activeBoard, setActiveBoard] = useState<1 | 2>(1)

  const board1 = boardMembers.filter(m => m.board === 1)
  const board2 = boardMembers.filter(m => m.board === 2)
  const board1Leaders = board1.slice(0, 1)
  const board1Rest = board1.slice(1)
  const currentBoard2 = board2

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: 128, paddingBottom: 80,
        background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Liderlik</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-1.5px' }}>
            Yönetim <span style={{ color: YELLOW }}>Kurulu</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18 }}>Derneğimizin seçilmiş yönetim kurulu üyelerini tanıyın.</p>
        </div>
      </section>

      {/* Board content */}
      <section style={{ padding: '64px 0 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 48 }}>
            {([1, 2] as const).map((board) => (
              <button
                key={board}
                onClick={() => setActiveBoard(board)}
                style={{
                  padding: '10px 24px', borderRadius: 12,
                  fontSize: 14, fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeBoard === board ? NAVY : 'white',
                  color: activeBoard === board ? 'white' : '#5A6A9A',
                  boxShadow: activeBoard === board ? '0 4px 16px rgba(0,51,153,0.25)' : '0 1px 4px rgba(0,51,153,0.08)',
                  border: activeBoard === board ? 'none' : '1px solid #E2E8F5',
                } as React.CSSProperties}
              >
                {board}. Yönetim Kurulu
              </button>
            ))}
          </div>

          {activeBoard === 1 ? (
            <>
              {/* President */}
              {board1Leaders.map((member, i) => (
                <div key={i} style={{
                  background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
                  borderRadius: 24, padding: '36px 40px',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28,
                  marginBottom: 28,
                  boxShadow: '0 12px 40px rgba(0,51,153,0.2)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
                  <div style={{
                    width: 84, height: 84, borderRadius: 20,
                    background: YELLOW,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 8px 24px rgba(255,205,0,0.4)',
                  }}>
                    <span style={{ color: NAVY_DARK, fontWeight: 900, fontSize: 24 }}>{getInitials(member.name)}</span>
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(255,205,0,0.15)', border: '1px solid rgba(255,205,0,0.3)',
                      borderRadius: 100, padding: '4px 14px', marginBottom: 10,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: YELLOW }} />
                      <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.title}</span>
                    </div>
                    <h2 style={{ color: 'white', fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px' }}>{member.name}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 4 }}>FeDeR — Fenerbahçeliler Derneği</p>
                  </div>
                </div>
              ))}

              {/* Rest */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {board1Rest.map((member, i) => {
                  const color = getColor(i + 1)
                  return (
                    <div key={i} style={{
                      background: 'white', border: '1px solid #E2E8F5',
                      borderRadius: 16, padding: '18px 20px',
                      display: 'flex', alignItems: 'center', gap: 14,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0,51,153,0.05)',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,51,153,0.05)'; e.currentTarget.style.borderColor = '#E2E8F5' }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        backgroundColor: color.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ color: color.text, fontWeight: 800, fontSize: 13 }}>{getInitials(member.name)}</span>
                      </div>
                      <div>
                        <div style={{ color: '#0D1B52', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{member.name}</div>
                        <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{member.title}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentBoard2.map((member, i) => {
                const color = getColor(i)
                return (
                  <div key={i} style={{
                    background: 'white', border: '1px solid #E2E8F5',
                    borderRadius: 16, padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,51,153,0.05)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,51,153,0.05)'; e.currentTarget.style.borderColor = '#E2E8F5' }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      backgroundColor: color.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ color: color.text, fontWeight: 800, fontSize: 13 }}>{getInitials(member.name)}</span>
                    </div>
                    <div>
                      <div style={{ color: '#0D1B52', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{member.name}</div>
                      <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{member.title}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

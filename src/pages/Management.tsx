import { useState } from 'react'
import { boardMembers, additionalCouncils } from '../data/content'

const NAVY = '#003399'
const NAVY_DARK = '#001F6B'
const YELLOW = '#FFCD00'

const TABS = [
  { key: 'yk', label: 'Yönetim Kurulu' },
  { key: 'denetim', label: 'Denetim Kurulu' },
  { key: 'haysiyet', label: 'Haysiyet Kurulu' },
  { key: 'sicil', label: 'Sicil Kurulu' },
]

function getInitials(name: string) {
  return name.split(' ').map(n => n[0] ?? '').join('').slice(0, 2).toUpperCase()
}

const avatarColors = ['#003399', '#0044CC', '#001F6B', '#1A3A8F', '#0055DD', '#002277']
function getColor(i: number) { return avatarColors[i % avatarColors.length] }

function CouncilCard({ name, members }: { name: string; members: string[] }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,51,153,0.05)' }}>
      <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK}, ${NAVY})`, padding: '14px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: YELLOW }} />
        <h3 style={{ color: 'white', fontWeight: 800, fontSize: 15, margin: 0 }}>{name}</h3>
      </div>
      <div style={{ padding: '8px 0' }}>
        {members.map((member, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < members.length - 1 ? '1px solid #F5F7FC' : 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: getColor(i), display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 11 }}>{getInitials(member)}</span>
            </div>
            <div>
              <div style={{ color: '#0D1B52', fontWeight: 600, fontSize: 14 }}>{member}</div>
              <div style={{ color: '#9AA5C0', fontSize: 12 }}>{i + 1}. Üye</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Management() {
  const [activeTab, setActiveTab] = useState('yk')
  const [activeBoard, setActiveBoard] = useState<1 | 2>(1)

  const board1 = boardMembers.filter(m => m.board === 1)
  const board2 = boardMembers.filter(m => m.board === 2)
  const board1Leaders = board1.slice(0, 1)
  const board1Rest = board1.slice(1)
  const activeCouncil = additionalCouncils.find(c => c.group.toLowerCase().includes(activeTab))

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 80, background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: YELLOW }} />
            <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Liderlik</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px,6vw,68px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-1.5px' }}>
            Yönetim <span style={{ color: YELLOW }}>Organları</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18 }}>Derneğimizin seçilmiş yönetim organlarını tanıyın.</p>
        </div>
      </section>

      {/* Tab navigation */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F5', position: 'sticky', top: 80, zIndex: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '16px 24px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                color: activeTab === tab.key ? NAVY : '#9AA5C0',
                borderBottom: `3px solid ${activeTab === tab.key ? NAVY : 'transparent'}`,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section style={{ padding: '48px 0 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

          {/* Yönetim Kurulu */}
          {activeTab === 'yk' && (
            <>
              <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                {([1, 2] as const).map(board => (
                  <button key={board} onClick={() => setActiveBoard(board)} style={{
                    padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    background: activeBoard === board ? NAVY : 'white',
                    color: activeBoard === board ? 'white' : '#5A6A9A',
                    boxShadow: activeBoard === board ? '0 4px 16px rgba(0,51,153,0.25)' : '0 1px 4px rgba(0,51,153,0.08)',
                  }}>
                    {board}. Yönetim Kurulu
                  </button>
                ))}
              </div>

              {activeBoard === 1 ? (
                <>
                  {board1Leaders.map((member, i) => (
                    <div key={i} style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, borderRadius: 24, padding: '36px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28, marginBottom: 28, boxShadow: '0 12px 40px rgba(0,51,153,0.2)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, backgroundColor: YELLOW }} />
                      <div style={{ width: 84, height: 84, borderRadius: 20, background: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 24px rgba(255,205,0,0.4)' }}>
                        <span style={{ color: NAVY_DARK, fontWeight: 900, fontSize: 24 }}>{getInitials(member.name)}</span>
                      </div>
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,205,0,0.15)', border: '1px solid rgba(255,205,0,0.3)', borderRadius: 100, padding: '4px 14px', marginBottom: 10 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: YELLOW }} />
                          <span style={{ color: YELLOW, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.title}</span>
                        </div>
                        <h2 style={{ color: 'white', fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px' }}>{member.name}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 4 }}>FeDeR — Fenerbahçeliler Derneği</p>
                      </div>
                    </div>
                  ))}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {board1Rest.map((member, i) => (
                      <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,51,153,0.05)' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)' }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,51,153,0.05)'; e.currentTarget.style.borderColor = '#E2E8F5' }}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, backgroundColor: getColor(i + 1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>{getInitials(member.name)}</span>
                        </div>
                        <div>
                          <div style={{ color: '#0D1B52', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{member.name}</div>
                          <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{member.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {board2.map((member, i) => (
                    <div key={i} style={{ background: 'white', border: '1px solid #E2E8F5', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,51,153,0.05)' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,51,153,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,51,153,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,51,153,0.05)'; e.currentTarget.style.borderColor = '#E2E8F5' }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, backgroundColor: getColor(i), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>{getInitials(member.name)}</span>
                      </div>
                      <div>
                        <div style={{ color: '#0D1B52', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{member.name}</div>
                        <div style={{ color: '#9AA5C0', fontSize: 12, marginTop: 2 }}>{member.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Other councils */}
          {activeTab !== 'yk' && activeCouncil && (
            <div>
              <h2 style={{ color: '#0D1B52', fontSize: 20, fontWeight: 800, marginBottom: 24 }}>{activeCouncil.group}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {activeCouncil.boards.map((board, i) => (
                  <CouncilCard key={i} name={board.name} members={board.members} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

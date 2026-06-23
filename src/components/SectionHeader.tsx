const NAVY = '#003399'

interface SectionHeaderProps {
  tag?: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({ tag, title, highlight, subtitle, center = false }: SectionHeaderProps) {
  const parts = highlight ? title.split(highlight) : [title]

  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      {tag && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: center ? 'center' : 'flex-start' }}>
          <div style={{ width: 28, height: 2, backgroundColor: NAVY }} />
          <span style={{ color: NAVY, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{tag}</span>
          <div style={{ width: 28, height: 2, backgroundColor: NAVY }} />
        </div>
      )}
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 900,
        color: '#0D1B52',
        lineHeight: 1.1,
        marginBottom: 16,
        letterSpacing: '-0.5px',
      }}>
        {parts[0]}
        {highlight && <span style={{ color: NAVY }}>{highlight}</span>}
        {parts[1]}
      </h2>
      {subtitle && (
        <p style={{ color: '#5A6A9A', fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

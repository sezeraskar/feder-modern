import { Calendar, Tag, ArrowRight } from 'lucide-react'

const NAVY = '#003399'

interface NewsCardProps {
  category: string
  title: string
  excerpt: string
  date: string
  index?: number
}

const categoryColors: Record<string, { text: string; bg: string }> = {
  'Dernek Haberleri': { text: '#003399', bg: 'rgba(0,51,153,0.08)' },
  'Spor Haberleri':   { text: '#0B6B1F', bg: 'rgba(11,107,31,0.08)' },
  'Voleybol':         { text: '#6B0BB5', bg: 'rgba(107,11,181,0.08)' },
  'FeDeR Akademi':    { text: '#B56B00', bg: 'rgba(181,107,0,0.08)' },
  'Duyuru':           { text: '#B58A00', bg: 'rgba(181,138,0,0.10)' },
}

export default function NewsCard({ category, title, excerpt, date, index = 0 }: NewsCardProps) {
  const colors = categoryColors[category] ?? { text: NAVY, bg: 'rgba(0,51,153,0.08)' }

  return (
    <article
      className="animate-fadeInUp opacity-0"
      style={{
        backgroundColor: 'white',
        border: '1px solid #E2E8F5',
        borderRadius: 20,
        padding: 24,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 8px 32px rgba(0,51,153,0.12)'
        el.style.borderColor = 'rgba(0,51,153,0.2)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'none'
        el.style.borderColor = '#E2E8F5'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 11, fontWeight: 700,
          padding: '4px 10px', borderRadius: 100,
          color: colors.text, backgroundColor: colors.bg,
        }}>
          <Tag size={10} />
          {category}
        </span>
        <span style={{ color: '#9AA5C0', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Calendar size={11} />
          {date}
        </span>
      </div>

      <h3 style={{ color: '#0D1B52', fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 10, transition: 'color 0.2s' }}>
        {title}
      </h3>

      <p style={{ color: '#5A6A9A', fontSize: 13, lineHeight: 1.65, marginBottom: 20 }}>
        {excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: NAVY, fontSize: 13, fontWeight: 600 }}>
        <span>Devamını Oku</span>
        <ArrowRight size={14} />
      </div>
    </article>
  )
}

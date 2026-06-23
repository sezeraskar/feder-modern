import { useNavigate } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

const NAVY = '#003399'

interface NewsCardProps {
  id: number
  category: string
  title: string
  excerpt: string
  date: string
  image?: string | null
  index?: number
}

const categoryColors: Record<string, { text: string; bg: string; gradient: string }> = {
  'Dernek Haberleri': { text: '#003399', bg: 'rgba(0,51,153,0.08)', gradient: 'linear-gradient(135deg,#003399,#0044CC)' },
  'Spor Haberleri':   { text: '#0B6B1F', bg: 'rgba(11,107,31,0.08)', gradient: 'linear-gradient(135deg,#0B6B1F,#16A34A)' },
  'Voleybol':         { text: '#6B0BB5', bg: 'rgba(107,11,181,0.08)', gradient: 'linear-gradient(135deg,#6B0BB5,#9333EA)' },
  'FeDeR Akademi':    { text: '#B56B00', bg: 'rgba(181,107,0,0.08)', gradient: 'linear-gradient(135deg,#B56B00,#D97706)' },
  'Duyuru':           { text: '#B58A00', bg: 'rgba(181,138,0,0.10)', gradient: 'linear-gradient(135deg,#B58A00,#CA8A04)' },
}

export default function NewsCard({ id, category, title, excerpt, date, image, index = 0 }: NewsCardProps) {
  const navigate = useNavigate()
  const colors = categoryColors[category] ?? { text: NAVY, bg: 'rgba(0,51,153,0.08)', gradient: 'linear-gradient(135deg,#003399,#0044CC)' }

  return (
    <article
      className="animate-fadeInUp opacity-0"
      onClick={() => navigate(`/haberler/${id}`)}
      style={{
        background: 'white', border: '1px solid #E2E8F5', borderRadius: 20,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.25s ease',
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 8px 32px rgba(0,51,153,0.12)'
        el.style.borderColor = 'rgba(0,51,153,0.2)'
        el.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'none'
        el.style.borderColor = '#E2E8F5'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Image */}
      <div style={{
        height: 180, flexShrink: 0,
        background: image
          ? `url(${image}) center/cover no-repeat`
          : colors.gradient,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {!image && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.15,
          }}>
            <span style={{ fontSize: 64, color: 'white' }}>📰</span>
          </div>
        )}
        {/* Category badge on image */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
            color: colors.text, background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
          }}>
            <Tag size={10} /> {category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10, color: '#9AA5C0', fontSize: 12 }}>
          <Calendar size={11} /> {date}
        </div>

        <h3 style={{ color: '#0D1B52', fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 10, flex: 1 }}>
          {title}
        </h3>

        <p style={{ color: '#5A6A9A', fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>
          {excerpt.length > 100 ? excerpt.slice(0, 100) + '...' : excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: NAVY, fontSize: 13, fontWeight: 600 }}>
          <span>Devamını Oku</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </article>
  )
}

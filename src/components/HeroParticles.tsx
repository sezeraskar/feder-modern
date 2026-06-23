import { useEffect, useRef } from 'react'

interface Dot {
  x: number; y: number
  vx: number; vy: number
  r: number; gold: boolean; alpha: number
}

export default function HeroParticles({ count = 75 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const resize = () => {
      canvas.width = W() * dpr
      canvas.height = H() * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const dots: Dot[] = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.7,
      gold: Math.random() < 0.18,
      alpha: Math.random() * 0.55 + 0.3,
    }))

    const CONNECT = 140

    const tick = () => {
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      // move + wrap
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = w
        else if (d.x > w) d.x = 0
        if (d.y < 0) d.y = h
        else if (d.y > h) d.y = 0
      })

      // connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.hypot(dx, dy)
          if (dist >= CONNECT) continue
          const t = 1 - dist / CONNECT
          const isGold = dots[i].gold || dots[j].gold
          ctx.beginPath()
          ctx.strokeStyle = isGold
            ? `rgba(255,205,0,${t * 0.4})`
            : `rgba(255,255,255,${t * 0.18})`
          ctx.lineWidth = isGold ? 1 : 0.7
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.stroke()
        }
      }

      // dots
      dots.forEach(d => {
        ctx.beginPath()
        if (d.gold) {
          ctx.shadowBlur = 14
          ctx.shadowColor = 'rgba(255,205,0,0.9)'
          ctx.fillStyle = `rgba(255,205,0,${d.alpha})`
          ctx.arc(d.x, d.y, d.r + 1, 0, Math.PI * 2)
        } else {
          ctx.shadowBlur = 5
          ctx.shadowColor = 'rgba(255,255,255,0.5)'
          ctx.fillStyle = `rgba(255,255,255,${d.alpha})`
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })

      raf = requestAnimationFrame(tick)
    }

    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [count])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

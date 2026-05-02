import { useState, useEffect, useRef, useCallback } from 'react'
import { INGREDIENTS } from '../utils/gameLogic'
import ProgressBar from '../components/ProgressBar'

function randomItem(id) {
  return {
    id,
    emoji: INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)],
    x: 5 + Math.random() * 85,
    y: -10,
    speed: 1.5 + Math.random() * 1.5,
  }
}

export default function AtrapaIngredientes({ phase, onWin, onFail }) {
  const [basketX, setBasketX] = useState(50)
  const [items, setItems] = useState([])
  const [caught, setCaught] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const idRef = useRef(0)
  const doneRef = useRef(false)
  const containerRef = useRef(null)

  // Spawn items
  useEffect(() => {
    const interval = setInterval(() => {
      if (doneRef.current) return
      setItems(prev => [...prev, randomItem(idRef.current++)])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  // Move items down
  useEffect(() => {
    let raf
    function tick() {
      if (doneRef.current) return
      setItems(prev => prev
        .map(i => ({ ...i, y: i.y + i.speed }))
        .filter(i => i.y < 110)
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Collision detection
  useEffect(() => {
    setItems(prev => {
      const basket = { x: basketX, width: 12 }
      const caught_items = prev.filter(i => i.y > 82 && i.y < 95 && Math.abs(i.x - basket.x) < basket.width)
      if (caught_items.length > 0) {
        setCaught(c => {
          const next = c + caught_items.length
          if (next >= 15 && !doneRef.current) {
            doneRef.current = true
            setTimeout(onWin, 300)
          }
          return next
        })
        return prev.filter(i => !caught_items.includes(i))
      }
      return prev
    })
  }, [items, basketX])

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); if (!doneRef.current) { doneRef.current = true; onFail() } return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    setBasketX(((clientX - rect.left) / rect.width) * 100)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e) => { e.preventDefault(); handleMove(e) }
    el.addEventListener('touchmove', handler, { passive: false })
    return () => el.removeEventListener('touchmove', handler)
  }, [handleMove])

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden cursor-none select-none"
      style={{ background: 'linear-gradient(180deg, #e3f2fd 0%, #fff9c4 100%)' }}
      onMouseMove={handleMove}
    >
      <div className="pt-2 relative z-10">
        <ProgressBar currentPhase={phase} />
        <div className="text-center">
          <p className="font-black text-blue-800 text-sm">FASE 4 — ¡Atrapa los ingredientes!</p>
          <p className="text-xs text-blue-600">Objetivo: 15 ingredientes · {caught}/15 atrapados</p>
          <p className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-700'}`}>⏱ {timeLeft}s</p>
        </div>
      </div>

      {/* Falling items */}
      {items.map(item => (
        <div
          key={item.id}
          className="absolute text-3xl pointer-events-none"
          style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Basket */}
      <div
        className="absolute text-4xl pointer-events-none"
        style={{ left: `${basketX}%`, top: '85%', transform: 'translate(-50%, -50%)' }}
      >
        🧺
      </div>
    </div>
  )
}

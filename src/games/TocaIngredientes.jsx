import { useState, useEffect, useRef } from 'react'
import { generateIngredients } from '../utils/gameLogic'
import ProgressBar from '../components/ProgressBar'

export default function TocaIngredientes({ phase, onWin, onFail }) {
  const startTime = useRef(Date.now())
  const [items, setItems] = useState(() => {
    const now = Date.now()
    return generateIngredients().map(i => ({ ...i, createdAt: now }))
  })
  const missedRef = useRef(0)
  const wonRef = useRef(false)

  useEffect(() => {
    const timers = items.map(item =>
      setTimeout(() => {
        if (wonRef.current) return
        missedRef.current += 1
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, alive: false } : i))
        if (missedRef.current >= 3) onFail()
      }, 10000)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  function handleClick(id) {
    if (wonRef.current) return
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, alive: false, clicked: true } : i)
      const allClicked = next.every(i => !i.alive)
      if (allClicked && missedRef.current < 3) {
        wonRef.current = true
        setTimeout(onWin, 300)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden select-none"
         style={{ background: 'linear-gradient(135deg, #fff9c4, #ffcc80, #f48fb1)' }}>
      <div className="pt-2">
        <ProgressBar currentPhase={phase} />
        <p className="text-center font-black text-orange-800 text-sm mb-1">FASE 1 — ¡Toca todos los ingredientes!</p>
        <p className="text-center text-xs text-orange-600">No dejes que desaparezcan más de 2</p>
      </div>
      {items.filter(i => i.alive).map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-90 transition-transform"
          style={{ left: `${item.x}%`, top: `${item.y + 15}%` }}
        >
          {item.emoji}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded">
            <div
              className="h-1 bg-red-400 rounded"
              style={{
                animation: 'shrink 10s linear forwards',
                animationDelay: `${-(Date.now() - item.createdAt)}ms`,
                width: '100%'
              }}
            />
          </div>
        </button>
      ))}
      <style>{`
        @keyframes shrink { from { width: 100% } to { width: 0% } }
      `}</style>
    </div>
  )
}

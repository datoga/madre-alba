import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../components/ProgressBar'

export default function MomentoExacto({ phase, onWin, onFail }) {
  const [position, setPosition] = useState(0)
  const [attempts, setAttempts] = useState([]) // true/false per attempt
  const [lastResult, setLastResult] = useState(null) // 'hit' | 'miss'
  const [greenHalf, setGreenHalf] = useState(15) // zona verde: 50% ± greenHalf, se estrecha en cada acierto
  const [done, setDone] = useState(false)
  const dirRef = useRef(1)
  const posRef = useRef(0)
  const doneRef = useRef(false)
  const TOTAL = 5
  const NEEDED = 3

  useEffect(() => {
    let raf
    function tick() {
      if (doneRef.current) return
      posRef.current += dirRef.current * 0.8
      if (posRef.current >= 100 || posRef.current <= 0) dirRef.current *= -1
      setPosition(Math.round(posRef.current))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  function handlePress() {
    if (doneRef.current) return
    const isHit = Math.abs(posRef.current - 50) <= greenHalf
    const result = isHit ? 'hit' : 'miss'
    setLastResult(result)
    if (isHit) setGreenHalf(h => Math.max(h - 2, 6)) // se estrecha en cada acierto (mínimo ±6%)

    const newAttempts = [...attempts, isHit]
    setAttempts(newAttempts)

    const hits = newAttempts.filter(Boolean).length

    setTimeout(() => setLastResult(null), 600)

    if (hits >= NEEDED) {
      doneRef.current = true
      setDone(true)
      setTimeout(onWin, 700)
    } else if (newAttempts.length === TOTAL && hits < NEEDED) {
      doneRef.current = true
      setDone(true)
      setTimeout(onFail, 700)
    }
  }

  const hits = attempts.filter(Boolean).length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
         style={{ background: 'linear-gradient(135deg, #fff9c4, #ffcc80, #f48fb1)' }}>
      <ProgressBar currentPhase={phase} />
      <p className="font-black text-orange-800 text-sm mb-1">FASE 5 — ¡Momento exacto!</p>
      <p className="text-xs text-orange-600 mb-6">Pulsa cuando el indicador esté en la zona verde</p>

      {/* Barra */}
      <div className="relative w-full max-w-xs h-10 bg-gray-200 rounded-full overflow-hidden mb-6 shadow-inner">
        {/* Zona verde (se estrecha con cada acierto) */}
        <div className="absolute top-0 bottom-0 bg-green-400 rounded-full opacity-60 transition-all"
             style={{ left: `${50 - greenHalf}%`, width: `${greenHalf * 2}%` }} />
        {/* Indicador */}
        <div
          className={`absolute top-1 bottom-1 w-6 rounded-full shadow transition-colors
            ${lastResult === 'hit' ? 'bg-green-600' : lastResult === 'miss' ? 'bg-red-500' : 'bg-white'}`}
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Intentos */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i}
               className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
                 ${i < attempts.length ? (attempts[i] ? 'bg-green-400 text-white' : 'bg-red-400 text-white') : 'bg-gray-200 text-gray-400'}`}>
            {i < attempts.length ? (attempts[i] ? '✓' : '✗') : i + 1}
          </div>
        ))}
      </div>

      <p className="text-sm text-orange-700 mb-4">
        Aciertos: <strong>{hits}</strong> / necesitas {NEEDED} (quedan {TOTAL - attempts.length} intentos)
      </p>

      <button
        onClick={handlePress}
        disabled={done}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 disabled:opacity-50 text-white font-black text-2xl px-12 py-5 rounded-full shadow-lg transition-all"
      >
        ¡PULSA!
      </button>
    </div>
  )
}

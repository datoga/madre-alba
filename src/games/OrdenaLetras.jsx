import { useState } from 'react'
import { scrambleWord } from '../utils/gameLogic'
import ProgressBar from '../components/ProgressBar'

const TARGET = 'CACHOPO'

export default function OrdenaLetras({ phase, onWin, onFail }) {
  const [scrambled] = useState(() => scrambleWord(TARGET).split('').map((l, i) => ({ id: i, letter: l, used: false })))
  const [typed, setTyped] = useState([])
  const [shake, setShake] = useState(false)

  function handleLetter(item) {
    if (item.used) return
    const nextTyped = [...typed, item.letter]
    const target = TARGET.slice(0, nextTyped.length)

    if (nextTyped.join('') === target) {
      setTyped(nextTyped)
      if (nextTyped.length === TARGET.length) setTimeout(onWin, 400)
    } else {
      setShake(true)
      setTimeout(() => { setShake(false); setTyped([]) }, 600)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
         style={{ background: 'linear-gradient(135deg, #fff9c4, #ffcc80, #f48fb1)' }}>
      <ProgressBar currentPhase={phase} />
      <p className="font-black text-orange-800 text-sm mb-1">FASE 3 — ¡Ordena las letras!</p>
      <p className="text-xs text-orange-600 mb-6">Forma la palabra correcta tocando las letras en orden</p>

      {/* Letras escritas */}
      <div className={`flex gap-2 mb-8 ${shake ? 'animate-[wiggle_.3s_ease-in-out_2]' : ''}`}>
        {TARGET.split('').map((_, i) => (
          <div key={i}
               className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-black border-2
                 ${typed[i] ? 'bg-green-400 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
            {typed[i] || '_'}
          </div>
        ))}
      </div>

      {/* Letras disponibles */}
      <div className="flex flex-wrap gap-3 justify-center max-w-xs">
        {scrambled.map(item => {
          const usedCount = typed.filter(l => l === item.letter).length
          const totalCount = scrambled.filter(s => s.letter === item.letter).length
          const isUsed = usedCount >= totalCount
          return (
            <button
              key={item.id}
              onClick={() => handleLetter(item)}
              disabled={isUsed}
              className={`w-14 h-14 rounded-xl text-2xl font-black transition-all active:scale-90 shadow
                ${isUsed ? 'bg-gray-200 text-gray-400' : 'bg-pink-500 hover:bg-pink-400 text-white'}`}
            >
              {item.letter}
            </button>
          )
        })}
      </div>
      <style>{`
        @keyframes wiggle {
          0%,100% { transform: translateX(0) }
          25% { transform: translateX(-8px) }
          75% { transform: translateX(8px) }
        }
      `}</style>
    </div>
  )
}

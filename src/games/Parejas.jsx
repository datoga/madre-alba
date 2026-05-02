import { useState, useEffect, useRef } from 'react'
import { shuffle } from '../utils/gameLogic'
import ProgressBar from '../components/ProgressBar'

const CARD_EMOJIS = ['🧀', '🥦', '🥩', '❤️', '🍳', '🫕', '🥗', '🍖']

function buildDeck() {
  // 8 distinct emojis × 2 copies = 16 cards = 8 pairs (4×4 board)
  const pairs = [...CARD_EMOJIS, ...CARD_EMOJIS]
  return shuffle(pairs).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
}

export default function Parejas({ phase, onWin, onFail }) {
  const [cards, setCards] = useState(buildDeck)
  const [selected, setSelected] = useState([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [locked, setLocked] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); if (!doneRef.current) onFail(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function handleFlip(card) {
    if (locked || card.flipped || card.matched || doneRef.current) return
    const next = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c)
    const newSelected = [...selected, card]

    if (newSelected.length === 2) {
      setLocked(true)
      setCards(next)
      setTimeout(() => {
        const [a, b] = newSelected
        setCards(prev => {
          const updated = prev.map(c =>
            c.id === a.id || c.id === b.id
              ? { ...c, matched: a.emoji === b.emoji, flipped: a.emoji === b.emoji }
              : c
          )
          if (updated.every(c => c.matched)) {
            doneRef.current = true
            setTimeout(onWin, 300)
          }
          return updated
        })
        setSelected([])
        setLocked(false)
      }, 800)
    } else {
      setSelected(newSelected)
      setCards(next)
    }
  }

  return (
    <div className="min-h-screen flex flex-col"
         style={{ background: 'linear-gradient(135deg, #fff9c4, #ffcc80, #f48fb1)' }}>
      <ProgressBar currentPhase={phase} />
      <div className="text-center mb-2">
        <p className="font-black text-orange-800 text-sm">FASE 2 — ¡Encuentra las parejas!</p>
        <p className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-orange-600'}`}>
          ⏱ {timeLeft}s
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 max-w-sm mx-auto w-full">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center text-white font-black transition-all active:scale-95 shadow
              ${card.flipped || card.matched ? 'bg-white' : 'bg-pink-400 hover:bg-pink-300'}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  )
}

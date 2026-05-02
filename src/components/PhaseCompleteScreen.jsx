import { useEffect } from 'react'
import { launchConfetti } from '../utils/confetti'
import ProgressBar from './ProgressBar'

export default function PhaseCompleteScreen({ phase, onNext }) {
  useEffect(() => { launchConfetti() }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
         style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
      <ProgressBar currentPhase={phase + 1} />
      <div className="text-7xl mt-4 mb-4">🎉</div>
      <h1 className="text-3xl font-black text-green-700 mb-2">¡Fase {phase} superada!</h1>
      <p className="text-base text-green-800 mb-8">¡Qué grande! Sigue así 💪</p>
      <button
        onClick={onNext}
        className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black text-lg px-8 py-3 rounded-full shadow-lg transition-all"
      >
        Siguiente fase →
      </button>
    </div>
  )
}

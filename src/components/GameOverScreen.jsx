import ProgressBar from './ProgressBar'

export default function GameOverScreen({ phase, onRetry, onRestart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
         style={{ background: 'linear-gradient(135deg, #ffebee, #fce4ec)' }}>
      <ProgressBar currentPhase={phase} />
      <div className="text-7xl mt-4 mb-4">😅</div>
      <h1 className="text-3xl font-black text-red-700 mb-2">¡Casi!</h1>
      <p className="text-base text-red-800 mb-8">No te rindas, ¡puedes hacerlo! 💪</p>
      <button
        onClick={onRetry}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-lg px-8 py-3 rounded-full shadow-lg transition-all mb-3"
      >
        🔄 Reintentar fase
      </button>
      <button
        onClick={onRestart}
        className="text-sm text-red-400 underline"
      >
        Empezar desde el principio
      </button>
    </div>
  )
}

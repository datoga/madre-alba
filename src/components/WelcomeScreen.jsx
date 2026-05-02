export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
         style={{ background: 'linear-gradient(135deg, #fff9c4, #ffcc80, #f48fb1)' }}>
      <div className="text-6xl mb-4 animate-bounce">🌸</div>
      <h1 className="text-4xl font-black text-red-700 mb-2">¡Feliz Día de la Madre!</h1>
      <p className="text-xl font-bold text-amber-900 mb-1">Para Alba, con todo mi amor 💛</p>
      <p className="text-base text-amber-800 mb-10 max-w-xs">
        Supera los 5 retos para conseguir tu premio especial 🎁
      </p>
      <button
        onClick={onStart}
        className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-full shadow-lg transition-all"
      >
        ¡Jugar! 🎮
      </button>
      <div className="mt-8 text-3xl space-x-3 opacity-70">
        <span>🧀</span><span>🥦</span><span>🥩</span><span>❤️</span>
      </div>
    </div>
  )
}

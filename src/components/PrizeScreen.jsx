import { useEffect } from 'react'
import { launchConfetti } from '../utils/confetti'

export default function PrizeScreen() {
  useEffect(() => {
    launchConfetti()
    const t1 = setTimeout(launchConfetti, 800)
    const t2 = setTimeout(launchConfetti, 1800)
    const t3 = setTimeout(launchConfetti, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: 'linear-gradient(160deg, #1a0a00 0%, #3d1a00 50%, #1a0a00 100%)' }}
    >
      {/* Destellos decorativos */}
      <div className="absolute top-8 left-8 text-4xl opacity-40 animate-bounce">✨</div>
      <div className="absolute top-12 right-10 text-3xl opacity-40" style={{ animation: 'bounce 1.5s infinite 0.5s' }}>🌟</div>
      <div className="absolute bottom-16 left-12 text-3xl opacity-40" style={{ animation: 'bounce 2s infinite 1s' }}>✨</div>
      <div className="absolute bottom-10 right-8 text-4xl opacity-40" style={{ animation: 'bounce 1.8s infinite 0.3s' }}>🌟</div>

      {/* Cabecera */}
      <p className="text-yellow-300 font-black text-3xl tracking-widest text-center mb-6 drop-shadow-lg">
        🎊 ¡LO CONSEGUISTE! 🎊
      </p>

      {/* Tarjeta del vale */}
      <div
        className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b, #8b4513)', padding: '3px' }}
      >
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a0800' }}>
          {/* Foto del cachopo */}
          <div className="relative overflow-hidden" style={{ height: '220px' }}>
            <img
              src="/cachopo.jpg"
              alt="Cachopo asturiano"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 50%, #1a0800 100%)' }}
            />
          </div>

          {/* Cuerpo del vale */}
          <div className="px-6 pb-6 pt-2 text-center">
            <div className="text-yellow-400 font-black text-xs tracking-[0.3em] mb-3">✦ VALE OFICIAL ✦</div>

            <div className="border border-yellow-600/40 rounded-xl p-4 mb-4"
                 style={{ background: 'rgba(255,215,0,0.05)' }}>
              <p className="text-white font-black text-3xl leading-tight mb-1">COMIDA PARA 2</p>
              <p className="text-yellow-300 text-lg italic font-semibold mb-3">con Cachopo</p>
              <p className="text-white/70 text-sm">Para <span className="text-yellow-300 font-black">Alba</span> 💛</p>
            </div>

            <p className="text-yellow-200 font-bold text-base mb-4">Feliz Día de la Madre 🌸</p>

            {/* Sello */}
            <div
              className="inline-flex items-center gap-2 border-2 border-yellow-500 rounded-full px-4 py-1"
              style={{ transform: 'rotate(-3deg)', background: 'rgba(139,69,19,0.3)' }}
            >
              <span className="text-lg">🥩</span>
              <span className="text-yellow-400 font-black text-xs tracking-widest">VÁLIDO</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white/40 text-xs mt-6 text-center">
        Haz una captura de pantalla para guardar el vale
      </p>
    </div>
  )
}

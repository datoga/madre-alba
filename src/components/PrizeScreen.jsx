import { useEffect } from 'react'
import { launchConfetti } from '../utils/confetti'

const CACHOPO_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cachopo_in_Asturian_Sidrer%C3%ADa.jpg/800px-Cachopo_in_Asturian_Sidrer%C3%ADa.jpg'

export default function PrizeScreen() {
  useEffect(() => {
    launchConfetti()
    const t1 = setTimeout(launchConfetti, 800)
    const t2 = setTimeout(launchConfetti, 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Foto de fondo */}
      <img
        src={CACHOPO_IMG}
        alt="Cachopo"
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => { e.target.style.display = 'none' }}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Vale imprimible */}
      <div id="vale-print" className="relative z-10 text-center text-white px-8 py-10">
        <div className="text-3xl font-black tracking-widest text-yellow-300 mb-2">🎊 ¡LO CONSEGUISTE! 🎊</div>
        <div className="border-2 border-dashed border-yellow-300 rounded-xl p-6 max-w-sm mx-auto mt-4">
          <div className="text-xs font-black tracking-widest text-yellow-300 mb-2">✦ VALE ✦</div>
          <div className="text-3xl font-black mb-1">COMIDA PARA 2</div>
          <div className="text-lg italic text-yellow-200 mb-3">con Cachopo</div>
          <div className="text-sm text-white/80">para Alba ❤️</div>
        </div>
        <div className="mt-6 text-lg font-bold text-yellow-200">Feliz Día de la Madre</div>

        <button
          onClick={() => window.print()}
          className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-2 rounded-full text-sm transition-all active:scale-95"
        >
          🖨️ Imprimir vale
        </button>
      </div>
    </div>
  )
}

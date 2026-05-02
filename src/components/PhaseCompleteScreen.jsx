export default function PhaseCompleteScreen({ phase, onNext }) {
  return <div className="flex flex-col items-center justify-center h-screen gap-4"><p>¡Fase {phase} superada!</p><button onClick={onNext}>Siguiente →</button></div>
}

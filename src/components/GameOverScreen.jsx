export default function GameOverScreen({ phase, onRetry, onRestart }) {
  return <div className="flex flex-col items-center justify-center h-screen gap-4"><p>Game Over · Fase {phase}</p><button onClick={onRetry}>Reintentar</button><button onClick={onRestart}>Reiniciar</button></div>
}

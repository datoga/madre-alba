import { useGameState } from './hooks/useGameState'
import WelcomeScreen from './components/WelcomeScreen'
import PhaseCompleteScreen from './components/PhaseCompleteScreen'
import GameOverScreen from './components/GameOverScreen'
import PrizeScreen from './components/PrizeScreen'
import TocaIngredientes from './games/TocaIngredientes'
import Parejas from './games/Parejas'
import OrdenaLetras from './games/OrdenaLetras'
import AtrapaIngredientes from './games/AtrapaIngredientes'
import MomentoExacto from './games/MomentoExacto'

const GAMES = [null, TocaIngredientes, Parejas, OrdenaLetras, AtrapaIngredientes, MomentoExacto]

export default function App() {
  const { appState, currentPhase, startGame, onWin, onFail, nextPhase, retryPhase, restartGame, showPrize } = useGameState()

  if (appState === 'welcome') return <WelcomeScreen onStart={startGame} onPrize={showPrize} />
  if (appState === 'phase-complete') return <PhaseCompleteScreen phase={currentPhase} onNext={nextPhase} />
  if (appState === 'game-over') return <GameOverScreen phase={currentPhase} onRetry={retryPhase} onRestart={restartGame} />
  if (appState === 'prize') return <PrizeScreen />

  const GameComponent = GAMES[currentPhase]
  return <GameComponent phase={currentPhase} onWin={onWin} onFail={onFail} />
}

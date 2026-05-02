import { useState } from 'react'

export function useGameState() {
  const [appState, setAppState] = useState('welcome')
  const [currentPhase, setCurrentPhase] = useState(1)

  function startGame() {
    setCurrentPhase(1)
    setAppState('playing')
  }

  function onWin() {
    if (currentPhase === 5) {
      setAppState('prize')
    } else {
      setAppState('phase-complete')
    }
  }

  function onFail() {
    setAppState('game-over')
  }

  function nextPhase() {
    setCurrentPhase(p => p + 1)
    setAppState('playing')
  }

  function retryPhase() {
    setAppState('playing')
  }

  function restartGame() {
    setCurrentPhase(1)
    setAppState('playing')
  }

  return { appState, currentPhase, startGame, onWin, onFail, nextPhase, retryPhase, restartGame }
}

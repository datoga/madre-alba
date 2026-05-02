import confetti from 'canvas-confetti'

export function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.5 },
    colors: ['#ff8a65', '#ffb300', '#e91e63', '#4caf50', '#fff9c4'],
  })
}

export const INGREDIENTS = ['🧀', '🥦', '🥩', '❤️']

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function scrambleWord(word) {
  const letters = word.split('')
  let scrambled
  do { scrambled = shuffle(letters).join('') } while (scrambled === word)
  return scrambled
}

export function generateIngredients() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: INGREDIENTS[i % INGREDIENTS.length],
    alive: true,
    x: 10 + Math.random() * 75,
    y: 10 + Math.random() * 70,
  }))
}

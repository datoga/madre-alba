import { describe, it, expect } from 'vitest'
import { shuffle, scrambleWord, generateIngredients } from './gameLogic'

describe('shuffle', () => {
  it('returns array of same length', () => {
    expect(shuffle([1, 2, 3, 4]).length).toBe(4)
  })
  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4]
    expect(shuffle([...arr]).sort()).toEqual(arr.sort())
  })
})

describe('scrambleWord', () => {
  it('returns same letters in different order (usually)', () => {
    const word = 'CACHOPO'
    const result = scrambleWord(word)
    expect(result.length).toBe(word.length)
    expect(result.split('').sort().join('')).toBe(word.split('').sort().join(''))
  })
  it('never returns the original word', () => {
    const word = 'CACHOPO'
    const results = Array.from({ length: 10 }, () => scrambleWord(word))
    expect(results.every(r => r !== word)).toBe(true)
  })
})

describe('generateIngredients', () => {
  it('returns array of 8 items', () => {
    expect(generateIngredients().length).toBe(8)
  })
  it('all items have id, emoji, and alive=true', () => {
    generateIngredients().forEach(item => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('emoji')
      expect(item.alive).toBe(true)
    })
  })
})

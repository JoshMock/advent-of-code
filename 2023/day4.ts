import { readFileSync } from 'fs'

interface Card {
  id: number
  winning: number[]
  numbers: number[]
  score?: number
  followers?: number[]
}

function parseNums(val: string): number[] {
  return val
    .trim()
    .split(/\s+/)
    .map(num => parseInt(num, 10))
    .filter(num => !Number.isNaN(num))
}

function parseCard(val: string): Card {
  const [card, rest] = val.split(':')
  const [winningStr, numbersStr] = rest.split('|')
  const id = parseInt(card.trim().split(/\s+/)[1], 10)
  const winning = parseNums(winningStr)
  const numbers = parseNums(numbersStr)

  return { id, winning, numbers }
}

function getScore(card: Card): number {
  let score = 0
  card.winning.forEach(num => {
    if (card.numbers.includes(num)) {
      if (score === 0) {
        score = 1
      } else {
        score = score * 2
      }
    }
  })
  return score
}

function countWinningNumbers(card: Card): number {
  return card.numbers.filter(num => card.winning.includes(num)).length
}

function day4(input: string) {
  return input.trim().split('\n')
    .map(parseCard)
    .map(card => getScore(card))
    .reduce((acc, num) => acc + num, 0)
}

function day4part2(input: string) {
  const cards = input.trim().split('\n').map(parseCard)

  cards.forEach(card => {
    const numWin = countWinningNumbers(card)
    card.followers = []
    if (numWin > 0) {
      for(let x = 1; x <= numWin; x++) {
        if (card.id + x < cards.length) card.followers.push(card.id + x)
      }
    }
  })

  let winningCards = []
  cards.forEach(card => {
    winningCards = winningCards.concat(card.followers ?? [])
    const count = winningCards.filter(win => win === card.id).length
    for (let i = 0; i < count; i++) {
      winningCards = winningCards.concat(card.followers ?? [])
    }
  })

  return winningCards.length
}


// console.log(day4(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`))

// console.log(day4(readFileSync('./day4', 'utf8')))
//
// console.log(day4part2(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`))
console.log(day4part2(readFileSync('./day4', 'utf8')))

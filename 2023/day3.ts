const { readFileSync } = require('fs')

interface ValPosition {
  row?: number
  start?: number
  end?: number
  value?: number | string
}

function getPositions(input: string, reg: RegExp, row: number): ValPosition[] {
  const positions = []
  while (reg.hasIndices) {
    const res = reg.exec(input)
    if (res === null) break
    const [start, end] = res?.indices[0] ?? []
    const value = res[0]
    positions.push({
      start,
      end,
      value,
      row
    })
  }
  return positions
}

function day3(input: string) {
  const rows = input.split('\n')
  
  let nums: ValPosition[] = []
  let symbols: ValPosition[] = []
  rows.forEach((row, index) => nums = nums.concat(getPositions(row, /\d+/dg, index)))
  rows.forEach((row, index) => symbols = symbols.concat(getPositions(row, /[^\d\.]{1}/dg, index)))

  return nums.filter(num => {
    const adjacentSymbol = symbols.find(symbol => {
      if (symbol.row >= num.row - 1 && symbol.row <= num.row + 1) {
        return (symbol.start >= num.start - 1 && symbol.end <= num.end + 1)
      }
      return false
    })
    return adjacentSymbol !== undefined
  })
  .map(num => parseInt(num.value, 10))
  .reduce((acc, num) => acc + num, 0)
}

function day3part2(input: string) {
  const rows = input.split('\n')

  let nums: ValPosition[] = []
  let symbols: ValPosition[] = []
  rows.forEach((row, index) => nums = nums.concat(getPositions(row, /\d+/dg, index)))
  rows.forEach((row, index) => symbols = symbols.concat(getPositions(row, /[^\d\.]{1}/dg, index)))

  return symbols.map(symbol => {
    const adjacentNums = nums.filter(num => {
      if (symbol.row >= num.row - 1 && symbol.row <= num.row + 1) {
        return (symbol.start >= num.start - 1 && symbol.end <= num.end + 1)
      }
      return false
    })
    
    if (adjacentNums.length === 2) {
      const [a, b] = adjacentNums
      
      return parseInt(a.value, 10) * parseInt(b.value, 10)
    }
    return 0
  })
  .reduce((acc, num) => acc + num, 0)
}

console.log(day3part2(readFileSync('./day3', 'utf8')))

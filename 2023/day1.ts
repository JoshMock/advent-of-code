const digits = [
  'one',
  "two",
  "three",
  "four",
  "five",
  'six',
  'seven',
  'eight',
  'nine',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

function day1(val: string): number {
    return val.split('\n')
      .map(row => {
        const rowD = getDigits(row)
        console.log(row, rowD)
        return(rowD)
      })
      .map(row => {
        if (row.length === 0) return 0
        const first = row[0]
        const last = row[row.length - 1]
        return (first * 10) + last
      })
      .reduce((acc, val) => acc + val, 0)
  }

function getDigits(val: string): number[] {
  const outs: [string, number][] = []
  digits.forEach(digit => {
    let cursor = -1
    do {
      cursor = val.indexOf(digit, cursor + 1)
      if (cursor > -1) outs.push([digit, cursor])
    } while (cursor > -1)
  })

  return outs
    .sort((a, b) => a[1] - b[1])
    .map(item => {
      const index = digits.indexOf(item[0])
      if (index < 9) return index + 1
      return index - 9
    })
}

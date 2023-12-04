interface Result {
  red?: number
  green?: number
  blue?: number
}
interface Game {
  id: number
  results: Result[]
}

function parseGame(val): Game {
  const [game, resultStr] = val.split(':')
  const id = parseInt(game.split(' ')[1], 10)
  const results = resultStr
    .split(';')
    .map(res => res
      .split(',')
      .map(x => x.trim().split(' '))
      .reduce((acc, item) => {
        acc[item[1].trim()] = parseInt(item[0].trim(), 10)
        return acc
      }, {}))
  return { id, results }
}

function day2(val: string, maxRed: number, maxGreen: number, maxBlue: number) {
  return val
    .split('\n')
    .map(parseGame)
    .filter((game: Game) => {
      let passes = true
      game.results.forEach(res => {
        if (res.red > maxRed || res.green > maxGreen || res.blue > maxBlue) passes = false
      })
      return passes
    })
    .map(game => game.id)
    .reduce((sum, id) => sum + id, 0)
}

function day2Part2 (input: string) {
  return input
    .split('\n')
    .map(parseGame)
    .map(game => {
      const max: Result = {
        red: 0,
        green: 0,
        blue: 0
      }
      game.results.forEach(res => {
        if (res.red > max.red) max.red = res.red
        if (res.green > max.green) max.green = res.green
        if (res.blue > max.blue) max.blue = res.blue
      })
      return max.red * max.green * max.blue
    })
    .reduce((sum, power) => sum + power, 0)
}

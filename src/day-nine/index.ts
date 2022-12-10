import fs from 'fs'
import RopeParser from './parser'
import { Head, IMovable, Knot, Tail } from './rope'

const KNOT_COUNT = 8

const g: string[] = []

export default () => {
  const parser = new RopeParser(__dirname + '/data.txt')
  const steps = parser.steps
  const grid: string[][] = []
  for (let y = 0; y < 30; y++) {
    const row: string[] = []
    for (let x = 0; x < 30; x++) {
      row.push('.')
    }
    grid.push(row)
  }

  // const x = 0
  // const y = 9
  const x = 11
  const y = 15

  const head = new Head(x, y)
  const knots: Tail[] = []
  for (let i = 1; i <= KNOT_COUNT; i++) {
    knots.push(new Knot(i.toString(), x, y))
  }
  const tail = new Tail(x, y)

  grid[tail.y][tail.x] = 'T'
  grid[head.y][head.x] = 'H'
  logGrid(grid)
  const tailPosMap: {
    [coord: string]: boolean
  } = {}
  for (const s of steps) {
    g.push(`${s.direction} ${s.count}`)
    // console.log('step', s.direction, s.count)
    for (let i = 0; i < s.count; i++) {
      // head
      grid[head.y][head.x] = '.'
      head.moveByOne(s.direction)
      grid[head.y][head.x] = 'H'

      // knots
      let last: IMovable = head
      for (const k of knots) {
        grid[k.y][k.x] = '.'
        k.follow(last)
        grid[k.y][k.x] = k.char
        last = k
      }

      // tail
      // console.log(knots.map(k => k.coordStr))
      // tail.follow(head)
      grid[tail.y][tail.x] = '.'
      tail.follow(knots[knots.length - 1])
      grid[tail.y][tail.x] = 'T'
      tailPosMap[tail.coordStr] = true
      logGrid(grid)
    }
  }
  const posArray = Object.keys(tailPosMap)
  console.log('positions', posArray.length) // 2837 too high
  fs.writeFileSync(__dirname + '/../../grid.txt', g.join('\n'))
}

function logGrid(grid: string[][]) {
  for (const row of grid) {
    // console.log(row.join(''))
    g.push(row.join(''))
  }
  // console.log()
  g.push('')
}

// incorrect
// 2837 - too high
// 2816 - dunno
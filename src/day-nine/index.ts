import RopeParser from './parser'
import { Head, IMovable, Tail } from './rope'

export default () => {
  const parser = new RopeParser(__dirname + '/data.txt')
  const steps = parser.steps
  const grid: string[][] = []
  for (let y = 0; y < 7; y++) {
    const row: string[] = []
    for (let x = 0; x < 7; x++) {
      row.push('.')
    }
    grid.push(row)
  }

  const head = new Head(0, 0)
  const knots: Tail[] = new Array(10).fill(new Tail(0, 0))
  const tail = new Tail(0, 0)

  // grid[tail.y][tail.x] = 'T'
  // grid[head.y][head.x] = 'H'
  // logGrid(grid)
  const tailPosMap: {
    [coord: string]: boolean
  } = {}
  for (const s of steps) {
    // console.log('step', s.direction, s.count)
    for (let i = 0; i < s.count; i++) {
      // grid[head.y][head.x] = '.'
      // grid[tail.y][tail.x] = '.'
      head.moveByOne(s.direction)
      let last: IMovable = head
      for (const k of knots) {
        k.follow(last)
        last = k
      }
      tail.follow(knots[knots.length - 1])
      tailPosMap[tail.coordStr] = true
      // grid[head.y][head.x] = 'H'
      // grid[tail.y][tail.x] = 'T'
      // logGrid(grid)
    }
  }
  const posArray = Object.keys(tailPosMap)
  console.log('positions', posArray.length) // 5669 too high. yolo
}

function logGrid(grid: string[][]) {
  for (const row of grid) {
    console.log(row.join(''))
  }
  console.log()
}
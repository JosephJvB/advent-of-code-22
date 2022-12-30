import fs from 'fs'
import { Rock } from '.'

const X_BUFFER = 300

export default class Cave {
  public grid: string[][] = []
  private stoppedSand: {
    [coord: string]: boolean
  } = {}
  runSim: boolean = true
  public sandCount: number = 0
  constructor() {
    const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
    const rocks: Rock[] = []
    // track to make grid only
    let xMax = -1
    let yMax = -1
    for (const line of lines) {
      const rock: Rock = []
      for (const coordStr of line.split(' -> ')) {
        const [x, y] = coordStr.split(',').map(c => parseInt(c))
        rock.push({x, y})
        if (x > xMax) {
          xMax = x
        }
        if (y > yMax) {
          yMax = y
        }
      }
      rocks.push(rock)
    }
    // will sort low to high
    for (let y = 0; y <= yMax + 20; y++) {
      const row: string[] = []
      for (let x = 0; x <= xMax + X_BUFFER; x++) {
        row.push('.')
      }
      this.grid.push(row)
    }
    for (let r = 0; r < rocks.length; r++) {
      const rock = rocks[r]
      for (let i = 0; i < rock.length - 1; i++) {
        const [c1, c2] = rock.slice(i, i + 2)
        const _xMin = Math.min(c1.x, c2.x)
        const _xMax = Math.max(c1.x, c2.x)
        const _yMin = Math.min(c1.y, c2.y)
        const _yMax = Math.max(c1.y, c2.y)
        for (let i = _xMin; i <= _xMax; i++) {
          this.grid[c1.y][i] = '#'
        }
        for (let i = _yMin; i <= _yMax; i++) {
          this.grid[i][c1.x] = '#'
        }
      }
    }
    // add floor
    for (let x = 0; x < xMax + X_BUFFER; x++) {
      this.grid[yMax + 2][x] = '#'
    }
  }
  saveGrid() {
    const gridTxt = this.grid.map(r => r.join('')).join('\n')
    fs.writeFileSync(__dirname + '/../../src/day-fourteen/working/grid.txt', gridTxt)
  }
  addSand() {
    if (this.grid[0][500] == 'o') {
      this.runSim = false
    }
    let x = 500 // always starts from single point of origin (500, 0)
    for (let y = 0; y < this.grid.length - 1; y++) {
      const lower = this.grid[y + 1][x]
      if (lower == '.') {
        continue
      }
      // we have hit rock or sand
      const lowerLeft = this.grid[y + 1][x - 1]
      const lowerRight = this.grid[y + 1][x + 1]
      // try slide left
      if (lowerLeft == '.') {
        x--
        continue
      }
      // try slide right
      if (lowerRight == '.') {
        x++
        continue
      }
      // stop
      this.grid[y][x] = 'o'
      this.sandCount++
      this.stoppedSand[`${y}x${x}`] = true
      return
    }
    // sand fell to the void
    this.runSim = false
  }
}
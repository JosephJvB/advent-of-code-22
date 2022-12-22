import fs from 'fs'
import parser from './parser'

type Coord = {
  x: number
  y: number
}
type GridCoord = Coord & {
  e: number
}
type Direction = '^' | 'v' | '>' | '<'
type Move = Coord & {
  d: Direction
}
class Solver {
  public grid: GridCoord[][] = []
  public start: GridCoord
  public end: GridCoord
  public current: GridCoord
  public previous: GridCoord
  public solution: Direction[] = []
  constructor(public inputGrid: string[][]) {
    fs.writeFileSync(__dirname + '/../../src/day-twelve/working/coords.json', JSON.stringify(this.grid, null, 2))
    for (let y = 0; y < inputGrid.length; y++) {
      const row: GridCoord[] = []
      for (let x = 0; x < inputGrid[y].length; x++) {
        const cell = inputGrid[y][x]
        let e = cell.charCodeAt(0) - 96
        switch (cell) {
          case 'S':
            e = 1
            this.start = { x, y, e }
            this.current = { x, y, e }
            this.previous = { x, y, e }
            break
          case 'E':
            e = 26
            this.end = { x, y, e }
            break
        }
        row.push({ x, y, e })
      }
      this.grid.push(row)
    }
    fs.writeFileSync(__dirname + '/../../src/day-twelve/working/coords.json', JSON.stringify(this.grid, null, 2))
  }
  private get solved() {
    return this.current.x == this.end.x && this.current.y == this.end.x
  }
  private get nextMoves(): Move[] {
    const moves: Move[] = [
      { x: this.current.x + 1, y: this.current.y, d: '>' },
      { x: this.current.x - 1, y: this.current.y, d: '<' },
      { x: this.current.x, y: this.current.y + 1, d: 'v' },
      { x: this.current.x, y: this.current.y - 1, d: '^' },
    ]
    const validMoves: Move[] = []
    for (const m of moves) {
      const r = this.grid[m.y]
      if (!r) {
        continue
      }
      const c = r[m.x]
      if (!c) {
        continue
      }
      if (m.x == this.previous.x && m.y == this.previous.y) {
        continue
      }
      if (c.e > this.current.e + 1) {
        continue
      }
      validMoves.push(m)
    }
    const current = this.current.x + this.current.y
    validMoves.sort((a, z) => Math.abs(current - (a.x + a.y)) - Math.abs(current - (z.x + z.y)))
    return validMoves
  }
  solveRecursive(): boolean {
    const moves = this.nextMoves
    if (!moves.length) {
      console.log('no more moves?')
      return false
    }
    for (const m of moves) {
      // save in closure
      const _previous = { ...this.previous }
      const _current = { ...this.current }
      const prevChar = this.inputGrid[this.current.y][this.current.x]
      // update w/ next
      // extract to method
      this.previous.x = this.current.x
      this.previous.y = this.current.y
      this.previous.e = this.current.e
      this.current.x = m.x
      this.current.y = m.y
      this.current.e = this.grid[this.current.y][this.current.x].e
      this.inputGrid[this.current.y][this.current.y] = m.d
      this.solution.push(m.d)
      if (this.solution.length == 10) {
        console.log(this.solution)
        console.log(this.current)
        return true
      }
      fs.writeFileSync(__dirname + '/../../src/day-twelve/working/grid.txt', this.inputGrid.map(r => r.join()).join('\n'))
      if (this.solved) {
        console.log('solved!', this.solution.join(''))
        return true
      }
      // try do next
      if (this.solveRecursive()) {
        return true
      }
      // failed, reset
      // extract to method
      this.inputGrid[this.current.y][this.current.y] = prevChar
      this.solution.pop()
      this.current.x = _current.x
      this.current.y = _current.y
      this.current.e = _current.e
      this.previous.x = _previous.x
      this.previous.y = _previous.y
      this.previous.y = _previous.y
      this.previous.e = _previous.e
      return false
    }
  }
}

export default async () => {
  const parsedGrid = parser()
  const solver = new Solver(parsedGrid)
  solver.solveRecursive()
}
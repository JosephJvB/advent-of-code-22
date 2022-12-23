import fs from 'fs'
import GridCoord from './coord'
import Move, { Direction } from './move'

export default class Solver {
  public grid: GridCoord[][] = []
  public start: GridCoord
  public end: GridCoord
  public current: GridCoord
  public solution: Direction[] = []
  private prevCells: {
    [coordStr: string]: boolean
  } = {}
  constructor(public inputGrid: string[][]) {
    // turn chars to numbers
    for (let y = 0; y < inputGrid.length; y++) {
      const row: GridCoord[] = []
      for (let x = 0; x < inputGrid[y].length; x++) {
        const c = inputGrid[y][x]
        const e = c.charCodeAt(0) - 96
        const coord = new GridCoord(x, y, e, c)
        switch (c) {
          case 'S':
            coord.e = 1
            this.start = coord
            this.current = coord
            break
          case 'E':
            coord.e = 26
            this.end = coord
            break
        }
        row.push(coord)
      }
      this.grid.push(row)
    }
    // calculate distance from end coord 
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const c = this.grid[y][x]
        c.evalEnd(this.end)
        switch (c.c) {
          case 'S':
            this.start.evalEnd(this.end)
            this.current.evalEnd(this.end)
            break
          case 'E':
            break
        }
      }
    }
    // remember start cell
    this.prevCells[this.start.key] = true
    fs.writeFileSync(__dirname + '/../../src/day-twelve/working/init-grid.txt', this.inputGrid.map(r => r.join()).join('\n'))
  }
  private get solved() {
    return this.current.x == this.end.x && this.current.y == this.end.y
  }
  private get nextMoves(): Move[] {
    const possibleMoves: Move[] = [
      new Move(this.grid, this.current, '>'),
      new Move(this.grid, this.current, '<'),
      new Move(this.grid, this.current, 'v'),
      new Move(this.grid, this.current, '^'),
    ]
    const validMoves: Move[] = []
    for (const m of possibleMoves) {
      if (!m.next) {
        continue
      }
      if (this.prevCells[m.key]) {
        continue
      }
      if (m.next.e > (this.current.e + 1)) {
        continue
      }
      validMoves.push(m)
    }
    validMoves.sort((_a, _z) => {
      const a: GridCoord = this.grid[_a.next.y][_a.next.x]
      const z: GridCoord = this.grid[_z.next.y][_z.next.x]
      // v1
      // return (a.dx - z.dx) || (a.dy - z.dy)
      // v2 - use distance from end
      // return a.d - z.d
      // v3
      // elevation, then distance
      return (z.e - a.e) || (a.d - z.d)
      // distance, then on elevation
      return (a.d - z.d) || (z.e - a.e)
    })
    return validMoves
  }
  solveRecursive(): boolean {
    if (this.solved) {
      return true
    }
    const moves = this.nextMoves
    for (const m of moves) {
      // update w/ next
      this.nextMove(m)

      fs.writeFileSync(__dirname + '/../../src/day-twelve/working/grid.txt', this.inputGrid.map(r => r.join()).join('\n'))
      if (this.solved) {
        console.log('solved!', this.solution.length, this.solution.join(''))
        return true
      }
      // try do next
      if (this.solveRecursive()) {
        return true
      }
      // failed, reset
      this.resetMove(m)
    }
    return false
  }
  nextMove(m: Move) {
    m.char = this.inputGrid[m.prev.y][m.prev.x]
    this.prevCells[m.key] = true
    // dont overwrite start/end
    if (m.char != 'S' && m.char != 'E') {
      this.inputGrid[m.prev.y][m.prev.x] = m.d
    }
    this.current = this.grid[m.next.y][m.next.x]
    this.solution.push(m.d)
  }
  resetMove(m: Move) {
    // we definitely want to remember failed cells, don't delete them, oops
    // delete this.prevCells[m.key]
    this.inputGrid[m.prev.y][m.prev.x] = m.char
    this.current = this.grid[m.prev.y][m.prev.x]
    this.solution.pop()
  }
}
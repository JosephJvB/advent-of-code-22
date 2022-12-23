import fs from 'fs'
import Move, { Direction, GridCoord } from './move'

export default class Solver {
  public grid: GridCoord[][] = []
  public start: GridCoord
  public end: GridCoord
  public current: GridCoord
  public solution: Direction[] = []
  public numberGrid: string[][] = []
  private prevCells: {
    [coordStr: string]: boolean
  } = {}
  constructor(public inputGrid: string[][]) {
    for (let y = 0; y < inputGrid.length; y++) {
      const row: GridCoord[] = []
      const numRow: string[] = []
      for (let x = 0; x < inputGrid[y].length; x++) {
        const cell = inputGrid[y][x]
        let e = cell.charCodeAt(0) - 96
        switch (cell) {
          case 'S':
            e = 1
            this.start = { x, y, e }
            this.current = { x, y, e }
            break
          case 'E':
            e = 26
            this.end = { x, y, e }
            break
        }
        numRow.push(e.toString())
        row.push({ x, y, e })
      }
      this.numberGrid.push(numRow)
      this.grid.push(row)
    }
    fs.writeFileSync(__dirname + '/../../src/day-twelve/working/init-grid.txt', this.numberGrid.map(r => r.join()).join('\n'))
  }
  private get solved() {
    return this.current.x == this.end.x && this.current.y == this.end.y
  }
  private get nextMoves(): Move[] {
    const possibleMoves: Move[] = [
      new Move(this.current, '>'),
      new Move(this.current, '<'),
      new Move(this.current, 'v'),
      new Move(this.current, '^'),
    ]
    const validMoves: Move[] = []
    for (const m of possibleMoves) {
      const r = this.grid[m.next.y]
      if (!r) {
        continue
      }
      const c = r[m.next.x]
      if (!c) {
        continue
      }
      if (this.prevCells[m.key]) {
        continue
      }
      if (c.e > this.current.e + 1) {
        continue
      }
      validMoves.push(m)
    }
    validMoves.sort((a, z) => {
      const aDiffX = Math.abs(this.end.x - a.next.x)
      const aDiffY = Math.abs(this.end.y - a.next.y)
      const zDiffX = Math.abs(this.end.x - z.next.x)
      const zDiffY = Math.abs(this.end.y - z.next.y)
      return (aDiffX - zDiffX) || (aDiffY - zDiffY)
    })
    return validMoves
  }
  solveRecursive(): boolean {
    if (this.solved) {
      return true
    }
    const moves = this.nextMoves
    for (const m of moves) {
      // save in closure
      m.char = this.inputGrid[m.prev.y][m.prev.x]
      // update w/ next
      this.nextMove(m)
      // if (this.solution.length == 32) {
      //   console.log(this.solution)
      //   console.log(this.current)
      //   return true
      // }
      fs.writeFileSync(__dirname + '/../../src/day-twelve/working/grid.txt', this.inputGrid.map(r => r.join()).join('\n'))
      fs.writeFileSync(__dirname + '/../../src/day-twelve/working/number-grid.txt', this.numberGrid.map(r => r.join()).join('\n'))
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
    this.prevCells[m.key] = true
    if (m.char != 'S' && m.char != 'E') {
      this.inputGrid[m.prev.y][m.prev.x] = m.d
      this.numberGrid[m.prev.y][m.prev.x] = m.d
    }
    const nextCell = this.grid[m.next.y][m.next.x]
    this.current = { ...nextCell }
    this.solution.push(m.d)
  }
  resetMove(m: Move) {
    delete this.prevCells[m.key]
    this.inputGrid[m.prev.y][m.prev.x] = m.char
    this.numberGrid[m.prev.y][m.prev.x] = m.char

    const prevCell = this.grid[m.prev.y][m.prev.x]
    this.current = { ...prevCell }
    this.solution.pop()
  }
}
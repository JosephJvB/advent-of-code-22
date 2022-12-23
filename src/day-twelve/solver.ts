import fs from 'fs'

export type Coord = {
  x: number
  y: number
}
export type GridCoord = Coord & {
  e: number
}
export type Direction = '^' | 'v' | '>' | '<'
export type Move = Coord & {
  d: Direction
}

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
      const k = `${m.x}_${m.y}`
      if (this.prevCells[k]) {
        continue
      }
      if (c.e > this.current.e + 1) {
        continue
      }
      validMoves.push(m)
    }
    validMoves.sort((a, z) => {
      const aDiffX = Math.abs(this.end.x - a.x)
      const aDiffY = Math.abs(this.end.y - a.y)
      const zDiffX = Math.abs(this.end.x - z.x)
      const zDiffY = Math.abs(this.end.y - z.y)
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
      const _current = { ...this.current }
      const currentChar = this.inputGrid[this.current.y][this.current.x]
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
      this.resetMove(currentChar, _current)
    }
    return false
  }
  nextMove(m: Move) {
    const k = `${m.x}_${m.y}`
    this.prevCells[k] = true
    const nextCell = this.grid[m.y][m.x]
    if (this.solution.length > 0) {
      this.inputGrid[this.current.y][this.current.x] = m.d
      this.numberGrid[this.current.y][this.current.x] = m.d
    }
    this.current = { ...nextCell }
    this.solution.push(m.d)
  }
  resetMove(prevChar: string, _current: GridCoord) {
    const k = `${this.current.x}_${this.current.y}`
    delete this.prevCells[k]
    this.inputGrid[_current.y][_current.y] = prevChar
    this.numberGrid[_current.y][_current.y] = prevChar
    this.current = { ..._current }
    this.solution.pop()
  }
}
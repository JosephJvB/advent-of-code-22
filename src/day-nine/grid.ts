import fs from 'fs'
import { direction, IStep } from './parser'
import { Head, ICoord, IMovable, Knot } from './rope'

const grid: string[][] = []
const tailGrid: string[][] = []
const snapshots: string[] = []

export default class Grid {
  tailCoords: {
    [coord: string]: true
  } = {}
  constructor(size: number, public startPos: ICoord) {
    for (let y = 0; y < size; y++) {
      const row: string[] = []
      const tailRow: string[] = []
      for (let x = 0; x < size; x++) {
        row.push('.')
        tailRow.push('.')
      }
      grid.push(row)
      tailGrid.push(tailRow)
    }
  }
  update(rope: IMovable[], step: IStep) {
    snapshots.push(`${step.direction} ${step.count}`)
    for (let s = 0; s < step.count; s++) {
      let last: IMovable = null
      for (let knot of rope) {
        grid[knot.y][knot.x] = '.'
        if (last) {
          const k = knot as Knot
          k.follow(last)
        } else {
          const h = knot as Head
          h.moveByOne(step.direction)
        }
        grid[knot.y][knot.x] = knot.char
        last = knot
      }
      this.saveTail(last)
      this.saveSnapshot()
    }
  }
  saveSnapshot() {
    const rows = grid.map(r => r.join('')).join('\n')
    snapshots.push(rows)
    snapshots.push('')
  }
  saveTail(t: IMovable) {
    this.tailCoords[t.coordStr] = true
    tailGrid[t.y][t.x] = 'T'
  }
  get tailPositionCount(): number {
    return Object.keys(this.tailCoords).length
  }
  writeGridFile() {
    const dir = __dirname + '/../../src/day-nine/working'
    grid[this.startPos.y][this.startPos.x] = 'S'
    tailGrid[this.startPos.y][this.startPos.x] = 'S'
    const rows = grid.map(r => r.join(''))
    fs.writeFileSync(dir + '/result.txt', rows.join('\n'))
    const tailRows = tailGrid.map(r => r.join(''))
    fs.writeFileSync(dir + '/tailGrid.txt', tailRows.join('\n'))
    fs.writeFileSync(dir + '/snapshots.txt', snapshots.join('\n'))
  }
}

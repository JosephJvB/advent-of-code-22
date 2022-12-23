import GridCoord from './coord'

export type Direction = '^' | 'v' | '>' | '<'

export default class Move {
  public prev: GridCoord
  public next: GridCoord = null
  public key: string
  public char: string
  constructor (g: GridCoord[][], c: GridCoord, public d: Direction) {
    this.prev = c
    let x = c.x
    let y = c.y
    switch (d) {
      case '<':
        x--
        break
      case '>':
        x++
        break
      case '^':
        y--
        break
      case 'v':
        y++
        break
    }
    // not all moves are valid
    if (g[y] && g[y][x]) {
      this.next = g[y][x]
      this.key = this.next.key
    }
  }
}
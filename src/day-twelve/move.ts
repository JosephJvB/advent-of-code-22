export type Coord = {
  x: number
  y: number
}
export type GridCoord = Coord & {
  e: number
}
export type Direction = '^' | 'v' | '>' | '<'

export default class Move {
  public prev: Coord
  public next: Coord
  public key: string
  public char: string
  constructor (public c: Coord, public d: Direction) {
    this.prev = { ...c }
    this.next = { ...c }
    this.key = `${c.x}x${c.y}`
    switch (d) {
      case '<':
        this.next.x--
        break
      case '>':
        this.next.x++
        break
      case '^':
        this.next.y--
        break
      case 'v':
        this.next.y++
        break
    }
  }
}
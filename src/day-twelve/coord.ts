export type Coord = {
  x: number
  y: number
}
export default class GridCoord implements Coord {
  public d: number
  public dx: number
  public dy: number
  public key: string
  constructor (
    public x: number,
    public y: number,
    public e: number,
    public c: string
  ) {
    this.key = `${this.x}x${this.y}`
  }
  evalEnd(end: GridCoord) {
    this.d = Math.sqrt(Math.pow(end.x - this.x, 2) + Math.pow(end.y - this.y, 2))
    this.dx = Math.abs(end.x - this.x)
    this.dy = Math.abs(end.y - this.y)
  }
}
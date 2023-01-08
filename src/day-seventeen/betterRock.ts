import { jetDirection, Tower } from '.'


export default class BetterRock {
  height: number
  x: number = 2
  coords: {
    x: number
    y: number
  }[] = []
  // get y from rowNum by y = this.height - 1 (last row) - rowNum
  private jets: jetDirection[] = []
  constructor(
    lines: string[],
    public y: number,
    public i: number,
    public rIdx: number
  ) {
    this.height = lines.length
    // loop from top left to bottom right
    for (let r = 0; r < this.height; r++) {
      const row = lines[r]
      const y = this.height - 1 - r // invert y value
      for (let x = 0; x < row.length; x++) {
        const cell = row[x]
        if (cell == '#') {
          this.coords.push({ x, y })
        }
      }
    }
  }
  get edges() {
    const edges: { [coord: string]: boolean } = {}
    for (const { x, y } of this.coords) {
      const c = `${this.x + x},${this.y + y}`
      edges[c] = true
    }
    return edges
  }
  hasLanded(tower: Tower) {
    for (const { x, y } of this.coords) {
      const cx = this.x + x
      const cy = this.y + y
      if (cy == 0) { // reached bottom
        // console.log('rock hit floor @', x, y)
        // console.log(this.i, 'hit floor', this.jets.join(''))
        return true
      }
      // tower has a rock one cell below current bottom edge
      const c = `${cx},${cy - 1}`
      if (!!tower[c]) {
        // console.log('rock hit tower @', x, y)
        // console.log(this.i, 'hit rock', this.jets.join(''), c)
        return true
      }
    }
    return false
  }
  moveByJet(j: jetDirection, tower: Tower) {
    this.jets.push(j)
    let nextX = this.x
    switch (j) {
      case '<':
        nextX--
        break
      case '>':
        nextX++
        break
    }
    for (const { x, y } of this.coords) {
      const cx = nextX + x
      const cy = this.y + y
      // oob
      if (cx < 0 || cx > 7) {
        return
      }
      const c = `${cx},${cy}`
      // rock with updated x value will overlap settled rock
      if (!!tower[c]) {
        // console.log(this.i, j, 'collide', c)
        return
      }
    }
    this.x = nextX
  }
  get char() {
    switch (this.rIdx) {
      case 0:
        return '#'
      case 1:
        return '@'
      case 2:
        return '$'
      case 3:
        return '%'
      case 4:
        return '&'
    }
  }
  get peak() {
    return this.height + this.y
  }
}
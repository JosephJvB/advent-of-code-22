import { jetDirection } from '.'

export default class Rock {
  height: number
  width: number
  x: number = 2
  bottomEdge: number[] = [] // list of y coords, index is xcoord
  topEdge: number[] = [] // list of y coords, index is xcoord
  leftEdge: number[] = [] // list of x coords, index is rowNum
  rightEdge: number[] = [] // list of x coords, index is rowNum
  // get y from rowNum by y = this.height - 1 (last row) - rowNum
  private jets: jetDirection[] = []
  constructor(lines: string[], public y: number, public i: number) {
    this.height = lines.length
    this.width = 0
    // loop from top left to bottom right
    for (let r = 0; r < this.height; r++) {
      const row = lines[r]
      const y = this.height - 1 - r // invert y value
      for (let x = 0; x < row.length; x++) {
        const cell = row[x]
        if (cell != '#') {
          continue
        }
        if (x > this.width) {
          this.width = x + 1
        }
        // top - only accept first cell
        if (isNaN(this.topEdge[x])) {
          this.topEdge[x] = y
        }
        // bottom - accept last cell
        this.bottomEdge[x] = y
        // left - only accept first cell
        if (isNaN(this.leftEdge[r])) {
          this.leftEdge[r] = x
        }
        // right - accept last cell
        this.rightEdge[r] = x
      }
    }
  }
  get edges() {
    const edges: { [coord: string]: boolean } = {}
    for (let x = 0; x < this.bottomEdge.length; x++) {
      const y = this.bottomEdge[x]
      const c = `${x + this.x},${y + this.y}`
      edges[c] = true
    }
    for (let x = 0; x < this.topEdge.length; x++) {
      const y = this.topEdge[x]
      const c = `${x + this.x},${y + this.y}`
      edges[c] = true
    }
    for (let r = 0; r < this.leftEdge.length; r++) {
      const x = this.leftEdge[r]
      const y = this.height - 1 - r // invert y
      const c = `${x + this.x},${y + this.y}`
      edges[c] = true
    }
    for (let r = 0; r < this.rightEdge.length; r++) {
      const x = this.rightEdge[r]
      const y = this.height - 1 - r // invert y
      const c = `${x + this.x},${y + this.y}`
      edges[c] = true
    }
    return edges
  }
  hasLanded(tower: { [coord: string]: boolean }) {
    for (let x = 0; x < this.bottomEdge.length; x++) {
      const y = this.bottomEdge[x] + this.y
      if (y == 0) { // reached bottom
        // console.log('rock hit floor @', x, y)
        // console.log(this.i, 'hit floor', this.jets.join(''))
        return true
      }
      // tower has a rock one cell below current bottom edge
      const c = `${x + this.x},${y - 1}`
      if (tower[c]) {
        // console.log('rock hit tower @', x, y)
        // console.log(this.i, 'hit rock', this.jets.join(''), c)
        return true
      }
    }
    return false
  }
  moveByJet(j: jetDirection, tower: { [coord: string]: boolean }) {
    this.jets.push(j)
    let x = this.x
    switch (j) {
      case '<':
        x--
        break
      case '>':
        x++
        break
    }
    const right = x + this.width
    // oob
    if (x < 0 || right > 7) {
      return
    }
    // check other rocks
    let edge: number[] = []
    switch (j) {
      case '<':
        edge = this.leftEdge
        break
      case '>':
        edge = this.rightEdge
        break
    }
    for (let r = 0; r < edge.length; r++) {
      const y = this.height - 1 - r
      const edgeX = edge[r]
      const c = `${x + edgeX},${y + this.y}`
      // rock with updated x value will overlap settled rock
      if (tower[c]) {
        // console.log(this.i, j, 'collide', c)
        return
      }
    }
    this.x = x
  }
}
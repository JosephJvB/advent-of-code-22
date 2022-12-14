import { direction } from './parser'

export interface ICoord {
  x: number
  y: number
}
export interface IMovable extends ICoord {
  get coordStr(): string
  char: string
}

export class Head implements IMovable {
  char: string = 'H'
  constructor(public x: number, public y: number) {}
  moveByOne(direction: direction) {
    switch (direction) {
      case 'U':
        this.y--
        break
      case 'R':
        this.x++
        break
      case 'D':
        this.y++
        break
      case 'L':
        this.x--
        break
    }
  }
  get coordStr(): string {
    return `${this.x}x${this.y}`
  }
}

export class Knot implements IMovable {
  constructor(public char: string, public x: number, public y: number) {}
  get coordStr(): string {
    return `${this.x}x${this.y}`
  }
  follow(h: IMovable) {
    let xDiff = Math.abs(h.x - this.x)
    let yDiff = Math.abs(h.y - this.y)
    const totalDiff = xDiff + yDiff
    // handle corner
    if (totalDiff > 2) {
      this.followX(h)
      this.followY(h)
      xDiff = Math.abs(h.x - this.x)
      yDiff = Math.abs(h.y - this.y)
    }
    if (xDiff > 1) {
      this.followX(h)
    }
    else if (yDiff > 1) {
      this.followY(h)
    }
    else {
      // no move
    }
  }
  // these need if/elseif in case x/y has already been corrected
  private followX(h: IMovable) {
    if (this.x > h.x) {
      this.x--
    } else if (this.x < h.x) {
      this.x++
    }
  }
  private followY(h: IMovable) {
    if (this.y > h.y) {
      this.y--
    } else if (this.y < h.y) {
      this.y++
    }
  }
}
export class Tail extends Knot {
  constructor(public x: number, public y: number) {
    super('T', x, y)
  } 
}

// belsize park rita ora
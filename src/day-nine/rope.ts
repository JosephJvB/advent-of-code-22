import { direction } from './parser'

export interface IMovable {
  x: number
  y: number
  lastDirection: direction
}

export class Head implements IMovable {
  // public x: number = 0
  // public y: number = 0
  lastDirection: direction
  constructor(public x: number, public y: number) {}
  moveByOne(direction: direction) {
    this.lastDirection = direction
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
}

export class Tail implements IMovable {
  // public x: number = 0
  // public y: number = 0
  lastDirection: direction
  constructor(public x: number, public y: number) {}
  get coordStr(): string {
    return `${this.x}x${this.y}`
  }
  follow(h: IMovable) {
    this.lastDirection = h.lastDirection
    const xDiff = Math.abs(h.x - this.x)
    const yDiff = Math.abs(h.y - this.y)
    // move diag
    if (xDiff > 1 && yDiff == 1 || xDiff == 1 && yDiff > 1) {
      this.followX(h)
      this.followY(h)
      this.handleSnap(h)
    }
    else if (xDiff > 1) {
      this.followX(h)
    }
    else if (yDiff > 1) {
      this.followY(h)
    }
    else {
      // no move
    }
  }
  private handleSnap(h: IMovable) {
    switch (h.lastDirection) {
      case 'U':
      case 'D':
        this.followX(h)
        break
      case 'R':
      case 'L':
        this.followY(h)
        break
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
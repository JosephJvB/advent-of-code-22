export default class QuadCopter {
  constructor (public grid: Tree[][]) {}
  spotTree(t: Tree) {
    // one improvement would be to check the sides closest to edge first
    const visChecks = [
      () => this.visibleTop(t),
      () => this.visibleRight(t),
      () => this.visibleBelow(t),
      () => this.visibleLeft(t),
    ]
    for (const check of visChecks) {
      const r = check()
      if (r) { // only needs to be visible from one direction
        t.isVisible = true
        break
      }
    }
  }
  visibleTop(t: Tree): boolean {
    t.visTop = true
    for (let y = t.y - 1; y >= 0; y--) {
      let treeTop = this.grid[y][t.x]
      if (treeTop.height >= t.height) {
        t.visTop = false
        break
      }
    }
    return t.visTop
  }
  visibleRight(t: Tree): boolean {
    t.visRight = true
    for (let x = t.x + 1; x < this.grid.length; x++) {
      let treeRight = this.grid[t.y][x]
      if (treeRight.height >= t.height) {
        t.visRight = false
        break
      }
    }
    return t.visRight
  }
  visibleBelow(t: Tree): boolean {
    t.visBelow = true
    for (let y = t.y + 1; y < this.grid.length; y++) {
      let treeBelow = this.grid[y][t.x]
      if (treeBelow.height >= t.height) {
        t.visBelow = false
        break
      }
    }
    return t.visBelow
  }
  visibleLeft(t: Tree): boolean {
    t.visLeft = true
    for (let x = t.x - 1; x >= 0; x--) {
      let treeLeft = this.grid[t.y][x]
      if (treeLeft.height >= t.height) {
        t.visLeft = false
        break
      }
    }
    return t.visLeft
  }
}

export class Tree {
  isVisible: boolean = false
  visTop: boolean = true
  visRight: boolean = true
  visBelow: boolean = true
  visLeft: boolean = true
  constructor(public height: number, public x: number, public y: number) {}
  get id(): string {
    return `${this.x}x${this.y}:${this.height}`
  }
}
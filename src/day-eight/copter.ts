export class SpotCopter {
  constructor (public grid: VisibleTree[][]) {}
  spotTree(t: VisibleTree) {
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
  visibleTop(t: VisibleTree): boolean {
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
  visibleRight(t: VisibleTree): boolean {
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
  visibleBelow(t: VisibleTree): boolean {
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
  visibleLeft(t: VisibleTree): boolean {
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
export class ScoreCopter {
  constructor (public grid: ScoreTree[][]) {}
  scoreTree(t: ScoreTree) {
    t.score = this.scenicTop(t) * this.scenicRight(t) * this.scenicBelow(t) * this.scenicLeft(t)
  }
  scenicTop(t: ScoreTree): number {
    let count = 0
    for (let y = t.y - 1; y >= 0; y--) {
      let treeTop = this.grid[y][t.x]
      count++
      if (treeTop.height >= t.height) {
        break
      }
    }
    t.scoreTop = count
    return count
  }
  scenicRight(t: ScoreTree): number {
    let count = 0
    for (let x = t.x + 1; x < this.grid.length; x++) {
      let treeRight = this.grid[t.y][x]
      count++
      if (treeRight.height >= t.height) {
        break
      }
    }
    t.scoreRight = count
    return count
  }
  scenicBelow(t: ScoreTree): number {
    let count = 0
    for (let y = t.y + 1; y < this.grid.length; y++) {
      let treeBelow = this.grid[y][t.x]
      count++
      if (treeBelow.height >= t.height) {
        break
      }
    }
    t.scoreBelow = count
    return count
  }
  scenicLeft(t: ScoreTree): number {
    let count = 0
    for (let x = t.x - 1; x >= 0; x--) {
      let treeLeft = this.grid[t.y][x]
      count++
      if (treeLeft.height >= t.height) {
        break
      }
    }
    t.scoreLeft = count
    return count
  }
}

export class VisibleTree {
  score: number = 0
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
export class ScoreTree {
  score: number = 0
  scoreTop: number = 0
  scoreRight: number = 0
  scoreBelow: number = 0
  scoreLeft: number = 0
  constructor(public height: number, public x: number, public y: number) {}
  get id(): string {
    return `${this.x}x${this.y}:${this.height}`
  }
}
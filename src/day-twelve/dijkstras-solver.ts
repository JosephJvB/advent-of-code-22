type ICoord = {
  x: number
  y: number
}
class Coord implements ICoord {
  public key: string
  constructor(public x: number, public y: number) {
    this.key = `${x}x${y}`
  }
}
class Step extends Coord {
  constructor(c: Coord, public count: number) {
    super(c.x, c.y)
  }
}
export default class DjikstraSolver {
  public start: Coord
  public end: Coord
  private grid: number[][] = []
  private visited: {
    [key: string]: boolean
  } = {}
  private startPoints: Coord[] = []
  constructor(inputGrid: string[][]) {
    for (let y = 0; y < inputGrid.length; y++) {
      const row: number[] = []
      for (let x = 0; x < inputGrid[y].length; x++) {
        const c = inputGrid[y][x]
        let e = c.charCodeAt(0) - 96
        switch (c) {
          case 'S':
            e = 1
            this.start = new Coord(x, y)
            break
          case 'E':
            e = 26
            this.end = new Coord(x, y)
            break
        }
        if (e == 1) {
          this.startPoints.push(new Coord(x, y))
        }
        row.push(e)
      }
      this.grid.push(row)
    }
  }
  neighbours({ x, y }: Coord): Coord[] {
    return [
      new Coord(x + 1, y),
      new Coord(x - 1, y),
      new Coord(x, y + 1),
      new Coord(x, y - 1),
    ]
  }
  canStepTo(from: Coord, to: Coord) {
    const nextLimit = this.grid[from.y][from.x] + 1
    // must exist on grid
    if (!this.grid[to.y]) {
      return false
    }
    if (!this.grid[to.y][to.x]) {
      return false
    }
    // have not visited
    if (this.visited[to.key]) {
      return false
    }
    const toVal = this.grid[to.y][to.x]
    return toVal <= nextLimit
  }
  solveV1() {
    const steps: Step[] = [new Step(this.start, 0)]
    this.visited[this.start.key] = true
    while (steps.length > 0) {
      const currentPos = steps.shift()
      if (currentPos.key == this.end.key) {
        console.log('reached end @', currentPos)
        return
      }
      for (const n of this.neighbours(currentPos)) {
        if (!this.canStepTo(currentPos, n)) {
          continue
        }
        this.visited[n.key] = true
        steps.push(new Step(n, currentPos.count + 1))
      }
    }
    console.log('no more valid steps, & did not reach the end')
  }
  solveV2() {
    let fastestStart: Coord = null
    let fastestFinish: Step = null
    let checked = 0
    console.log('checking', this.startPoints.length, 'starts')
    for (const start of this.startPoints) {
      const toBeat = fastestFinish?.count || 370
      // console.log('checking start', ++checked)
      const currentFinish = this.solveFrom(start, toBeat)
      if (!currentFinish) {
        continue
      }
      if (!fastestFinish || fastestFinish.count > currentFinish.count) {
        fastestFinish = currentFinish
        fastestStart = start
      }
    }
    console.log('fastest start', fastestStart, 'finished in', fastestFinish.count, 'steps')
  }
  private solveFrom(start: Coord, stepLimit: number): Step {
    this.visited = {}
    const steps: Step[] = [new Step(start, 0)]
    this.visited[start.key] = true
    while (steps.length > 0) {
      const currentPos = steps.shift()
      // dont check all the way to the end if we are already past the lowest current checked step count
      if (currentPos.count > stepLimit) {
        return null
      }
      if (currentPos.key == this.end.key) {
        // console.log('reached end @', currentPos)
        return currentPos
      }
      for (const n of this.neighbours(currentPos)) {
        if (!this.canStepTo(currentPos, n)) {
          continue
        }
        this.visited[n.key] = true
        steps.push(new Step(n, currentPos.count + 1))
      }
    }
    // console.log('no more valid steps, & did not reach the end')
    return null
  }
}

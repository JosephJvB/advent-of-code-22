import Valve from './valve'

class Step {
  constructor(public v: Valve, public count: number) {}
}
export default class PathFinder {
  private valveMap: {
    [id: string]: Valve
  } = {}
  private distances: {
    [id: string]: number
  } = {}
  constructor() {}
  public addValve(v: Valve) {
    this.valveMap[v.id] = v
  }
  public getValve(id: string) {
    return this.valveMap[id]
  }
  public get startPoint() {
    return this.valveMap.AA
  }
  // precompute all distances
  public setDistances() {
    const list = Object.keys(this.valveMap).map(id => this.valveMap[id])
    for (let i = 0; i < list.length; i++) {
      const src = list[i]
      const rest = list.slice(i + 1)
      for (let r = 0; r < rest.length; r++) {
        const dest = rest[r]
        const ids = [src.id, dest.id]
        ids.sort()
        this.distances[ids.join(',')] = this.computeShortestDistance(src.id, dest.id)
      }
    }
  }
  public getShortestDistance(src: string, dest: string) {
    const ids = [src, dest]
    ids.sort()
    return this.distances[ids.join(',')]
  }
  private computeShortestDistance(src: string, dest: string) {
    const steps: Step[] = [new Step(this.valveMap[src], 0)]
    const visited: {
      [id: string]: boolean
    } = {}
    while (steps.length) {
      const n = steps.shift()
      if (n.v.id == dest) {
        return n.count
      }
      for (const id of n.v.connectedValves) {
        if (visited[id]) {
          continue
        }
        visited[id] = true
        steps.push(new Step(this.valveMap[id], n.count + 1))
      }
    }
    console.error('failed to map from', src, 'to', dest)
    process.exit()
  }
}
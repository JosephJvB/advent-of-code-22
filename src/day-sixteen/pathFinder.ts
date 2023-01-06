import Valve from './valve'

class Step {
  constructor(public v: Valve, public count: number) {}
}
export default class PathFinder {
  private valveMap: {
    [id: string]: Valve
  } = {}
  constructor() {}
  addValve(v: Valve) {
    this.valveMap[v.id] = v
  }
  getValve(id: string) {
    return this.valveMap[id]
  }
  get startPoint() {
    return this.valveMap.AA
  }
  getShortestDistance(src: string, dest: string) {
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
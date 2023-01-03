import fs from 'fs'
import Valve from './valve'

// kinda sounds like djikstras again
// shortest path
// from each step, add all next steps
// sort steps based flowRate?
// i think steps need to impliment valve, not store valve reference
// if one step opens a valve, then next step in same check will think that valve is already open..? Idk I need to think about it
// maybe it's OK
class Step {
  constructor(
    public valve: Valve,
    public minutes: number,
    public pressure: number
  ) {}
  openValve() {
    if (this.valve.flowRate == 0 || this.valve.open) {
      return
    }
    this.minutes++
    if (this.minutes > 30) {
      this.valve.open = true
      this.pressure += this.valve.flowRate
    }
  }
  get connections() {
    return this.valve.connectedValves
  }
}

export default () => {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  const toOpen: Valve[] = []
  const valveMap: {
    [id: string]: Valve
  } = {}
  for (const l of lines) {
    const v = new Valve(l)
    if (v.flowRate > 0) {
      toOpen.push(v)
    }
    valveMap[v.id] = v
  }
  const startValve = valveMap.AA
  const steps: Step[] = [new Step(startValve, 0, 0)]
  while (steps.length > 0) {
    const current = steps.shift()
    if (current.minutes == 30) {
      console.log('released', current.pressure, 'in 30 minutes')
      return
    }
    for (const valveId of current.connections) {
      const v = valveMap[valveId]
      if (!v.visited) {
        const s = 
        steps.push(new Step(v, current.minutes, current.pressure))
      }
    }
  }
}
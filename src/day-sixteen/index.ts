import fs from 'fs'
import Valve from './valve'

// kinda sounds like djikstras again
// shortest path
// from each step, add all next steps
// sort steps based flowRate?
// i think steps need to impliment valve, not store valve reference
// if one step opens a valve, then next step in same check will think that valve is already open..? Idk I need to think about it
// maybe it's OK
// how can I program the case where I need to go back thru a visited valve room to get to a high prio valve?

export default () => {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  const valveMap: {
    [id: string]: Valve
  } = {}
  for (const l of lines) {
    const v = new Valve(l)
    valveMap[v.id] = v
  }
  const startValve = valveMap.AA
  const valves: Valve[] = [startValve]
  const visited: {
    [id: string]: boolean
  } = {}
  let totalPressureReleased = 0
  let sumOpenValvePressure = 0
  let minutes = 1
  const openedValves: string[] = []
  const route: string[] = []
  while (minutes < 31) {
    const current = valves.shift()
    visited[current.id] = true
    minutes++
    route.push(current.id)
    // release current openValves
    totalPressureReleased += sumOpenValvePressure
    if (minutes == 31) {
      break
    }
    // open valve
    if (!current.open && current.flowRate > 0) {
      current.open = true
      openedValves.push(current.id)
      sumOpenValvePressure += current.flowRate
      minutes++
    }
    if (minutes == 31) {
      break
    }
    // if all valves are open, just chill? otherwise go back and forth between rooms lol
    // but it's not an issue
    for (const valveId of current.connectedValves) {
      const v = valveMap[valveId]
      // takes one minute to get to next step
      valves.push(v)
    }
    // should this take time into account?
    valves.sort((a, z) => {
      // sort closed to open
      if (visited[a.id] != visited[z.id]) {
        return visited[a.id] ? 1 : -1
      }
      // sort for pressure
      return z.flowRate - a.flowRate
    })
  }
  console.log(
    'exit:\n',
    'minutes', minutes, '\n',
    'totalPressureReleased', totalPressureReleased, '\n',
    'openedValves', openedValves,
    'sumOpenValvePressure', sumOpenValvePressure, '\n',
    'route', route, '\n',
  )
}
// exit:
//  minutes 31
//  totalPressureReleased 1476
//  openedValves [ 'DD', 'BB', 'EE', 'CC', 'JJ', 'HH' ] sumOpenValvePressure 81
//  route [
//   'AA', 'DD', 'BB', 'EE',
//   'CC', 'II', 'JJ', 'FF',
//   'GG', 'HH', 'DD', 'DD', -- this looks like a bug? Went from DD -> DD. Must have happened from Sort
//   'BB', 'EE', 'DD', 'EE',
//   'DD', 'EE', 'DD', 'EE',
//   'DD', 'EE', 'DD', 'EE'
// ]
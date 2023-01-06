import fs from 'fs'
import PathFinder from './pathFinder'
import Valve from './valve'

// kinda sounds like djikstras again
// shortest path
// from each step, add all next steps
// sort steps based flowRate?
// i think steps need to impliment valve, not store valve reference
// if one step opens a valve, then next step in same check will think that valve is already open..? Idk I need to think about it
// maybe it's OK
// how can I program the case where I need to go back thru a visited valve room to get to a high prio valve?
// i made a mess, I need help

export default () => {
  // test()
  run()
}
function run () {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  let toOpen: string[] = []
  const pathFinder = new PathFinder()
  for (const l of lines) {
    const v = new Valve(l)
    pathFinder.addValve(v)
    if (v.flowRate > 0) {
      toOpen.push(v.id)
    }
  }
  let totalPressureReleased = 0
  let sumOpenValvePressure = 0
  let minutes = 30
  let currentPos = pathFinder.startPoint
  const openedValves: string[] = []

  while (minutes > 0) {
    if (!toOpen.length) {
      // wait till end
      console.log('waiting')
      totalPressureReleased += sumOpenValvePressure
      minutes--
      continue
    }
    // find best valve to open next
    const options = toOpen.map(id => {
      const dest = pathFinder.getValve(id)
      const steps = pathFinder.getShortestDistance(currentPos.id, dest.id)
      let minsOpen = minutes - steps
      minsOpen-- // open the valve
      if (minsOpen < 0) minsOpen = 0
      // how much pressure the valve will release once opened
      const pressureAfterOpen = minsOpen * dest.flowRate
      return {
        valve: dest,
        steps,
        prio: pressureAfterOpen
      }
    })
    options.sort((a, z) => z.prio - a.prio)
    console.log('@', currentPos.id, minutes, totalPressureReleased)
    console.log(options.map(o => `${o.valve.id}:${o.prio}:${o.steps}`))
    const nextDest = options[0].valve
    console.log('->', nextDest.id)

    // find best path to next valve
    const steps = currentPos.connectedValves.map(id => {
      return pathFinder.getShortestDistance(id, nextDest.id)
    })
    steps.sort((a, z) => a - z)
    const shortestSteps = steps[0]
    // Get to next valve
    let nextDistance = shortestSteps
    if (nextDistance > minutes) {
      nextDistance = minutes
    }
    totalPressureReleased += (sumOpenValvePressure * nextDistance)
    minutes -= nextDistance
    if (minutes <= 0) { // didn't make it to the next room
      console.log('exit during travel')
      break
    }
    // arrive at next dest
    currentPos = nextDest
    // open the valve
    minutes--
    // update valve as open
    toOpen = toOpen.filter(id => id != nextDest.id)
    openedValves.push(nextDest.id)
    sumOpenValvePressure += nextDest.flowRate
  }
  console.log('done')
  console.log('minutes', minutes)
  console.log('totalPressureReleased', totalPressureReleased)
  console.log('sumOpenValvePressure', sumOpenValvePressure)
  console.log('openedValves', openedValves)
}
function test() {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  const pathFinder = new PathFinder()
  for (const l of lines) {
    const v = new Valve(l)
    pathFinder.addValve(v)
  }
  console.log('AA-BB', pathFinder.getShortestDistance('AA', 'BB'))
  console.log('DD-AA', pathFinder.getShortestDistance('DD', 'AA'))
}
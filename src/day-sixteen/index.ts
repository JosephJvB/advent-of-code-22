import fs from 'fs'
import PathFinder from './pathFinder'
import Valve from './valve'

const MAX_TIME = 30

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
  pathFinder.setDistances()
  let totalPressureReleased = 0
  let sumOpenValvePressure = 0
  let minutesPassed = 0
  let currentPos = pathFinder.startPoint
  const openedValves: string[] = []

  // case where AA has flowRate
  if (currentPos.flowRate > 0) {
    toOpen = toOpen.filter(id => id != currentPos.id)
    minutesPassed++
    sumOpenValvePressure += currentPos.flowRate
  }

  while (minutesPassed < MAX_TIME) {
    if (!toOpen.length) {
      // wait till end
      // console.log('waiting')
      totalPressureReleased += sumOpenValvePressure
      minutesPassed++
      continue
    }
    // find best valve to open next
    const options = toOpen.map(id => {
      const dest = pathFinder.getValve(id)
      const steps = pathFinder.getShortestDistance(currentPos.id, dest.id)
      let minsOpen = MAX_TIME - minutesPassed - steps
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
    console.log('@', currentPos.id, minutesPassed, totalPressureReleased)
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
    // in case we don't make it to next room, dont add all those minutes
    let nextDistance = shortestSteps
    if ((nextDistance + minutesPassed) > MAX_TIME) {
      nextDistance = MAX_TIME - minutesPassed
    }
    totalPressureReleased += (sumOpenValvePressure * nextDistance)
    minutesPassed += nextDistance
    if (minutesPassed >= MAX_TIME) { // didn't make it to the next room
      console.log('exit during travel')
      break
    }
    // arrive at next dest
    currentPos = nextDest
    // open the valve
    minutesPassed++
    // update valve as open
    toOpen = toOpen.filter(id => id != nextDest.id)
    openedValves.push(nextDest.id)
    sumOpenValvePressure += nextDest.flowRate
  }
  console.log('done')
  console.log('minutes', minutesPassed)
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
  const aadd = pathFinder.getShortestDistance('AA', 'DD')
  const aaddmins = 30 - aadd - 1
  const aajj = pathFinder.getShortestDistance('AA', 'JJ')
  const aajjmins = 30 - aajj - 1

  console.log('AA-DD', aadd, aaddmins, pathFinder.getValve('DD').flowRate)
  console.log('AA-JJ', aajj, aajjmins, pathFinder.getValve('JJ').flowRate)
}
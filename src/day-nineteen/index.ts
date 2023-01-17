import fs from 'fs'

type robotType = 'ore' | 'clay' | 'obsidian' | 'geode'
type cost = {
  quantity: number
  type: robotType
}
type robot = {
  type: robotType
  costs: cost[]
}

const blueprintsRaw = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n\n')
const bpCosts: {
  [robotType: string]: cost[]
}[] = []
for (const bpr of blueprintsRaw) {
  const line = bpr.split('\n').slice(1)
  const bp: {
    [robotType: string]: cost[]
  } = {}
  for (const l of line) {
    const [_, type, __, ___, cQ1, cT1, ____, cQ2, cT2] = l.trim().split(' ')
    const costs: cost[] = [{
      quantity: parseInt(cQ1),
      type: cT1.replace('.', '') as robotType,
    }]
    if (cQ2 && cT2) {
      costs.push({
        quantity: parseInt(cQ2),
        type: cT2.replace('.', '') as robotType,
      })
    }
    bp[type] = costs
  }
  bpCosts.push(bp)
}

const canBuild = (costs: cost[], mats: { [m: string]: number }) => {
  const n = {...mats}
  for (const c of costs) {
    n[c.type] -= c.quantity
    if (n[c.type] < 0) {
      return false
    }
  }
  return true
}
const build = (costs: cost[], mats: { [m: string]: number }) => {
  for (const c of costs) {
    mats[c.type] -= c.quantity
  }
}

export default () => {
  const bp = bpCosts[0]
  const activeRobots: robotType[] = []
  activeRobots.push('ore')
  let mats: {
    [mat: string]: number
  } = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  }
  const typePrio: robotType[] = [
    'geode',
    'obsidian',
    'clay',
    'ore',
  ]
  for (let mins = 0; mins < 24; mins++) {
    const nextMats = {...mats}
    // build robots if u can
    // needs to have some stockpile logic - save for higher prio robot
    // also might need some logic to figure out how many ore robots, clay robots, etc by certain minute thresholds?
    // complex planning logic. Interesting tho
    const nextRobots: robotType[] = []
    for (const t of typePrio) {
      if (canBuild(bp[t], nextMats)) {
        build(bp[t], nextMats)
        nextRobots.push(t)
      }
    }
    // use active robots to gather mats
    for (const t of activeRobots) {
      nextMats[t]++
    }
    mats = {...nextMats}
    activeRobots.push(...nextRobots)
  }
  console.log('time up')
  console.log(activeRobots)
  console.log(mats)
}
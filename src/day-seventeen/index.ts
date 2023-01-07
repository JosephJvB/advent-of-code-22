import fs from 'fs'
import Rock from './rock'

// x = 0 is left
// y = 0 is bottom (NOT TOP)
// otherwise all settled rocks y index's have to change as tower grows

export type jetDirection = '>' | '<'
const jets: jetDirection[] = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'.split('') as jetDirection[]
const WIDTH = 7
const TOTAL_ROCKS = 2022

export default () => {
  const rocks = fs.readFileSync(__dirname + '/data.txt', 'utf-8').toString()
    .split('\n\n').map(str => str.split('\n'))
  let towerHeight = 0
  let settledRocks: {
    [coord: string]: boolean
  } = {}
  let jIdx = 0
  for (let i = 0; i < TOTAL_ROCKS; i++) {
    const rIdx = i % rocks.length
    const r = new Rock(rocks[rIdx], towerHeight + 3, i)
    // don't need to check landed on first few - cos rock starts 3 above always
    // perf improve opp.
    while (true) {
      // move by jet
      const j = jets[jIdx++]
      if (jIdx == jets.length) {
        jIdx = 0
      }
      r.moveByJet(j, settledRocks)
      let landed = r.hasLanded(settledRocks)
      if (landed) {
        for (const coord in r.edges) {
          settledRocks[coord] = true
        }
        towerHeight = Math.max(r.y + r.height, towerHeight)
        break
      }
      // move down
      r.y--
    }
  }
  drawGrid(settledRocks)
  // console.log(Object.keys(settledRocks))
  console.log('final towerHeight', towerHeight)
}

function drawGrid(rocks: { [coord: string]: boolean }) {
  let Y = 0
  let X = 6
  for (let coord in rocks) {
    const [x, y] = coord.split(',').map(s => parseInt(s))
    Y = Math.max(Y, y)
  }
  const grid: string[][] = []
  for (let y = 0; y <= Y; y++) {
    const row = []
    for (let x = 0; x <= X; x++) {
      const c = `${x},${y}`
      if (rocks[c]) {
        row.push('#')
      } else {
        row.push('.')
      }
    }
    grid.push(row)
  }
  grid.reverse()
  const s = grid.map(r => r.join('')).join('\n')
  fs.writeFileSync(__dirname + '/../../src/day-seventeen/working/grid.txt', s)
}
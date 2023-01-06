import fs from 'fs'
import PathFinder from './pathFinder'
import Valve from './valve'

const MAX_TIME = 30

export default () => {
  // test()
  run1()
  run2()
}
function run2 () {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  const toOpen: string[] = []
  const pathFinder = new PathFinder()
  for (const l of lines) {
    const v = new Valve(l)
    pathFinder.addValve(v)
    if (v.flowRate > 0) {
      toOpen.push(v.id)
    }
  }
  pathFinder.setDistances()
  const res = pathFinder.findPathRecursive('AA', toOpen, MAX_TIME)
  console.log('res', res.score)
}
function run1 () {
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
  const toOpen: string[] = []
  const pathFinder = new PathFinder()
  for (const l of lines) {
    const v = new Valve(l)
    pathFinder.addValve(v)
    if (v.flowRate > 0) {
      toOpen.push(v.id)
    }
  }
  pathFinder.setDistances()
  const res = pathFinder.findPathRecursive('AA', toOpen, MAX_TIME)
  console.log('res', res.score)
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
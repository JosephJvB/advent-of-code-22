import fs from 'fs'
import Monkey from './monkey'
import monkeyParser from './parser'

const NUM_ROUNDS = 10000

const logs: string[][] = []
export default () => {
  const monkeys = monkeyParser().map(m => new Monkey(m))
  // https://www.reddit.com/r/adventofcode/comments/zifqmh/comment/j0avpoa/
  // """you must find a common multiple of all monkeys' divisors
  // and perform a modulo to each item
  // In this way, you find the right worry level for dividing by the divisor of each monkey."""
  // ah i get it. They know numbers will get too high
  // but all we want is how many times the items get passed
  // and items get passed based on output of division operation
  // we can normalize the items after each round by doing modulo by LCM
  // https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
  const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b
  const lcm = (a: number, b: number): number => a * b / gcd(a, b)
  const divisors = monkeys.map(m => m.testModulo)
  const lowest = divisors.reduce(lcm)
  console.log('lcm', lowest)
  for (const m of monkeys) {
    m.lcm = lowest
  }
  for (let i = 0; i < NUM_ROUNDS; i++) {
    logs.push(['round ' + (i + 1)])
    for (const m of monkeys) {
      const results = m.turn()
      logs.push(m.logs)
      m.logs = []
      for (const r of results) {
        monkeys[r.recipient].startingItems.push(r.item)
      }
    }
  }
  fs.writeFileSync(__dirname + '/../../src/day-eleven/working/logs.txt', logs.map(l => l.join('\n')).join('\n'))
  const [h1, h2] = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected)
  console.log(monkeys.map(m => m.itemsInspected))
  console.log('highestTwo', h1.itemsInspected, h2.itemsInspected)
  console.log('monkeyBusiness', h1.itemsInspected * h2.itemsInspected)
}

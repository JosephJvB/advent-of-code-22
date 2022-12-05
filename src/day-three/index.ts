import RucksackParser from './parser'
import Rucksack, { RucksackGroup, RucksackItem } from './rucksack'

export default () => {
  const parser = new RucksackParser(__dirname + '/data.txt')
  const data = parser.rucksackData
  // part1
  // let total = 0
  // for (const rsd of data) {
  //   const rs = new Rucksack(rsd)
  //   // console.log(rs.itemsString, `(${rs.totalPriority})`)
  //   total += rs.totalPriority
  // }
  // console.log('total prio', total)
  // part2
  let badgeTotal = 0
  for (let i = 0; i < data.length; i += 3) {
    const grouped = data.slice(i, i + 3).map(d => new Rucksack(d))
    const rsg = new RucksackGroup(grouped)
    badgeTotal += rsg.badge.priority
  }
  console.log('badgePrio', badgeTotal)
}

// vJrwpWtwJgWr
// hcsFMMfFFhFp

function testChars() {
  // const chars = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  // let last: number | null = null
  for (const c of chars) {
    const rsi = new RucksackItem(c)
    console.log(rsi.priority)
  }
}
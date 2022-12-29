import fs from 'fs'
import Comparer, { evalResult } from './comparer'
import Pair, { packetItem } from './pair'
import parser from './parser'

export default () => {
  const comparer = new Comparer()
  const parsed = parser()
  let i = 1
  let totalScore = 0
  // v1
  // for (const p of parsed) {
  //   const l = JSON.parse(p[0])
  //   const r = JSON.parse(p[1])
  //   const score = comparer.scorePair(new Pair(l, r), i++)
  //   totalScore += score
  // }
  // console.log('totalScore', totalScore)
  // v2
  const packets: packetItem[][] = []
  for (const p of parsed) {
    const l = JSON.parse(p[0])
    const r = JSON.parse(p[1])
    packets.push(l, r)
  }
  const d1: packetItem[] = [[2]]
  const d2: packetItem[] = [[6]]
  packets.push(d1, d2)
  packets.sort((a, z) => {
    const r = comparer.evalRecursive(new Pair(a, z))
    switch (r) {
      case evalResult.success:
        return -1
      case evalResult.fail:
        return 1
      case evalResult.empty:
        console.error('empty result on packet sort')
        process.exit()
    }
  })
  const packetsTxt = packets.map(p => JSON.stringify(p)).join('\n')
  fs.writeFileSync(__dirname + '/../../src/day-thirteen/working/sorted.txt', packetsTxt)

  const d1Str = JSON.stringify(d1)
  const d2Str = JSON.stringify(d2)
  const d1Idx = packets.findIndex(p => JSON.stringify(p) == d1Str) + 1
  const d2Idx = packets.findIndex(p => JSON.stringify(p) == d2Str) + 1
  console.log(d1Idx, d2Idx)
  console.log('distress', d1Idx * d2Idx)
}
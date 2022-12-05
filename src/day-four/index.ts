import PairParser from './parser'

export default () => {
  const parser = new PairParser(__dirname + '/data.txt')
  const pairs = parser.elfPairs
  let overlapPairs = 0
  let intersectPairs = 0
  for (const [i, p] of pairs.entries()) {
    if (p.totalOverlap) {
      overlapPairs++
    }
    if (p.intersect) {
      intersectPairs++
    }
  }
  console.log('total overlap', overlapPairs)
  console.log('intersect pairs', intersectPairs)
}
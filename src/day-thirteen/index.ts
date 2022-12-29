import Comparer from './comparer'
import Pair from './pair'
import parser from './parser'

export default () => {
  const comparer = new Comparer()
  const parsed = parser()
  let i = 1
  let totalScore = 0
  for (const p of parsed) {
    const l = JSON.parse(p[0])
    const r = JSON.parse(p[1])
    const score = comparer.scorePair(new Pair(l, r), i++)
    totalScore += score
  }
  console.log('totalScore', totalScore)
}
// left must be lower than right
// left must have fewer items in a list than right
// if one is list and one is int, add the int to list and compare
// count correct pairs (1-indexed) add their indicies
// do we need recursion to check nested arrays?
// case int v int: compare value
// case array v array: loop and compare list items
// case int v array

import Comparer from './comparer'
import Pair from './pair'
import parser from './parser'

export default () => {
  const parsed = parser()
  const pairs: Pair[] = []
  let i = 1
  for (const p of parsed) {
    const l = JSON.parse(p[0])
    const r = JSON.parse(p[1])
    pairs.push(new Pair(l, r, i++))
  }
  console.log('got', pairs.length, 'pairs')
  const comparer = new Comparer()
  const score = comparer.evalPair(pairs[0])
  console.log('score', score)
}
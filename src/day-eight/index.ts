import { VisibleTree, ScoreTree, ScoreCopter, SpotCopter } from './copter'
import TreeParser from './parser'

export default () => {
  const parser = new TreeParser(__dirname + '/data.txt')
  const grid = parser.treeGrid
  const trees: ScoreTree[][] = []
  for (let y = 0; y < grid.length; y++) {
    const row: ScoreTree[] = []
    for (let x = 0; x < grid.length; x++) {
      const h = grid[y][x]
      row.push(new ScoreTree(h, x, y))
    }
    trees.push(row)
  }
  const copter = new ScoreCopter(trees)
  // const visibleTrees: Tree[] = []
  // for (let y = 1; y < grid.length - 1; y++) {
  //   for (let x = 1; x < grid.length - 1; x++) {
  //     const t = trees[y][x]
  //     copter.spotTree(t)
  //     if (t.isVisible) {
  //       visibleTrees.push(t)
  //     }
  //   }
  // }
  // // console.log(visibleTrees)
  // console.log('visibleTrees', visibleTrees.length)
  // const outSideTreeCount = ((grid.length - 2) * 2) + ((grid[0].length - 2) * 2) + 4
  // console.log('outsideTreeCount', outSideTreeCount)
  // const totalVisible = visibleTrees.length + outSideTreeCount
  // console.log('totalVisible', totalVisible)
  
  let highestScore: ScoreTree = null
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid.length - 1; x++) {
      const t = trees[y][x]
      copter.scoreTree(t)
      // console.log(t)
      if (!highestScore || t.score > highestScore.score) {
        highestScore = t
      }
    }
  }
  console.log('highestScore', highestScore.score)
}

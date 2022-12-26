import DjikstraSolver from './dijkstras-solver'
import parser from './parser'
import RecursiveSolver from './recursive-solver'

export default async () => {
  const parsedGrid = parser()
  // const solver = new RecursiveSolver(parsedGrid)
  // solver.solveRecursive()
  const solver = new DjikstraSolver(parsedGrid)
  // solver.solveV1()
  solver.solveV2()
}
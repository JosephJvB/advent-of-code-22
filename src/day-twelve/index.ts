import parser from './parser'
import Solver from './solver'

export default async () => {
  const parsedGrid = parser()
  const solver = new Solver(parsedGrid)
  solver.solveRecursive()
}
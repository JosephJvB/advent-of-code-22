import { Coord } from './grid'

export const manhatDist = (a: Coord, b: Coord): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}
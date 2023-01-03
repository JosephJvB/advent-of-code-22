import { Coord, Sensor } from './grid'

export const manhatDist = (a: Coord, b: Coord): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export const getPerimeterCoords = (center: Coord, radius: number): Coord[] => {
  let x = center.x - radius
  let y = center.y
  const coords: Coord[] = []
  // left to top
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y--
    x++
  }
  // top to right
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y++
    x++
  }
  // right to bottom
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y++
    x--
  }
  // bottom to left
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y--
    x--
  }
  return coords
}
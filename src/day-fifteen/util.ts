import { Coord, Sensor } from './grid'

export const manhatDist = (a: Coord, b: Coord): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export const getPerimeterCoords = (center: Sensor, radius: number): Coord[] => {
  // start @ far left point
  let x = center.x - radius
  let y = center.y
  const coords: Coord[] = []
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y--
    x++
  }
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y++
    x++
  }
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y++
    x--
  }
  for (let r = 0; r < radius; r++) {
    coords.push({ x, y })
    y--
    x--
  }
  return coords
}
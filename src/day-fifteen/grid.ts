import fs from 'fs'
import { manhatDist } from './util'

export type Coord = {
  x: number
  y: number
}
export type Sensor = Coord & {
  beaconDistance: number
}

const getCoord = (s: string): Coord => {
  const [xStr, yStr] = s.split(', ')
  const x = parseInt(xStr.split('x=')[1])
  const y = parseInt(yStr.split('y=')[1])
  return { x, y }
}

export default class Grid {
  public grid: string[][] = []
  public sensors: Sensor[] = []
  public max: Coord = { x: 0, y: 0 }
  public min: Coord = { x: Infinity, y: Infinity }
  constructor() {
    const lines = fs.readFileSync(__dirname + '/data.txt', 'utf8').toString().split('\n')
    const beacons: Coord[] = []
    for (const l of lines) {
      const sensorStr = l.split('Sensor at ')[1].split(':')[0]
      const beaconStr = l.split('beacon is at ')[1].split(':')[0]
      const sc = getCoord(sensorStr)
      const bc = getCoord(beaconStr)
      this.sensors.push({
        ...sc,
        beaconDistance: manhatDist(sc, bc)
      })
      beacons.push(bc)
      for (const c of [sc, bc]) {
        if (c.x > this.max.x) this.max.x = c.x
        if (c.y > this.max.y) this.max.y = c.y
        if (c.x < this.min.x) this.min.x = c.x
        if (c.y < this.min.y) this.min.y = c.y
      }
    }
    for (const s of this.sensors) {
      // adjust min values
      s.x -= this.min.x
      s.y -= this.min.y
    }
    for (const b of beacons) {
      // adjust min values
      b.x -= this.min.x
      b.y -= this.min.y
    }
    this.drawGrid(beacons)
    // for each sensor add impossible coords
    // find impossibleCoords where y = input?
    const impossibleCoords: Coord[] = []
  }
  // ISSUE: can't compute large grid
  // have to use calculations only, not create massive 2d array
  drawGrid(beacons: Coord[]) {
    if (this.max.y > 100) {
      console.warn('maxValues too large, not drawing grid')
      return
    }
    for (let y = 0; y <= (this.max.y - this.min.y); y++) {
      const row: string[] = []
      for (let x = 0; x <= (this.max.x - this.min.x); x++) {
        row.push('.')
      }
      this.grid.push(row)
    }
    for (const s of this.sensors) {
      this.grid[s.y][s.x] = 'S'
    }
    for (const b of beacons) {
      this.grid[b.y][b.x] = 'B'
    }
    this.saveFile()
    // add sensor ranges
    const filledCells = ['S', 'B', '#']
    for (const s of this.sensors) {
      const minY = s.y - s.beaconDistance
      const minX = s.x - s.beaconDistance
      const maxY = s.y + s.beaconDistance
      const maxX = s.x + s.beaconDistance
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          if (!this.grid[y]?.[x] || filledCells.includes(this.grid[y][x])) {
            continue
          }
          const c = { x , y}
          const _d = manhatDist(s, c)
          if (_d <= s.beaconDistance) {
            this.grid[y][x] = '#'
          }
        }
      }
    }
    this.saveFile()
  }
  saveFile() {
    fs.writeFileSync(
      __dirname + '/../../src/day-fifteen/working/grid.txt',
      this.grid.map(r => r.join('')).join('\n')
    )
  }
}
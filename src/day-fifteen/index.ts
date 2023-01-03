import { Coord } from '../day-fourteen'
import Grid, { Sensor } from './grid'
import { getPerimeterCoords, manhatDist } from './util'

const Y = 2000000
// const Y = 10

export default () => {
  const g = new Grid()
  let impossibleBeacons = 0
  const coords: Coord[] = []
  const y = Y - g.min.y
  // find new way to calc not using computed 2d array
  // console.log('min,max', g.min, g.max)
  // console.log('checking', g.max.x - g.min.x, 'cells in row', y)
  // for (let x = 0; x <= (g.max.x - g.min.x); x++) {
  //   const c: Coord = { x, y }
  //   const k = `${x}x${y}`
  //   // cant have hidden beacon on existing beacon or sensor
  //   if (g.sensorCoords[k] || g.beaconCoords[k]) {
  //     continue
  //   }
  //   const insideExistingSensorRange = g.sensors.find(s => {
  //     const d = manhatDist(s, c)
  //     return d <= s.beaconDistance
  //   })
  //   if (insideExistingSensorRange) {
  //     impossibleBeacons++
  //     coords.push(c)
  //   }
  // }
  // console.log('impossibleBeacons', impossibleBeacons)
  // attempt2: reddit.com
  // this one is better, since it checks many many fewer cells. But it's not my solution :)
  // const checkedCells: {
  //   [coord: string]: boolean
  // } = {}
  // for (const s of g.sensors) {
  //   const top = s.y - s.beaconDistance
  //   const bottom = s.y + s.beaconDistance
  //   // sensor range doesn't intersect with desired Y value
  //   const intersectY = y >= top && y <= bottom
  //   if (!intersectY) {
  //     continue
  //   }
  //   const left = s.x - s.beaconDistance
  //   const right = s.x + s.beaconDistance
  //   for (let x = left; x <= right; x++) {
  //     const c = { x, y }
  //     const coord = `${x}x${y}`
  //     if (checkedCells[coord] || g.beaconCoords[coord]) {
  //       continue
  //     }
  //     const d = manhatDist(c, s)
  //     if (d <= s.beaconDistance) {
  //       checkedCells[coord] = true
  //       impossibleBeacons++
  //     }
  //   }
  // }
  // console.log('impossibleBeacons', impossibleBeacons)
  // part 2
  // loop cells around (perimeter + 1) of all sensors & within range 0-4,000,000
  // if any cell is not within range of any other sensor, it's the distress one
  const MIN = 0
  const MAX = 4000000
  const MIN_X = MIN - g.min.x
  const MAX_X = MAX - g.min.x
  const MIN_Y = MIN - g.min.y
  const MAX_Y = MAX - g.min.y
  console.log('x min,max', MIN_X, MAX_X)
  console.log('y min, max', MIN_Y, MAX_Y)
  console.log('sensors.length', g.sensors.length)
  // for all sensors
  // loop all perim coords
  // if any perim coord not in range of another sensor
  // that coord is distress
  for (let i = 0; i < g.sensors.length; i++) {
    const s = g.sensors[i]
    const perimCoords = getPerimeterCoords(s, s.beaconDistance + 1)
    console.log('sensor', i + 1, 'has', perimCoords.length, 'perim coords')
    // console.time('sensor.' + i)
    // console.timeEnd('sensor.' + i)
    // don't need to check the current sensor, we know it's out of range
    const otherSensors = [...g.sensors]
    otherSensors.splice(i, 1)
    for (const c of perimCoords) {
      if (c.x > MAX_X || c.x < MIN_X || c.y > MAX_Y || c.y < MIN_Y) {
        continue
      }

      const inRange = otherSensors.find(s => {
        const d = manhatDist(s, c)
        return d <= s.beaconDistance
      })
      if (!inRange) {
        console.log(c, 'not in range of any sensors')
        const x = c.x + g.min.x
        const y = c.y + g.min.y
        console.log(
          'coord normalized',
          'x=', x,
          'y=', y,
          'ans=' + (x * MAX + y)
        )
        return
      }
    }
  }
}

// 4305253 also too low
// 4305252 too low

// 4827924 - reddit solution
// 4694749 - number of cells i had in row 2mill
// something is wrong. I didn't even have enough cells in that row, let alone found

// not sure why my idea didn't work
// Oh I think it's because my min and max restricted the row
// actually min and max need to take into account min/max sensor range - not just coordinate
// so min and max of grid should be, something like that
// minY = Math.min(minYCoord, minSensorYCoord - (minSensorYCoord - minSensorYCoord.Radius))

// without sensor range incl
// min,max { x: -615866, y: -405749 } { x: 4078883, y: 3970934 }
// with sensor range incl
// min,max { x: -1493183, y: -1134737 } { x: 1568487, y: 2509620 }
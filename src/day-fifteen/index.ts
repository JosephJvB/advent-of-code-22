import Grid from './grid'

// const Y = 2000000
const Y = 10

export default () => {
  const g = new Grid()
  let impossibleBeacons = 0
  const y = Y - g.min.y
  // find new way to calc not using computed 2d array
  console.log('impossibleBeacons', impossibleBeacons)
}
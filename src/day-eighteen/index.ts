import fs from 'fs'

type Cube = {
  x: number
  y: number
  z: number
}

const getNeighbours = (c: Cube): Cube[] => {
  const { x, y, z } = c
  return [
    { x: x + 1, y, z },
    { x: x - 1, y, z },
    { x, y: y + 1, z },
    { x, y: y - 1, z },
    { x, y, z: z + 1 },
    { x, y, z: z - 1 },
  ]
}
export default () => {
  const cubeMap: {
    [coord: string]: boolean
  } = {}
  const cubes: Cube[] = fs.readFileSync(__dirname + '/data.txt', 'utf-8').toString()
    .split('\n').map(l => {
      const [x, y, z] = l.split(',').map(s => parseInt(s))
      const coord = [x, y, z].join(',')
      cubeMap[coord] = true
      return { x, y, z }
    })
  console.log(cubeMap)
  let totalExposed = 0
  for (const c of cubes) {
    let exposed = 6
    for (const { x, y, z } of getNeighbours(c)) {
      const coord = [x, y, z].join(',')
      if (cubeMap[coord]) {
        exposed--
      }
    }
    totalExposed += exposed
  }
  console.log('exposed', totalExposed)
}
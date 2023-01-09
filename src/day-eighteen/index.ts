import fs from 'fs'

type Cube = number[]

const getNeighbours = (c: Cube): Cube[] => {
  const [ x, y, z ] = c
  return [
    [ x + 1, y, z ],
    [ x - 1, y, z ],
    [ x, y + 1, z ],
    [ x, y - 1, z ],
    [ x, y, z + 1 ],
    [ x, y, z - 1 ],
  ]
}
export default () => {
  const cubeMap: {
    [coord: string]: boolean
  } = {}
  const cubes: Cube[] = []
  const lines = fs.readFileSync(__dirname + '/data.txt', 'utf-8').toString().split('\n')
  // max coords
  let X = 0
  let Y = 0
  let Z = 0
  for (const l of lines) {
    const [x, y, z] = l.split(',').map(s => parseInt(s))
    const coord = [x, y, z].join(',')
    cubeMap[coord] = true
    cubes.push([ x, y, z ])
    if (x > X) X = x
    if (y > Y) Y = y
    if (z > Z) Z = z
  }
  const spaces: {
    [coord: string]: boolean
  } = {}
  // part 1
  // let totalExposed = 0
  // for (const c of cubes) {
  //   let exposed = 6
  //   const neighbours = getNeighbours(c)
  //   for (let i = 0; i < neighbours.length; i++) {
  //     const n = neighbours[i]
  //     const coord = n.join(',')
  //     if (cubeMap[coord]) {
  //       exposed--
  //     } else {
  //       spaces[coord] = true
  //     }
  //   }
  //   totalExposed += exposed
  // }
  // console.log('totalExposed', totalExposed)

  // bounds from 0-1 -> v+1
  const inBounds = (c: Cube) => {
    const limits = [X + 1, Y + 1, Z + 1]
    for (let i = 0; i < c.length; i++) {
      const v = c[i]
      if (v < -1) {
        return false
      }
      const max = limits[i]
      if (v > max) {
        return false
      }
    }
    return true
  }
  // thought about flood filling from every space - if I reach bounds, it's an exposed edge
  // i don't think that works
  // https://github.com/silentw0lf/advent_of_code_2022/blob/main/18/solve.py
  // this solution fills makes a +1 container around the cube
  // then flood fills the container around the cube
  // every time we hit a coord we have already seen - that is finding another exposed face
  let externalExposed = 0
  const seen: {
    [coord: string]: boolean
  } = {}
  const queue = [[-1, -1, -1]]
  while (queue.length) {
    const current = queue.shift()
    const coord = current.join(',')
    if (cubeMap[coord]) {
      externalExposed++
      continue
    }
    if (seen[coord]) {
      continue
    }
    seen[coord] = true
    const neighbours = getNeighbours(current)
    for (const n of neighbours) {
      if (inBounds(n)) {
        queue.push(n)
      }
    }
  }
  console.log('externalExposed', externalExposed)
}
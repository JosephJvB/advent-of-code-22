import Cave from './cave'

export type Coord = {
  x: number
  y: number
}
export type Rock = Coord[]
export default () => {
  const cave = new Cave()
  cave.saveGrid()
  while (cave.runSim) {
    cave.addSand()
    if (cave.sandCount % 500 == 0) {
      cave.saveGrid()
    }
    // if (cave.sandCount > 200) {
    //   break
    // }
  }
  cave.saveGrid()
  console.log('cave sim ended with', cave.sandCount, 'sandCount')
}

// 30158 - too high
const grid = [
  [1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1],
]

// 1 1 > 1
// 2 0 > 1
// 3 1 > 1
// 4 2 > 1
// 5 3 > 1


const center = {
  x: 3,
  y: 2
}
const radius = 2

const c = getPerimiterCells(center, radius)
console.log(c)

function getPerimiterCells(cell, radius) {
  // start @ far left point
  let x = cell.x - radius
  let y = cell.y
  const cells = []
  for (let r = 0; r < radius; r++) {
    cells.push(grid[y--][x++])
  }
  for (let r = 0; r < radius; r++) {
    cells.push(grid[y++][x++])
  }
  for (let r = 0; r < radius; r++) {
    cells.push(grid[y++][x--])
  }
  for (let r = 0; r < radius; r++) {
    cells.push(grid[y--][x--])
  }
  return cells
}
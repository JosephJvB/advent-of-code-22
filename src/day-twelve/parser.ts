import fs from 'fs'

export default () => {
  const rawData = fs.readFileSync(__dirname + '/data.txt', 'utf8')
  const grid: string[][] = []
  for (const line of rawData.split('\n')) {
    const row: string[] = []
    for (const cell of line.split('')) {
      row.push(cell)
    }
    grid.push(row)
  }
  return grid
}
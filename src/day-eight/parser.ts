import fs from 'fs'

export default class TreeParser {
  constructor (public fileName: string) {}
  get treeGrid(): number[][] {
    const grid: number[][] = []
    const rawData = fs.readFileSync(this.fileName, 'utf8')
    for (const line of rawData.split('\n')) {
      const row = line.split('').map(Number)
      grid.push(row)
    }
    return grid
  }
}
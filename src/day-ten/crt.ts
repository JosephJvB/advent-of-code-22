import fs from 'fs'

export default class Crt {
  public pixelGrid: string[][] = []
  public grids: string[] = []
  constructor(public width: number, public height: number) {
    for (let h = 0; h < height; h++) {
      const row: string[] = []
      for (let w = 0; w < width; w++) {
        row.push('.')
      }
      this.pixelGrid.push(row)
    }
  }
  update(c: number, spriteX: number) {
    const cIdx = c - 1
    const x = cIdx % 40
    const y = Math.floor(cIdx / 40)
    const xDiff = Math.abs(x - spriteX)
    if (xDiff < 2) {
      this.pixelGrid[y][x] = '#'
    }

    // save file
    const s = this.pixelGrid[y][spriteX]
    this.pixelGrid[y][spriteX] = 's'
    this.saveFrame()
    this.pixelGrid[y][spriteX] = s
  }
  saveFrame() {
    const frame = this.pixelGrid.map(r => r.join('')).join('\n')
    this.grids.push(frame)
  }
  writeGrid() {
    const txt = this.grids.join('\n\n')
    fs.writeFileSync(__dirname + '/../../src/day-ten/working/grid.txt', txt)
    fs.writeFileSync(__dirname + '/../../src/day-ten/working/lastFrame.txt', this.grids[this.grids.length - 1])
  }
}
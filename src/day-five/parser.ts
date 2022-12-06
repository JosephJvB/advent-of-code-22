import fs from 'fs'

// Uppercase CharCodes: 65 -> 90

export default class Parser {
  idxLine: string
  crateLines: string[] = []
  instructionLines: string[] = []
  constructor(private fileName: string) {
    const rawData = fs.readFileSync(this.fileName, 'utf8')
    for (let line of rawData.split('\n')) {
      const trim = line.trim()
      if (!trim) {
        continue
      }
      if (trim.startsWith('move')) {
        this.instructionLines.push(line)
      }
      else if (trim.startsWith('[')) {
        this.crateLines.push(line)
      }
      else if (!isNaN(Number(trim[0]))) {
        this.idxLine = line
      }
    }
    // add to stacks from bottom line
    this.crateLines.reverse()
  }
}
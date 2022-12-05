import fs from 'fs'

export default class RucksackParser {
  constructor(private fileName: string) {}
  get rucksackData(): string[] {
    const rucksackData: string[] = []
    const rawData = fs.readFileSync(this.fileName, 'utf8')
    for (let line of rawData.split('\n')) {
      line = line.trim()
      if (!line) {
        continue
      }
      rucksackData.push(line)
    }
    return rucksackData
  }
}
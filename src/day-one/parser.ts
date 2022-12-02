import fs from 'fs'

export default class ElfDataParser {
  constructor(private filePath: string) {}
  get elfDataFromFile(): number[][] {
    const allElves: number[][] = []
    const rawData: string = fs.readFileSync(this.filePath, 'utf8')
    let currentElf: number[] = []
    for (let line of rawData.split('\n')) {
      line = line.trim()
      if (!line) {
        if (currentElf.length) {
          allElves.push(currentElf)
          currentElf = []
        }
      } else {
        currentElf.push(Number(line))
      }
    }
    if (currentElf.length) { // actually data file ends on a blank line so this doesn't run
      allElves.push(currentElf)
    }
    return allElves
  }
}
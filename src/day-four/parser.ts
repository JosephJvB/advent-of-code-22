import fs from 'fs'
import Elf, { ElfPair } from './elf';

export default class PairParser {
  constructor(private fileName: string) {}
  get elfPairs(): ElfPair[] {
    const pairs: ElfPair[] = []
    const rawData = fs.readFileSync(this.fileName, 'utf8')
    for (let line of rawData.split('\n')) {
      line = line.trim()
      if (!line) {
        continue
      }
      const [one, two] = line.split(',').map(str => {
        const [start, end] = str.split('-')
        return new Elf(Number(start), Number(end))
      })
      const pair = new ElfPair(one, two)
      pairs.push(pair)
    }
    return pairs
  }
}
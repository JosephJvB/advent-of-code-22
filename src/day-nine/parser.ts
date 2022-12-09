import fs from 'fs'

export type direction = 'U' | 'R' | 'D' | 'L'
export interface IStep {
  direction: direction
  count: number
}

export default class RopeParser {
  constructor(public fileName: string) {}
  get steps(): IStep[] {
    const allSteps: IStep[] = []
    const rawData = fs.readFileSync(this.fileName, 'utf-8')
    for (const line of rawData.split('\n')) {
      const [direction, countStr] = line.split(' ')
      allSteps.push({
        direction: direction as direction,
        count: Number(countStr)
      })
    }
    return allSteps
  }
}
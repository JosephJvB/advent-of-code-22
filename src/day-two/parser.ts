import fs from 'fs'
import { Round_v1, Round_v2, OpponentAnswer, PlayerAnswer, DesiredResult } from './round'

export default class RPSParser {
  constructor(private filePath: string) {}
  get rounds(): Round_v2[] {
    const rounds: Round_v2[] = []
    const rawData = fs.readFileSync(this.filePath, 'utf8')
    for (let line of rawData.split('\n')) {
      line = line.trim()
      if (!line) {
        continue
      }
      // const [opp, player] = line.split(' ')
      // rounds.push(new Round_v1(
      //   opp as OpponentAnswer,
      //   player as PlayerAnswer
      // ))
      const [opp, result] = line.split(' ')
      rounds.push(new Round_v2(
        opp as OpponentAnswer,
        result as DesiredResult
      ))
    }
    return rounds
  }
}
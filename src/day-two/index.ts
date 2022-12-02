import RPSParser from './parser'

export default () => {
  const parser = new RPSParser(__dirname + '/data.txt')
  const gameRounds = parser.rounds
  // for (const r of gameRounds.slice(0, 10)) {
  //   r.log()
  // }
  let total = 0
  for (const r of gameRounds) {
    total += r.totalScore
  }
  console.log('total score', total)
}

// function test() {
//   const rounds: Round[] = []
//   for (const oa of opponentAnswers) {
//     for (const pa of playerAnswers) {
//       const r = new Round(oa, pa)
//       rounds.push(r)
//     }
//   }
//   rounds.sort((a, z) => z.totalScore - a.totalScore)
//   for (const r of rounds) {
//     r.log()
//   }
// }
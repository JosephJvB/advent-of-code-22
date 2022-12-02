type GameShapes = 'rock' | 'paper' | 'scissors'
export type OpponentAnswer = 'A' | 'B' | 'C'
export type PlayerAnswer = 'X' | 'Y' | 'Z'
export type DesiredResult = 'X' | 'Y' | 'Z'
type GameResult = 'WIN' | 'LOSE' | 'DRAW'

const gameShapes: GameShapes[] = ['rock', 'paper', 'scissors']
export const opponentAnswers: OpponentAnswer[] = ['A', 'B', 'C']
export const playerAnswers: PlayerAnswer[] = ['X', 'Y', 'Z']
export const desiredResults: DesiredResult[] = ['X', 'Y', 'Z']
export const gameResults: GameResult[] = ['LOSE', 'DRAW', 'WIN']
const choiceScores: number[] = [1, 2, 3]

const gameScores: {
  [result in GameResult]: number
} = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
}

export class Round_v2 {
  opponentChoice: GameShapes
  playerChoice: GameShapes
  gameResult: GameResult
  choiceScore: number
  constructor(private opponent: OpponentAnswer, private desiredResult: DesiredResult) {
    const opponentAnswerIndex = opponentAnswers.findIndex(a => a == this.opponent)
    const desiredResultIndex = playerAnswers.findIndex(a => a == this.desiredResult)

    this.opponentChoice = gameShapes[opponentAnswerIndex]
    this.gameResult = gameResults[desiredResultIndex]

    let desiredAnswerIdx = opponentAnswerIndex
    switch (this.gameResult) {
      case 'WIN':
        desiredAnswerIdx++
        break
      case 'LOSE':
        desiredAnswerIdx--
        break
    }
    // handle oob
    if (desiredAnswerIdx < 0) {
      desiredAnswerIdx = 2
    }
    if (desiredAnswerIdx > 2) {
      desiredAnswerIdx = 0
    }
    this.playerChoice = gameShapes[desiredAnswerIdx];
    this.choiceScore = choiceScores[desiredAnswerIdx]
  }
  get totalScore() {
    return gameScores[this.gameResult] + this.choiceScore
  }
  log() {
    console.log(
      'opp=' + this.opponentChoice,
      'player=' + this.playerChoice,
      'desiredResult=' + this.desiredResult + ':' + this.gameResult,
      'choiceScore=' + this.choiceScore,
      'total=' + this.totalScore
    )
  }
}

export class Round_v1 {
  opponentChoice: GameShapes
  playerChoice: GameShapes
  gameResult: GameResult
  choiceScore: number
  constructor(private opponent: OpponentAnswer, private player: PlayerAnswer) {
    const opponentAnswerIndex = opponentAnswers.findIndex(a => a == this.opponent)
    const playerAnswerIndex = playerAnswers.findIndex(a => a == this.player)

    this.opponentChoice = gameShapes[opponentAnswerIndex]
    this.playerChoice = gameShapes[playerAnswerIndex]

    this.choiceScore = playerAnswerIndex + 1 // rock:1, paper:2, scissors:3

    this.gameResult = 'LOSE'
    if (playerAnswerIndex == opponentAnswerIndex) {
      this.gameResult = 'DRAW'
    }
    let winIndex = opponentAnswerIndex + 1
    if (winIndex > 2) {
      winIndex = 0
    }
    if (playerAnswerIndex == winIndex) {
      this.gameResult = 'WIN'
    }
  }
  get totalScore() {
    return gameScores[this.gameResult] + this.choiceScore
  }
  log() {
    console.log(
      'opp=' + this.opponentChoice,
      'player=' + this.playerChoice,
      'result=' + this.gameResult,
      'choiceScore=' + this.choiceScore,
      'total=' + this.totalScore
    )
  }
}
import { Crane_9000, Crane_9001 } from './crane'
import Instruction from './instruction'
import Parser from './parser'

export default () => {
  const parser = new Parser(__dirname + '/data.txt')
  // make crate stacks
  // could move this to parser?
  const crateStacks: string[][] = []
  for (let i = 0; i < parser.idxLine.length; i++) {
    const idxChar = parser.idxLine[i]
    if (!idxChar.trim()) { // skip whitespace
      continue
    }
    crateStacks.push([])
    const stackIdx = Number(idxChar) - 1
    for (const line of parser.crateLines) {
      const crateChar = line[i]
      const trim = crateChar.trim()
      if (!trim) {
        continue
      }
      // guard
      const code = crateChar.charCodeAt(0)
      if (code < 65 || code > 90) {
        throw new Error(`Invalid crate char "${trim}":${code}`)
      }
      crateStacks[stackIdx].push(crateChar)
    }
  }
  // operate crane
  // const crane = new Crane_9000(crateStacks)
  const crane = new Crane_9001(crateStacks)
  for (const line of parser.instructionLines) {
    const i = new Instruction(line)
    crane.executeInstruction(i)
  }
  console.log('top crates', crane.topCrates)
}
import fs from 'fs'

export type Cmd = 'noop' | 'addx'
export interface Instruction {
  value: number
  cycles: number
}

export default (fileName: string): Instruction[] => {
  const raw = fs.readFileSync(fileName, 'utf8')
  const instructions: Instruction[] = []
  for (const line of raw.split('\n')) {
    const [cmd, value] = line.split(' ')
    let cycles = 0
    switch (cmd as Cmd) {
      case 'addx':
        cycles = 2
        break
      case 'noop':
        cycles = 1
        break
    }
    if (cycles > 0) {
      instructions.push({
        cycles,
        value: value ? Number(value) : 0
      })
    }
  }
  return instructions
}
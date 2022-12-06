import Instruction from './instruction';

abstract class Crane {
  constructor(public crateStacks: string[][]) {}
  abstract executeInstruction(i: Instruction): void
  abstract get topCrates(): string
}
export class Crane_9001 extends Crane {
  executeInstruction(i: Instruction) {
    const toMove = this.crateStacks[i.from].splice(i.quantity * -1, i.quantity)
    this.crateStacks[i.to].push(...toMove)
  }
  get topCrates(): string {
    let topCrateStr = ''
    for (const stack of this.crateStacks) {
      const topCrateChar = stack[stack.length - 1]
      topCrateStr += topCrateChar
    }
    return topCrateStr
  }
}

export class Crane_9000 extends Crane {
  executeInstruction(i: Instruction) {
    for (let q = 0; q < i.quantity; q++) {
      const c = this.crateStacks[i.from].pop()
      if (c) {
        this.crateStacks[i.to].push(c)
      } else {
        console.error('tried to move crate from empty stack', i.from)
      }
    }
  }
  get topCrates(): string {
    let topCrateStr = ''
    for (const stack of this.crateStacks) {
      const topCrateChar = stack[stack.length - 1]
      topCrateStr += topCrateChar
    }
    return topCrateStr
  }
}
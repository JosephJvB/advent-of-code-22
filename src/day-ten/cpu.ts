import { Instruction } from './parser'

export default class Cpu {
  public cycleCount: number = 0
  public registerTracker: {
    [cycleNum: number]: number
  } = {}
  constructor(public register: number) {}
  cycle() {
    this.cycleCount++
    const mod40 = Math.abs(this.cycleCount % 40)
    if (mod40 == 20) {
      this.registerTracker[this.cycleCount] = this.register
    }
  }
}
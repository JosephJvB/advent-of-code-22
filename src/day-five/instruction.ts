export default class Instruction {
  quantity: number
  from: number
  to: number
  constructor(private instructionStr: string) {
    const [
      moveStr,
      quantity,
      fromStr,
      fromIdx,
      toStr,
      toIdx,
    ] = this.instructionStr.split(' ')
    this.quantity = Number(quantity)
    this.from = Number(fromIdx) - 1
    this.to = Number(toIdx) - 1
  }
}
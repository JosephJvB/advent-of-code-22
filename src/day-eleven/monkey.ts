import { IParsedMonkey } from './parser'

export interface ITurnResult {
  recipient: number
  item: number
}

export default class Monkey implements IParsedMonkey {
  id: number
  startingItems: number[]
  operation: string
  testModulo: number
  testTrueRecipient: number
  testFalseRecipient: number
  itemsInspected: number = 0
  logs: string[] = []
  lcm: number
  constructor(m: IParsedMonkey) {
    this.id = m.id
    this.startingItems = m.startingItems
    this.operation = m.operation
    this.testModulo = m.testModulo
    this.testTrueRecipient = m.testTrueRecipient
    this.testFalseRecipient = m.testFalseRecipient
  }
  turn(): ITurnResult[] {
    const results: ITurnResult[] = []
    this.logs.push('')
    this.logs.push(`[${this.id}] startingItems: ${this.startingItems.join(',')}`)
    while (this.startingItems.length) {
      const item = this.startingItems.shift()
      const updated = this.updateItem(item)
      const recipient = this.testItem(updated) ? this.testTrueRecipient : this.testFalseRecipient
      this.logs.push(`[${this.id}] item:${item} -> updated:${updated} -> throw to: ${recipient}`)
      results.push({
        item: updated,
        recipient,
      })
    }
    this.logs.push(`[${this.id}] turn end`)
    return results
  }
  private testItem(i: number) {
    this.itemsInspected++
    return i % this.testModulo == 0
  }
  private updateItem(i: number) {
    const fn = this.operation.replace(/old/g, i.toString())
    return Number(eval(fn)) % this.lcm
    // return Math.floor(Number(eval(fn)) / 3)
  }
}
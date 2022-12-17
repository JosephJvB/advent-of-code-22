import fs from 'fs'

export interface IParsedMonkey {
  id: number
  startingItems: number[]
  operation: string
  testModulo: number
  testTrueRecipient: number
  testFalseRecipient: number
}

// Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3

export default () => {
  const monkeys: IParsedMonkey[] = []
  const f = __dirname + '/data.txt'
  const rawData = fs.readFileSync(f, 'utf8')
  let currentMonkey: Partial<IParsedMonkey> = {}
  for (const monkeyChunk of rawData.split('\n\n')) {
    const [
      titleLine,
      itemsLine,
      operationLine,
      testLine,
      testTrueLine,
      testFalseLine
    ] = monkeyChunk.split('\n')
    currentMonkey.id = monkeys.length
    currentMonkey.startingItems = itemsLine.replace('Starting items: ', '').split(', ').map(Number)
    currentMonkey.operation = operationLine.replace('Operation: new = ', '').trim()
    currentMonkey.testModulo = Number(testLine.replace('Test: divisible by ', '').trim())
    currentMonkey.testTrueRecipient = Number(testTrueLine.replace('If true: throw to monkey ', ''))
    currentMonkey.testFalseRecipient = Number(testFalseLine.replace('If false: throw to monkey ', ''))
    monkeys.push(currentMonkey as IParsedMonkey)
    currentMonkey = {}
  }
  return monkeys
}

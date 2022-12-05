export class RucksackGroup {
  badge: RucksackItem
  constructor (private rucksacks: Rucksack[]) {
    if (this.rucksacks.length != 3) {
      throw new Error('invalid rucksack group. Received group length of ' + this.rucksacks.length)
    }
    const firstRucksack = this.rucksacks[0]
    const otherRucksacks = this.rucksacks.slice(1)
    for (const char in firstRucksack.uniqueItemsMap) {
      const presentInAll = otherRucksacks.every(or => !!or.uniqueItemsMap[char])
      if (presentInAll) {
        this.badge = firstRucksack.uniqueItemsMap[char]
        break
      }
    }
  }
}

export default class Rucksack {
  leftSide: {
    [char: string]: RucksackItem
  } = {}
  rightSide: {
    [char: string]: RucksackItem
  } = {}
  both: RucksackItem[] = []
  totalPriority: number = 0
  uniqueItemsMap: {
    [char: string]: RucksackItem
  } = {}
  constructor(public itemsString: string) {
    if (this.itemsString.length % 2 != 0) {
      console.error('Rucksack has odd number of items', this.itemsString, this.itemsString.length)
    }
    const middle = this.itemsString.length / 2
    for (let i = 1; i <= this.itemsString.length; i++) {
      const side = i <= middle ? this.leftSide : this.rightSide
      const char = this.itemsString[i - 1]
      const item = new RucksackItem(char)
      side[char] = item
      this.uniqueItemsMap[char] = item
    }
    for (const char in this.leftSide) {
      if (this.rightSide[char]) {
        this.both.push(this.leftSide[char])
        this.totalPriority += this.leftSide[char].priority
      }
    }
  }
}

export class RucksackItem {
  constructor(public itemChar: string) {}
  get priority(): number {
    // (a -> z).CharCodeAt(0) = 97 -> 122 (1, 26) = -96
    // (A -> Z).CharCodeAt(0) = 65 -> 90 (27, 52) = -38
    // v2
    // let charCode = this.itemChar.charCodeAt(0)
    // // uppercase
    // if (charCode > 64 && charCode < 91) {
    //   return charCode - 38
    // }
    // // lowercase
    // if (charCode > 96 && charCode < 123) {
    //   return charCode - 96
    // }
    // throw new Error(`RucksackItem itemChar out of range. Received ${this.itemChar}:${charCode}`)
    // v1
    // make all lower case
    // 'a' == 97 - 96 => 1
    // to get upper, just add 26
    const lower = this.itemChar.toLowerCase()
    let prio = lower.charCodeAt(0) - 96
    if (this.itemChar != lower) {
      prio += 26
    }
    return prio
  }
}
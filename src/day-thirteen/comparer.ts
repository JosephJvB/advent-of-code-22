import Pair, { packetItem } from './pair'

export enum CompareResult {
  success,
  fail,
  empty,
}

export default class Comparer {
  constructor() {}
  public evalPair(p: Pair): number {
    let c = 0
    let result: CompareResult = CompareResult.empty
    while (result == CompareResult.empty) {
      let l = p.l[c]
      let r = p.r[c]
      if (l == undefined && r == undefined) {
        break
      }
      result = this.evalNextItems(l, r)
      c++
    }
    switch (result) {
      case CompareResult.empty:
        console.error('empty result for pair', p)
        process.exit()
      case CompareResult.success:
        return p.idx
      case CompareResult.fail:
        return 0
    }
  }
  private evalNextItems(l: packetItem, r: packetItem): CompareResult {
    const both: packetItem[] = []
    let intCount = 0
    let listCount = 0
    for (const p of [l, r]) {
      if (p != undefined) {
        both.push(p)
        if (p instanceof Array) {
          listCount++
        }
        if (p instanceof Number) {
          intCount++
        }
      }
    }
    if (both.length == 1) {
        return r == undefined ? CompareResult.fail : CompareResult.success
    }
    if (intCount == 2) {
      if (l == r) { // check next
        return CompareResult.empty
      } else {
        return l > r ? CompareResult.fail : CompareResult.success
      }
    }
    else if (listCount == 2) {
      this.evalNextItems((l as packetItem[])[0], (r as packetItem[])[0])
    }
    else if (intCount == 1 && listCount == 1) {
      const [l2, r2] = this.normalize(both)
      this.evalNextItems((l2 as packetItem[])[0], (r2 as packetItem[])[0])
    }
    else {
      console.error(
        `both.length=${both.length}`,
        `intCount=${intCount}`,
        `listCount=${listCount}`,
      )
      console.error('Unexpected case: exit')
      process.exit()
    }
  }
  private normalize(packets: packetItem[]) {
    return packets.map(p => {
      if (p instanceof Number) {
        return [p]
      }
      return p
    })
  }
}
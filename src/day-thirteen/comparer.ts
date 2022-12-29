import Pair, { packetItem } from './pair'

export enum evalResult {
  success,
  fail,
  empty,
}

export default class Comparer {
  constructor() {}
  public scorePair(p: Pair, idx: number) {
    const result = this.evalRecursive(p)
    switch (result) {
      case evalResult.success:
        return idx
      case evalResult.fail:
        return 0
      case evalResult.empty:
        console.error('failed to eval pair', p)
        process.exit()
    }
  }
  private evalRecursive(p: Pair): evalResult {
    const max = Math.max(p.l.length, p.r.length)
    let result: evalResult = evalResult.empty
    for (let i = 0; i < max; i++) {
      let l = p.l[i]
      let r = p.r[i]
      const both = [l, r]
      let intCount = 0
      let listCount = 0
      for (const p of both) {
        if (p == undefined) {
          continue
        }
        if (p instanceof Array) {
          listCount++
        }
        if (!isNaN(Number(p))) {
          intCount++
        }
      }
      // one list is empty
      if (intCount + listCount == 1) {
        return r == undefined ? evalResult.fail : evalResult.success
      }
      // both ints
      if (intCount == 2) {
        if (l != r) {
          return l > r ? evalResult.fail : evalResult.success
        } else { // check next
          continue
        }
      }
      // eval both as lists
      if (intCount == 1 && listCount == 1) {
        const [l2, r2] = this.normalize(both)
        l = l2
        r = r2
      }
      // eval both as lists - recurse
      result = this.evalRecursive(new Pair(l as packetItem[], r as packetItem[]))
      if (result != evalResult.empty) {
        return result
      }
    }
    // looped all items, no result.
    return evalResult.empty
  }
  private normalize(packets: packetItem[]): packetItem[][] {
    return packets.map(p => {
      if (p instanceof Array) {
        return p
      }
      return p == undefined ? [] : [p]
    })
  }
}
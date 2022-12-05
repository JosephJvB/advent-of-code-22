export default class Elf {
  constructor(public start: number, public end: number) {}
}
export class ElfPair {
  constructor(private elf1: Elf, private elf2: Elf) {}
  get totalOverlap(): boolean {
    if (this.elf1.start >= this.elf2.start)
    if (this.elf1.end <= this.elf2.end) {
      return true
    }
    if (this.elf2.start >= this.elf1.start)
    if (this.elf2.end <= this.elf1.end) {
      return true
    }
    return false
  }

  // from miscellaneous/Process Layouts/Python/layout_updater/layout_updater/json_models.py
  // but doesn't need the second dimension
  // # https://stackoverflow.com/questions/27152904/calculate-overlapped-area-between-two-rectangles
  // # alternative: https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
  // def check_overlap(self, r1, r2) -> bool:
  //     dx = min(r1['Left'] + r1['Width'], r2['Left'] + r2['Width']) - max(r1['Left'], r2['Left'])
  //     dy = min(r1['Top'] + r1['Height'], r2['Top'] + r2['Height']) - max(r1['Top'], r2['Top'])
  //     return dx > 0 and dy > 0

  get intersect(): boolean {
    // smallest endNum must be bigger than the largest startNum
    // if diff is 0, they cover same number, if diff > 0, they overlap that many numbers
    const intersectRange = Math.min(this.elf1.end, this.elf2.end) - Math.max(this.elf1.start, this.elf2.start)
    // console.log(this.elf1, this.elf2, intersectRange)
    return intersectRange < 0
  }
}
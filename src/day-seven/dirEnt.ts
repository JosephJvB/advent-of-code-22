export abstract class DirEnt {
  public parent: DirEnt
  public children: DirEnt[] = []
  constructor(public name: string) {}
  abstract get size(): number
  abstract get isDir(): boolean
}
export class File extends DirEnt {
  constructor(public name: string, public sizeStr: string) {
    super(name)
  }
  get size(): number {
    return Number(this.sizeStr)
  }
  get isDir(): boolean {
    return false
  }
}
export class Dir extends DirEnt {
  get isDir(): boolean {
    return true
  }
  get size(): number {
    let total = 0
    for (const c of this.children) {
      total += c.size
    }
    console.log(this.name, total)
    return total
  }
}
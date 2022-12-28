export type packetItem = number | packetItem[]

export default class Pair {
  constructor(
    public l: packetItem[],
    public r: packetItem[],
    public idx: number
  ) {}
}
export default class DataParser {
  startMarker: string
  numCharsProcessed: number
  constructor(private packetStr: string, public markerlength: number) {
    for (let i = 0; i < this.packetStr.length; i++) {
      const marker = this.packetStr.substring(i, i + this.markerlength)
      const unique: {
        [char: string]: boolean
      } = {}
      let uniqueCharCount = 0
      for (let m = 0; m < this.markerlength; m++) {
        const c = marker[m]
        if (!unique[c]) {
          uniqueCharCount++
          unique[c] = true
        }
      }
      if (uniqueCharCount == this.markerlength) {
        this.startMarker = marker
        this.numCharsProcessed = i + this.markerlength
        break
      }
    }
  }
}
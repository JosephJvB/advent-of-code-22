export default class DataParser {
  startMarker: string
  numCharsProcessed: number
  constructor(private packetStr: string, public markerLength: number) {
    for (let i = 0; i < this.packetStr.length; i++) {
      const marker = this.packetStr.substring(i, i + this.markerLength)
      const unique: {
        [char: string]: boolean
      } = {}
      let uniqueCharCount = 0
      for (let m = 0; m < this.markerLength; m++) {
        const c = marker[m]
        if (!unique[c]) {
          uniqueCharCount++
          unique[c] = true
        }
      }
      if (uniqueCharCount == this.markerLength) {
        this.startMarker = marker
        this.numCharsProcessed = i + this.markerLength
        break
      }
    }
  }
}
// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
export default class Valve {
  id: string
  flowRate: number
  connectedValves: string[]
  constructor(inputStr: string) {
    const words = inputStr.split(' ')
    this.id = words[1]
    this.flowRate = parseInt(words[4].replace('rate=', '').replace(';', ''))
    this.connectedValves = words.slice(9).map(w => w.replace(/,/g, ''))
  }
}
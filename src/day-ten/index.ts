import Cpu from './cpu'
import Crt from './crt'
import parser from './parser'

export default () => {
  const instructions = parser(__dirname + '/data.txt')
  const cpu = new Cpu(1)
  const crt = new Crt(40, 6)
  crt.saveFrame()
  for (const i of instructions) {
    for (let c = 0; c < i.cycles; c++) {
      cpu.cycle()
      crt.update(cpu.cycleCount, cpu.register)
      // if (cpu.cycleCount > 10) {
      //   break
      // }
    }
    // if (cpu.cycleCount > 10) {
    //   break
    // }
    cpu.register += i.value
  }
  crt.writeGrid()
  // v1
  // const cycleCounts = [20, 60, 100, 140, 180, 220]
  // let signalSum = 0
  // for (const cycle of cycleCounts) {
  //   const registerValue = cpu.registerTracker[cycle]
  //   if (registerValue < 0) {
  //     console.log(`negative registerCalue:${registerValue} @ cycle:${cycle}`)
  //   }
  //   const v = cycle * registerValue
  //   signalSum += v
  // }
  // console.log('cpu signal sum', signalSum)
}

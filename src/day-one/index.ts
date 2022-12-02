import ElfDataParser from './parser'
import Elf from './elf'

export default () => {
  const elfParser = new ElfDataParser(__dirname + '/data.txt')
  const calorieData = elfParser.elfDataFromFile
  let topThree: Elf[] = []
  for (const list of calorieData) {
    const elf = new Elf(list)
    if (topThree.length < 3) {
      topThree.push(elf)
      continue
    }
    const isHigher = topThree.find(e => e.totalCalories < elf.totalCalories)
    if (!isHigher) {
      continue
    }
    topThree.push(elf)
    topThree.sort((a, z) => z.totalCalories - a.totalCalories)
    topThree = topThree.slice(0, 3)
  }
  console.log(topThree)
  let allThree = 0
  for (const elf of topThree) {
    allThree += elf.totalCalories
  }
  console.log('total top three', allThree)
}
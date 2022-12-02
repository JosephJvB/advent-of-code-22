export default class Elf {
  totalCalories: number
  constructor(private calorieList: number[]) {
    this.totalCalories = 0
    for (const c of this.calorieList) {
      this.totalCalories += c
    }
  }
}
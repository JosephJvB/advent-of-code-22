const monkeys = [7, 19, 13, 3, 2, 11, 17, 5]
// inefficient lcm
console.time('joe-lcm')
const max = Math.max(...monkeys)
let lcm = 0
for (let i = max; i < Number.MAX_SAFE_INTEGER; i += max) {
  // process.stdout.write(`i: ${i}\r`) // woah, writing to stdout every loop made it way slower! Good to know
  const allMatch = monkeys.every(m => i % m == 0)
  if (allMatch) {
    lcm = i
    break
  }
}
// console.log('lcm', lcm)
console.timeEnd('joe-lcm')

console.time('euclid-lcm')
const gcd = (a, b) => {
  // console.log('gcd')
  return a ? gcd(b % a, a) : b
}
const lcmFn = (a, b) => {
  // console.log('lcm')
  return a * b / gcd(a, b)
}
const lowest = monkeys.reduce(lcmFn, 0)
console.timeEnd('euclid-lcm')

// 1
// joe-lcm: 9.202ms
// euclid-lcm: 0.034ms
// 2
// joe-lcm: 9.154ms
// euclid-lcm: 0.032ms

// not too bad tbh. 9ms is not bad. Obv the clearly worse option

console.time('eucl-2')
const gcd2 = (a, b) => {
  while (b > 0) {
    const t = b
    b = a % b
    a = t
  }
  return a
}
const lowest2 = monkeys.reduce((a, b) => {
  let minNum = Math.min(a,b)
  let maxNum = Math.max(a,b)
  var placeHolder = 0
  
  while(minNum!==0){
    placeHolder = minNum;
    minNum = maxNum % minNum;
    maxNum = placeHolder;
} 

//here maxNum = GCD(a,b)

return (a*b) / (maxNum);  //LCM
})
console.timeEnd('eucl-2')
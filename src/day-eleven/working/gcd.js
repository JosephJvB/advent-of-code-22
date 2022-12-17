const gcd = (a, b) => {
  // console.log('gcd')
  return a ? gcd(b % a, a) : b
}
const gcd2 = (a, b) => {
  while (b > 0) {
    const t = b
    b = a % b
    a = t
  }
  return a
}
const A = 17
const B = 19
console.log(gcd(A, B))
console.log(gcd2(A, B))
const lcm = (a, b, gcdFn) => {
  return a * b / gcdFn(a, b)
}

console.log(lcm(A, B, gcd))
console.log(lcm(A, B, gcd2))
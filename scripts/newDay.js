const fs = require('fs')

const nextDay = process.argv.slice(2)[0].trim()
if (!nextDay) {
  return
}
const dir = `${__dirname}/../src/day-${nextDay}/`
if (fs.existsSync(dir)) {
  return
}
console.log('newDay', nextDay)
fs.mkdirSync(dir)
fs.writeFileSync(dir + 'index.ts', '')
fs.writeFileSync(dir + 'data.txt', '')
fs.writeFileSync(dir + 'parser.ts', '')
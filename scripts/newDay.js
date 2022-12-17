const fs = require('fs')

const days = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'twentyone',
  'twentytwo',
]

const soFar = fs.readdirSync(`${__dirname}/../src/`)
const nextDay = days[soFar.length - 1]
if (!nextDay) {
  console.log('failed to create folder for day', nextDay)
  return
}

const dir = `${__dirname}/../src/day-${nextDay}/`
if (fs.existsSync(dir)) {
  return
}
fs.mkdirSync(dir)
fs.mkdirSync(dir + 'working')
fs.writeFileSync(dir + 'index.ts', '')
fs.writeFileSync(dir + 'data.txt', '')

console.log('setup day', nextDay, 'folder')
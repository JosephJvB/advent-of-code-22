const fs = require('fs')

const copyFiles = [
  __dirname + '/../src/day-one/data.txt',
  __dirname + '/../src/day-two/data.txt',
]

for (const f of copyFiles) {
  const out = f.replace('/src/', '/dist/')
  fs.copyFileSync(f, out)
}
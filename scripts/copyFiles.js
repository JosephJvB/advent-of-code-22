const fs = require('fs')

const copyFiles = [
  __dirname + '/../src/day-one/data.txt',
]

for (const f of copyFiles) {
  const out = f.replace('/src/', '/dist/')
  fs.copyFileSync(f, out)
}
const fs = require('fs')

const dirs = fs.readdirSync(__dirname + '/../src/', { withFileTypes: true })

for (const dir of dirs) {
  if (!dir.isDirectory()) {
    continue
  }
  const f = __dirname + '/../src/' + dir.name + '/data.txt'
  const out = f.replace('/src/', '/dist/')
  fs.copyFileSync(f, out)
}
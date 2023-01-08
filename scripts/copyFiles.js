const fs = require('fs')

const dirs = fs.readdirSync(__dirname + '/../src/', { withFileTypes: true })

for (const dir of dirs) {
  if (!dir.isDirectory()) {
    continue
  }
  if (dir.name == 'day-seventeen') {
    const rocks = __dirname + '/../src/' + dir.name + '/rocks.txt'
    const jets = __dirname + '/../src/' + dir.name + '/jets.txt'
    fs.copyFileSync(rocks, rocks.replace('/src/', '/dist/'))
    fs.copyFileSync(jets, jets.replace('/src/', '/dist/'))
    continue
  }
  const f = __dirname + '/../src/' + dir.name + '/data.txt'
  const out = f.replace('/src/', '/dist/')
  fs.copyFileSync(f, out)
}
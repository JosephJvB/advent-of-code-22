import fs from 'fs'
export default () => {
  const pairs = fs.readFileSync(__dirname + '/data.txt', 'utf8')
    .toString()
    .split('\n\n')
    .map(p => p.split('\n'))
  return pairs
}
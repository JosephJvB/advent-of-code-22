import fs from 'fs'
import ShellParser from './parser'

const MAX_SPACE = 70000000
const REQUIRED_SPACE = 30000000

export default () => {
  const parser = new ShellParser(__dirname + '/data.txt')
  let activeDirs: string[] = []
  const dirSizes: {
    [dirName: string]: number
  } = {}
  const added: {
    [path: string]: boolean
  } = {}
  for (const command of parser.pastCommands) {
    switch (command.cmd) {
      case 'cd':
        const dirName = command.args[0]
        if (dirName == '..') {
          activeDirs.pop()
        }
        else {
          if (dirName == '/') {
            activeDirs = ['/']
          } else {
            let lastActive = activeDirs[activeDirs.length - 1]
            if (!lastActive.endsWith('/')) {
              lastActive += '/'
            }
            activeDirs.push(lastActive + dirName)
          }
        }
        break
      case 'ls':
        for (const line of command.output) {
          const [pref, name] = line.split(' ')
          if (pref == 'dir') {
            continue
          }
          const size = Number(pref)
          for (let i = 0; i < activeDirs.length; i++) {
            const dirName = activeDirs[i]
            const path = [...activeDirs.slice(0, i + 1), name].join('/').substring(1)
            if (!added[path]) {
              if (!dirSizes[dirName]) {
                dirSizes[dirName] = 0
              }
              dirSizes[dirName] += size
            }
            added[path] = true
          }
        }
        break
    }
  }
  // fs.writeFileSync(__dirname + '/../../test.json', JSON.stringify(dirSizes, null, 2))
  // let total = 0
  // for (const dirName in dirSizes) {
    // if (dirSizes[dirName] <= 100000) {
      // total += dirSizes[dirName]
    // }
  // }
  // console.log('total', total) // 1989474 is too low
  const usedSpace = MAX_SPACE - dirSizes['/']
  const toDelete = usedSpace - REQUIRED_SPACE
  let closestDir: {
    name: string
    size: number
  } = null
  for (const n in dirSizes) {
    const s = dirSizes[n]
    if (!closestDir) {
      closestDir = {
        name: n,
        size: s
      }
      continue
    }
    if (s < toDelete) {
      continue
    }
    if (s < closestDir.size) {
      closestDir = {
        name: n,
        size: s
      }
    }
  }
  console.log('smallest to delete', closestDir)
}



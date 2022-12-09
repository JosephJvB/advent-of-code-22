import fs from 'fs'
import FolderTracker, { Folder } from './folderTracker'
import ShellParser from './parser'

const MAX_SPACE = 70000000
const REQUIRED_SPACE = 30000000

export default () => {
  const parser = new ShellParser(__dirname + '/data.txt')
  const tracker = new FolderTracker()
  for (const command of parser.pastCommands) {
    switch (command.cmd) {
      case 'cd':
        tracker.changeDir(command.args[0])
        break
      case 'ls':
        for (const line of command.output) {
          if (line.startsWith('dir')) {
            continue
          }
          const [sizeStr, fileName] = line.split(' ')
          const size = Number(sizeStr)
          tracker.addFile(fileName, size)
        }
        break
    }
  }
  // let total = 0
  // for (const dirName in tracker.folders) {
    // if (tracker.folders[dirName] <= 100000) {
      // total += tracker.folders[dirName]
    // }
  // }
  // console.log('total', total)
  const freeSpace = MAX_SPACE - tracker.rootDir.size
  console.log('rootDir', tracker.rootDir.size) // 41072511
  console.log('freeSpace', freeSpace) // 28927489
  const minSize = REQUIRED_SPACE - freeSpace
  console.log('folder min size', minSize)
  let folderToDelete: Folder = null
  for (const dirName in tracker.folders) {
    const f = tracker.folders[dirName]
    if (!folderToDelete) {
      folderToDelete = f
      continue
    }
    if (f.size < minSize) {
      continue
    }
    if (f.size < folderToDelete.size) {
      folderToDelete = f
    }
  }
  console.log('folder to delete', folderToDelete)
}



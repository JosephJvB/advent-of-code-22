import fs from 'fs'
import { DirEnt, Dir, File } from './dirEnt'
import ShellParser from './parser'

export default () => {
  const parser = new ShellParser(__dirname + '/data.txt')
  let current: Dir = null
  let rootDir: Dir = null
  for (const command of parser.pastCommands) {
    switch (command.cmd) {
      case 'cd':
        const dirName = command.args[0]
        if (dirName == '..') {
          if (current) {
            current = current.parent
          }
        }
        else {
          // handle rerun cd
          let child: Dir = current && current.children.find((c: Dir) => c.isDir && c.name == dirName)
          if (!child) {
            child = new Dir(dirName)
            child.parent = current
          }
          current = child
          if (current.name == '/') {
            rootDir = current
          }
        }
        break
      case 'ls':
        // handle rerun ls
        if (current?.children.length == 0) {
          for (const line of command.output) {
            const [pref, name] = line.split(' ')
            let child: DirEnt = null
            if (pref == 'dir') {
              child = new Dir(name)
            } else {
              child = new File(name, pref)
            }
            child.parent = current
            current.children.push(child)
          }
        }
        break
    }
  }
  console.log(rootDir.size)
}



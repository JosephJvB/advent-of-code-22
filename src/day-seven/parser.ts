import fs from 'fs'

export type Cmd = 'ls' | 'cd'

export interface IShellCommand {
  cmd: Cmd
  args: string[]
  output: string[]
}

export default class ShellParser {
  constructor (private fileName: string) {}
  get pastCommands(): IShellCommand[] {
    const allCommands: IShellCommand[] = []
    const rawData = fs.readFileSync(this.fileName, 'utf8')
    let currentCommand: IShellCommand | null = null
    for (let line of rawData.split('\n')) {
      line = line.trim()
      if (line.startsWith('$')) {
        if (currentCommand) {
          allCommands.push(currentCommand)
        }
        const [_, cmd, ...args] = line.split(' ')
        currentCommand = {
          cmd: cmd as Cmd,
          args: args,
          output: []
        }
      }
      else if (currentCommand) {
        currentCommand.output.push(line)
      }
    }
    if (currentCommand) {
      allCommands.push(currentCommand)
    }
    // fs.writeFileSync(__dirname + '/../../test.json', JSON.stringify(allCommands, null, 2))
    return allCommands
  }
}
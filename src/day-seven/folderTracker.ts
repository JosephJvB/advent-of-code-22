export default class FolderTracker {
  public activeDirList: string[] = []
  public folders: {
    [name: string]: Folder
  } = {}
  constructor() {}
  get rootDir() {
    return this.folders['/']
  }
  changeDir(dirName: string) {
    if (dirName == '..') {
      this.activeDirList.pop()
      return
    }
    if (dirName == '/') {
      this.activeDirList = ['/']
      return
    }
    let lastActive = this.activeDirList[this.activeDirList.length - 1]
    if (!lastActive.endsWith('/')) {
      lastActive += '/'
    }
    this.activeDirList.push(lastActive + dirName)
  }
  addFile(fileName: string, fileSize: number) {
    let filePath = this.activeDirList[this.activeDirList.length - 1]
    if (!filePath.endsWith('/')) {
      filePath += '/'
    }
    filePath += fileName
    for (const dirName of this.activeDirList) {
      if (!this.folders[dirName]) {
        this.folders[dirName] = new Folder(dirName)
      }
      this.folders[dirName].addFile(filePath, fileSize)
    }
  }
}

export class Folder {
  public size: number = 0
  private filesAdded: {
    [fullFilePath: string]: boolean
  } = {}
  constructor(public name: string) {}
  addFile(filePath: string, size: number) {
    if (!this.filesAdded[filePath]) { // handle ls rerun
      this.size += size
      this.filesAdded[filePath] = true
    }
  }
}
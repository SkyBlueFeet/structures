export default class List<T extends string | symbol | boolean | number> {
  private listSize: number
  private pos: number
  private dataStore: T[]
  constructor() {
    this.listSize = 0
    this.pos = 0
    this.dataStore = []
  }

  append(target: T | T[], ...elements: T[]): this {
    if (Array.isArray(target)) {
      this.dataStore = [...target]
      this.listSize = this.dataStore.length
    } else if (target && elements.length) {
      elements.unshift(target)
      this.dataStore = [...elements]
      this.listSize = this.dataStore.length
    } else {
      this.dataStore[this.listSize++] = target
    }

    return this
  }

  find(element: T): number {
    for (let i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i] === element) return i
    }
    return -1
  }

  remove(target: T): boolean {
    const foundAt = this.find(target)
    if (foundAt !== null) {
      this.dataStore.splice(foundAt, 1)
      --this.listSize
      return true
    }
    return false
  }

  length(): number {
    return this.listSize
  }

  insert(target: T, targetAfter: T): boolean {
    const insertPos = this.find(targetAfter)

    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, target)
      ++this.listSize
      return true
    }
    return false
  }

  clear(): void {
    this.dataStore = []
    this.listSize = this.pos = 0
  }

  contains(target: T): boolean {
    return this.find(target) > -1
  }

  toString(): string {
    return this.dataStore.toString()
  }

  front(): void {
    this.pos = 0
  }

  end(): void {
    this.pos = this.listSize - 1
  }

  prev(): void {
    --this.pos
  }

  next(): void {
    if (this.pos < this.listSize) ++this.pos
  }

  currpos(): number {
    return this.pos
  }

  moveTo(position: number): void {
    this.pos = position
  }

  getElement(): T {
    return this.dataStore[this.pos]
  }

  hasNext(): boolean {
    return this.pos < this.listSize
  }

  hasPrev(): boolean {
    return this.pos >= 0
  }
}

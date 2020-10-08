export default class Stack<T> {
  dataStore: T[]
  top: number

  constructor() {
    this.dataStore = []
    this.top = 0
  }

  push(target: T): void {
    this.dataStore[this.top++] = target
  }

  pop(): T {
    return this.dataStore[--this.top]
  }

  peek(): T {
    return this.dataStore[this.top - 1]
  }

  length(): number {
    return this.top
  }

  clear(): void {
    this.top = 0
  }
}

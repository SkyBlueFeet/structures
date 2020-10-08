export default class Queue<T> {
  dataStore: T[]

  constructor() {
    this.dataStore = []
  }

  enqueue(target: T): void {
    this.dataStore.push(target)
  }

  dequeue(): T {
    return this.dataStore.shift()
  }

  front(): T {
    return this.dataStore[0]
  }

  back(): T {
    return this.dataStore[this.dataStore.length - 1]
  }

  toString(): string {
    return this.dataStore.toString()
  }

  empty(): boolean {
    return this.dataStore.length === 0
  }
}

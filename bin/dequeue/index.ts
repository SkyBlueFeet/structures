export default class Dequeue<T> {
  dataStore: T[]
  weightsKey: string

  constructor(weightsKey: string) {
    this.dataStore = []
    this.weightsKey = weightsKey
  }

  enqueue(target: T): void {
    this.dataStore.push(target)
  }

  dequeue(): T {
    let entry = 0
    const code = this.weightsKey
    for (let i = 1; i < this.dataStore.length; ++i) {
      if (this.dataStore[i][code] < this.dataStore[entry][code]) {
        entry = 0
      }
    }
    const target = this.dataStore[entry]
    this.dataStore.splice(entry, 1)
    return target
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

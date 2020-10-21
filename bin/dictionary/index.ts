export default class Dictionary<K extends string, T> {
  dataStore: Record<K, T>
  length: number
  constructor() {
    this.dataStore = Object.create(null)
    this.length = 0
  }

  add(key: K, value: T): void {
    this.dataStore[key] = value
    this.dataStore = this.sort()
    this.length++
  }

  find(key: K): T {
    return this.dataStore[key]
  }

  remove(key: K): void {
    delete this.dataStore[key]
    this.length--
  }

  count(): number {
    return this.length
  }

  clear(): void {
    this.dataStore = Object.create(null)
    this.length = 0
  }

  private sort(): Record<K, T> {
    const keys = Object.keys(this.dataStore).sort()
    const newObj: Record<K, T> = Object.create(null)
    for (const item of keys) {
      newObj[item] = this.dataStore[item]
    }
    return newObj // 返回排好序的新对象
  }
}

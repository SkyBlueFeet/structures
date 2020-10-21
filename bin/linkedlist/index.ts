import ENode from './node'

export default class LinkedList<T> {
  head: ENode<T>
  constructor() {
    this.head = new ENode<any>('head')
  }

  find(item: T): ENode<T> {
    let currNode = this.head
    while (currNode.element !== item) {
      currNode = currNode.next
    }
    return currNode
  }

  insert(newElement: T, item: T) {
    const newNode = new ENode(newElement)
    const current = this.find(item)
    newNode.next = current.next
    current.next = newNode
  }
}

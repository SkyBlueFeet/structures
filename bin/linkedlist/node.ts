export default class ENode<T> {
  element: T
  next: this
  constructor(element: T) {
    this.element = element
    this.next = null
  }
}

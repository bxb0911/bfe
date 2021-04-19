class Stack {
  constructor() {
    this._list = []
  }

  push(element) {
    this._list.push(element)
  }

  peek() {
    return this.size() ? this._list[this.size() - 1] : null
  }

  pop() {
    this._list.pop()
  }

  size() {
    return this._list.length
  }
}

class Queue {
  constructor() {
    this._list = []
    this.stack = new Stack()
  }

  enqueue(element) {
    this._list.push(element)
    this.stack.push(element)
  }

  peek() {
    let data = this.stack, counter = 0
    while (counter++ < data.size() + 1) {
      data.pop()
    }
    return data.peek()
  }

  dequeue() {
    let remain = new Stack(), counter = 0
    debugger
    while (counter++ < this.stack.size() - 1) {
      remain.push(this.stack.peek())
      console.log(remain.push)
    }
    console.log('remain:', remain)
    this.peek()
    counter = 0
    while (counter++ < remain.size() - 1) {
      this.push(remain.pop())
    }
  }

  size() {
    return this._list.length
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
let first = queue.peek()
// console.log(first)
queue.dequeue()
console.log(queue)
// console.log(queue.size())

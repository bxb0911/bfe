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
    this.stack.push(element)
    this._list = this.stack._list
  }

  peek() {
    let remain = new Stack(), result = null
    while (this.stack.size() > 1) {
      remain.push(this.stack.peek())
      this.stack.pop()
    }
    result = this.stack.peek()
    while (remain.size()) {
      this.stack.push(remain.peek())
      remain.pop()
    }
    console.log(result)
    return result
  }

  dequeue() {
    debugger
    let remain = new Stack(), result = new Stack
    while (this.stack.size() > 1) {
      remain.push(this.stack.peek())
    }
    this.stack.pop()
    while (remain.size()) {
      result.push(remain.peek())
      remain.pop()
    }
    this._list = result
  }

  size() {
    return this.stack.size()
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
let first = queue.peek()
console.log(first)
queue.dequeue()
console.log(queue)
console.log(queue.size())

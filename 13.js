// class Stack {
//   constructor() {
//     this._list = []
//   }

//   push(element) {
//     this._list.push(element)
//   }

//   peek() {
//     return this.size() ? this._list[this.size() - 1] : null
//   }

//   pop() {
//     this._list.pop()
//   }

//   size() {
//     return this._list.length
//   }
// }

class Queue {
  constructor() {
    this.pushStack = new Stack()
    this.popStack = new Stack()
  }

  _move() {
    while (this.pushStack.size()) {
      this.popStack.push(this.pushStack.pop())
    }
  }

  enqueue(element) {
    this.pushStack.push(element)
  }

  peek() {
    if (this.popStack.size()) {
      return this.popStack.peek()
    }
    if (this.pushStack.size()) {
      this._move()
      return this.popStack.peek()
    }
    return undefined
  }

  dequeue() {
    if (this.popStack.size()) {
      return this.popStack.pop()
    } else if (this.pushStack.size()) {
      this._move()
      return this.popStack.pop()
    }
    return undefined
  }

  size() {
    return this.pushStack.size() + this.popStack.size()
  }
}

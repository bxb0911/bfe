const arr = [1, 2, 3, 4]

arr.push(5) // 变为 [1, 2, 3, 4, 5]
arr.pop() // 5, 数组变为 [1, 2, 3, 4]

class Stack {
  constructor(arr) {
    this.data = arr || []
  }

  push(element) {
    this.data.push(element)
  }

  peek() {
    return this.data.size ? this.data[this.data.size - 1] : null
  }

  pop() {
    this.data.pop()
  }

  size() {
    return this.data.length
  }
}

class Queue {
  constructor(arr) {
    this.data = new Stack(arr)
  }

  enqueue(element) {
    this.data.push(element)
  }

  peek() {
    const data = new Stack(this.data), counter = 0, result = null
    while (counter++ < data.size) {
      result = data.peek()
      data.dequeue()
    }
    return result
  }

  dequeue() {
    const remain = new Stack(), counter = 0
    while (counter++ < data.size - 1) {
      remain.push(this.data.dequeue())
    }
    this.data.dequeue()
    counter = 0
    while (counter++ < remain.size - 1) {
      this.data.push(remain.pop())
    }
  }

  size() {
    return this.data.size()
  }
}

const queue = new Queue()
const result = queue.enqueue(1)
console.log(queue)

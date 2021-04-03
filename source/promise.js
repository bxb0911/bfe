// thenable: object or function has then
// value: undefined/thenable/promise
// exception: throw value
// reason: why rejected

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MPromise {
  constructor(executor) {
    if (typeof executor !== 'function') return
    this.status = PENDING
    this.value = null
    this.reason = null
    this.fullfilledQueue = []
    this.rejectedQueue = []
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULLFILLED
      this.value = value
      try {
        this.fullfilledQueue.forEach(onFullfilled => {
          typeof onFullfilled === 'function' && onFullfilled(this.value)
        })
      } catch(e) {
        this.rejectedQueue.forEach(onRejected => {
          typeof onRejected === 'function' && onRejected(e)
        })
      }
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      try {
        this.rejectedQueue.forEach(onRejected => {
          typeof onRejected === 'function' && onRejected(this.reason)
        })
      } catch(e) {
        this.rejectedQueue.forEach(onRejected => {
          typeof onRejected === 'function' && onRejected(e)
        })
      }
    }
  }

  then(onFullfilled, onRejected) {
    try {
      if (typeof onFullfilled === 'function') {
        this.status === FULLFILLED && onFullfilled(this.value)   
        this.status === PENDING && this.fullfilledQueue.push(onFullfilled)
      }
      if (typeof onRejected === 'function') {
        this.status === REJECTED && onRejected(this.reason)
        this.status === PENDING && this.rejectedQueue.push(onRejected)
      }
    } catch(e) {
      onRejected(e)
    }
  }
}

const promise = new MPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
 
promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// MPromise.resolve().then(() => {
//   console.log(0);
//   return MPromise.resolve(4);
// }).then((res) => {
//   console.log(res)
// })

// MPromise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })
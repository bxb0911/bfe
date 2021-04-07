// thenable: object or function has then
// value: undefined/thenable/promise
// exception: throw value
// reason: why rejected

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.fullfilledQueue = []
    this.rejectedQueue = []
    try {
      typeof executor === 'function' && executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  static resolve(value = null) {
    let promise = new MPromise()
    promise.resolve(value)
    return promise
  }

  static reject(reason=null) {
    let promise = new MPromise()
    promise.reject(reason)
    return promise
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
    debugger
    let fullfilledRes, rejectedRes
    try {
      if (typeof onFullfilled === 'function') {
        this.status === PENDING && this.fullfilledQueue.push(onFullfilled)
        if (this.status === FULLFILLED) {
          // todo
          // queueMicrotask(() => {
          //   fullfilledRes = onFullfilled(this.value)
          //   if (typeof fullfilledRes === 'undefined') {
          //     throw new TypeError('UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>')
          //   }
          // })
          fullfilledRes = onFullfilled(this.value)
          if (fullfilledRes instanceof MPromise) {
            return fullfilledRes
          }
        }
      }
      if (typeof onRejected === 'function') {
        this.status === PENDING && this.rejectedQueue.push(onRejected)
        if (this.status === REJECTED) {
          rejectedRes = onRejected(this.reason)
          if (rejectedRes instanceof MPromise) {
            return rejectedRes
          }
        }
      }
      return this
    } catch (e) {
      this.status = REJECTED
      this.reason = e
    }
  }
}

MPromise.deferred = function () {
  var result = {}
  result.promise = new MPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MPromise

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
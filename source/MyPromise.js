const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const isObject = target => typeof target === 'object' && target !== null
const isFunction = fn => typeof fn === 'function'
const isPromise = target => target instanceof MyPromise
const isThenable = target => (isObject(target) || isFunction(target)) && 'then' in target

const handleCallback = (callback, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (e) {
    reject(e)
  }
}

const handleCallbacks = (callbacks, state, result) => {
  while(callbacks.length) handleCallback(callbacks.shift(), state, result)
}

const transition = (promise, state, result) => {
  // 在 fulfilled/rejected 状态不可迁移到其他状态
  if (promise.state !== PENDING) return
  promise.state = state
  // 在fulfilled状态，result作为不可变的value
  // 在rejected状态，result作为不可变的reason
  promise.result = result
  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0)
}

const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reason = new TypeError('Can not fulfill promise with itself')
    return reject(reason)
  }
  if (isPromise(result)) {
    return result.then(resolve, reject)
  }
  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new MyPromise(then.bind(result)).then(resolve, reject)
      }
    } catch (e) {
      return reject(e)
    }
  }
  resolve(result)
}

class MyPromise {
  constructor(executor) {
    this.result = null
    this.state = PENDING
    this.callbacks = []
    let onFulfilled = value => transition(this, FULFILLED, value)
    let onRejected = reason => transition(this, REJECTED, reason)

    let ignore = false
    let resolve = value => {
      if (ignore) return
      ignore = true
      resolvePromise(this, value, onFulfilled, onRejected)
    }
    let reject = reason => {
      if (ignore) return
      ignore = true
      onRejected(reason)
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      let callback = { onFulfilled, onRejected, resolve, reject }
      if (this.state === PENDING) {
        // state处于PENDING状态，就将回调存起来
        this.callbacks.push(callback)
      } else {
        // onFulfilled/onRejected 必须在执行上下文栈只包含平台代码时被调用
        setTimeout(() => handleCallback(callback, this.state, this.result), 0)
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

MyPromise.resolve = value => new MyPromise(resolve => resolve(value))

MyPromise.reject = reason => new MyPromise((_, reject) => reject(reason))

MyPromise.all = () => { }

MyPromise.race = () => { }

MyPromise.finally = () => { }

MyPromise.deferred = function () {
  let result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

MyPromise.resolve().then(() => {
  console.log(0);
  return MyPromise.resolve(4);
}).then((res) => {
  console.log(res)
})

MyPromise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})

module.exports = MyPromise
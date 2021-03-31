// 手写 throttle

function throttle(func, wait) {
  let waiting = false
  let lastArgs = []
  return function (...args) {
    if (!waiting) {
      waiting = true
      func.apply(this, args)
      setTimeout(() => {
        func.apply(this, lastArgs.length ? lastArgs : args)
      }, wait)
    } else {
      lastArgs = args
    }
  }
}

let currentTime = 0
const run = (input) => {
  currentTime = 0
  const calls = []

  const func = (arg) => {
     calls.push(`${arg}@${currentTime}`)
  }

  const throttled = throttle(func, 3)
  input.forEach((call) => {
     const [arg, time] = call.split('@')
     setTimeout(() => throttled(arg), time)
  })
  return calls
}
let runner = run(['A@0', 'B@2', 'C@3'])
console.log(runner)
// expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['A@0', 'C@3'])

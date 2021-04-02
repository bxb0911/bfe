// 手写 throttle
function throttle(func, wait) {
  let waiting = false, lastArgs
  return function(...args) {
    lastArgs = args
    if (!waiting) {
      waiting = true
      func(...args)
      setTimeout(() => {
        waiting = false
        func(...lastArgs)
      }, wait)
    }
  }
}

let currentTime = 0
const run = (input) => {
  currentTime = 0
  const calls = []

  const func = (arg) => {
     calls.push(`${arg}@${currentTime}`)
     console.log(calls)
  }

  const throttled = throttle(func, 3)
  input.forEach((call) => {
     const [arg, time] = call.split('@')
     setTimeout(() => throttled(arg), time)
  })
  return calls
}
let runner = run(['A@0', 'B@2', 'C@3'])

// expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['A@0', 'C@3'])

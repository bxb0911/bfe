// 手写 throttle
function throttle(func, wait) {
  let waiting = false, lastArgs
  return function(...args) {
    if (!waiting) {
      waiting = true
      func.apply(this, args)
      console.log('call args', args)
      setTimeout(() => {
        waiting = false
        console.log('call inner args', args)
        lastArgs && func.apply(this, lastArgs)
      }, wait)
    } else {
      console.log('update args', args)
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
     console.log(calls)
  }

  const throttled = throttle(func, 3)
  input.forEach((call, index) => {
    console.log('call-', index)
     const [arg, time] = call.split('@')
     setTimeout(() => throttled(arg), time)
  })
  return calls
}
let runner = run(['A@0', 'B@1', 'C@2', 'D@3', 'E@4', 'F@5', 'G@6'])

// expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['A@0', 'C@3'])

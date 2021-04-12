const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y

function pipe(funcs) {
  return function (x) {
    let lastRes = x
    funcs.forEach(func => {
      lastRes = func(lastRes)
    })
    console.log(lastRes)
    return lastRes
  }
}

function pipe1(funcs) {
  return function(arg) {
     return funcs.reduce((result, func) => {
       return func.call(this, result)
     }, arg)
  }
}


pipe([
  times(2),
  times(3)
])
// x * 2 * 3

pipe([
  times(2),
  plus(3),
  times(4)
])
// (x * 2 + 3) * 4

pipe([
  times(2),
  subtract(3),
  divide(4)
])
// (x * 2 - 3) / 4
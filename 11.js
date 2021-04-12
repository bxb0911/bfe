const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y

function pipe(funcs) {
  return function(args) {
    return funcs.reduce((result, func) => {
      return func.call(this, result)
    }, args)
  }
}

pipe([
  times(2),
  times(3),
  times(4)
])(1)
// x * 2 * 3

// pipe([
//   times(2),
//   plus(3),
//   times(4)
// ])
// (x * 2 + 3) * 4

// pipe([
//   times(2),
//   subtract(3),
//   divide(4)
// ])
// (x * 2 - 3) / 4
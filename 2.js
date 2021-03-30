// placeholder curry
// https://javascript.info/currying-partials
// https://lodash.com/docs/4.17.15#curry
// https://github.com/planttheidea/curriable

// test case
const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(_, 2)(1, 3) // '1_2_3'

curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

// source code
function curry(fn) {
  return function curried(...args) {
    let fully = args.every(item => item !== curry.placeholder)
    if (fn.length <= args.length && fully) {
      return fn.apply(this, args)
    } else {
      return function (...args1) {
        let newArgs = args.map(item =>
          item === curry.placeholder && args1.length
          ? args1.shift()
          : item
        )
        return curried.apply(this, [...newArgs, ...args1])
      }
    }
  }
}

curry.placeholder = Symbol()
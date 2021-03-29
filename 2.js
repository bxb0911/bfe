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
    debugger
    let fully = args.every(item => item !== curry.placeholder)
    if (fn.length <= args.length && fully) {
      return fn.apply(this, args)
    } else {
      return function(...args1) {
        let newArgs = args.map(item => {
          if (item === curry.placeholder && args1[0] !== curry.placeholder) {
            let insertItem = args1.shift()
            return insertItem
          }
        })
        if (args1.length > 0) {
          newArgs = [...newArgs, ...args1]
        }
        return curried.bind(this, ...newArgs)
      }
    }
  }
}

curry.placeholder = Symbol()

let a = curriedJoin(1, 2, 3) // '1_2_3'

let b = curriedJoin(_, 2)(1, 3) // '1_2_3'

let c = curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

console.log(a, b, c)
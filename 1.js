// curry
// https://javascript.info/currying-partials
// https://lodash.com/docs/4.17.15#curry

// test case
const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'

// source code
function curry(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn.apply(this, args)
    } else {
      return curried.bind(this, ...args)
    }
  }
}
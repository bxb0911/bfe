// // update -> push {$push: array}
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, {$push: [5, 6]})
// // update -> set {$set: any}
// const state = {
//   a: {
//     b: {
//       c: 1
//     }
//   },
//   d: 2
// }
// const newState = update(
//   state, 
//   {a: {b: {c: {$set: 3}}}}
// )

const isObj = val => typeof val === 'object' && val !== null
function objChecker(obj, lastKey) {
  for (const [key, val] of Object.entries(obj)) {
    if (key === '$set' || key === '$merge') {
      return val
    }
    isObj(val) && (obj[key] = objChecker(val, lastKey))
  }
  return obj
}
function arrChecker(arr, commands) {
  for (const [key, val] of commands) {
    let cmd = val[0]
    if (cmd === '$set') {
      arr[key] === val[1]
    }
  }
  return arr
}
arrChecker([1,2,3,4], {0: {$set: 0}})
// const arr = [1, 2, 3, 4]
// const newArr = update(
//   arr, 
//   {0: {$set: 0}}
// )
// // update -> merge {$merge: object}
// const state = {
//   a: {
//     b: {
//       c: 1
//     }
//   },
//   d: 2
// }
// const newState = update(
//   state, 
//   {a: {b: { $merge: {e: 5}}}}
// )
// // update -> apply {$apply: function} 
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, {0: {$apply: (item) => item * 2}})

function update(data, command) {
  let key = Object.keys(command)[0]
  let val = command[key]
  if (key === '$push') {
    return [data, ...val]
  } else if (key === '$set') {
    return isObj(data) ? { ...data, ...objChecker(command) } : arrChecker(arr, command)
  } else if (key === '$merge') {
    return { ...data, ...objChecker(command) }
  } else if (key === '$apply') {
    return [ ...data,  ]
  }
}
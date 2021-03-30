// Array.prototype.flat()
// 能否不用递归而用迭代的方式实现？

const arr = [1, [2], [3, [4]]];
// let a = flat(arr)
// // [1, 2, 3, [4]]

// let b = flat(arr, 1)
// [1, 2, 3, [4]]

let c = flat(arr, 2)
// [1, 2, 3, 4]

// console.log(a)
// console.log(b)
console.log(c)

function flat(arr, depth = 1) {
  let result = []
  let stack = [...arr.map(item => ([item, depth]))]
  while (stack.length > 0) {
    const [item, depth] = stack.shift()
    if (Array.isArray(item) && depth > 0) {
      stack.unshift(...item.map(innerItem => ([innerItem, depth - 1])))
    } else {
      result.push(item)
    }
  }
  return result
}

// function flat(arr, depth = 1) {
//   // [[1,1] [[2],1], [[3, [4]],1]]
//   // [[[2],1], [[3, [4]],1]]
//   // [[2,0], [[3, [4]],1]]
//   // [[[3, [4]],1]]
//   // [[3, 0], [[4], 0]]
  
//   const result = []
//   const stack = [...arr.map(item => ([item, depth]))]
  
//   while (stack.length > 0) {
//     const [top, depth] = stack.pop()
//     if (Array.isArray(top) && depth > 0) {
//       stack.push(...top.map(item => ([item, depth - 1])))
//     } else {
//       result.push(top)
//     }
//   }
  
//   return result.reverse()
// }
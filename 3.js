// Array.prototype.flat()
// 能否不用递归而用迭代的方式实现？

const arr = [1, [2], [3, [4]]];
flat(arr)
// [1, 2, 3, [4]]

flat(arr, 1)
// [1, 2, 3, [4]]

flat(arr, 2)
// [1, 2, 3, 4]

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
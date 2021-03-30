// Array.prototype.flat()
// 能否不用递归而用迭代的方式实现？

const arr = [[1,1] [[2],1], [[3, [4]],1]];

let a = flat(arr)
// [1, 2, 3, [4]]

let b = flat(arr, 1)
// [1, 2, 3, [4]]

let c = flat(arr, 2)
// [1, 2, 3, 4]

console.log(a)
console.log(b)
console.log(c)

// [[1,1] [[2],1], [[3, [4]],1]]
// [[[2],1], [[3, [4]],1]]
// [[2,0], [[3, [4]],1]]
// [[[3, [4]],1]]
// [[3, 0], [[4], 0]]
function flat(arr, dep = 1) {
  let res
  while (dep-- > 0) {
    res = []
    for (let i = 0; i < arr.length; i++) {
      Array.isArray(arr[i])
      ? res.push(...arr[i])
      : res.push(arr[i])
    }
    arr = res.slice(0)
  }
  return res
}
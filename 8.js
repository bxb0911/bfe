function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    debugger
    const j = i + Math.floor(Math.random() * (arr.length - i))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// let res = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

// console.log(res)
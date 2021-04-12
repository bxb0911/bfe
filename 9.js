// I B C A L K A
// D R F C A E A
// G H O E L A D 

function decode(message) {
  let res = []
  if (message.length) {
    for (let i = 0, j = 0; j < message[i].length ; j++) {
      res.push(message[i][j])
      message.length - 1 && (i = i < message.length - 1 ? i + 1 : i - 1)
    }
  }
  return res.join('')
}
// 00 11 22 13 04 15 26
// decode([
//   ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
//   ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
//   ['G', 'H', 'O', 'E', 'L', 'A', 'D']
// ])

let r = decode([['A']])

console.log(r)
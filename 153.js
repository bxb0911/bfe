// localIdentName: "[path][name]__[local]--[hash:base64:5]"
// 仅使用字母: a - z , A - Z
// 调用一次返回一个类名
// 返回的类名序列需要满足: 先短后长，相同长度按照字母排序（小写字母优先）
// 同时提供一个reset函数
//// todo 51 aa
function getUniqueClassName() {
  !getUniqueClassName.index && (getUniqueClassName.index = 0)
  getUniqueClassName.index++
  const baseLower = 'abcdefghijklmnopqrstuvwxyz'
  const base = baseLower + baseLower.toUpperCase()
  const total = 52
  let getLetter = index => base[index - 1]
  let result = '', index = getUniqueClassName.index
  while (index > total) {
    let count = Math.floor(index / total)
    result += getLetter(count)
    index = index - total * count + 1
  }
  result += getLetter(index)
  return result
}

getUniqueClassName.reset = () => getUniqueClassName.index = 0

for (let i = 0; i < 300; i++) {
  console.log(i, getUniqueClassName())
}

getUniqueClassName.reset()

// getUniqueClassName()

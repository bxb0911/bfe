const keyMap = ['$push', '$set', '$merge', '$apply']

function update(data, command) {
  return walk(data, command)
}
const arr = [1, 2, 3, 4]
const newArr = update(
  arr, 
  {0: {$set: 0}}
)
function walk(data, command, pdata, pkey) {
  for (let k in command) {
    if (keyMap.indexOf(k) !== -1) {
      switch (k) {
        case '$push':
          if (Array.isArray(data)) {
            data.push(...command[k])
          } else {
            throw 'Must be Array'
          }
          break
        case '$set':
          pdata[pkey] = command[k]
          break
        case '$merge':
          if (data instanceof Object) {
            pdata[pkey] = { ...data, ...command[k] }
          } else {
            throw 'Must be Object'
          }
          break
        case '$apply':
          pdata[pkey] = command[k].call(null, data)
          break
      }
    } else {
      walk(data[k], command[k], data, k)
    }
  }
  return data
}

const arr = [1, 2, 3, 4]
const newArr = update(arr, { 0: { $apply: (item) => item * 2 } })
console.log(newArr)
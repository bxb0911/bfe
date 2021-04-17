// // update -> set {$set: any}
// const newState = update(
//   state, 
//   {a: {b: {c: {$set: 3}}}}
// )
// const newState = update(
//   state, 
//   {a: {b: { $merge: {e: 5}}}}
// )

function objChecker(obj, lastObj, lastKey) {
  for (const [key, val] of Object.entries(obj)) {
    if (key === '$set' || key === '$merge') {
      if (key === '$set') {
        lastObj[lastKey] = objChecker(val, obj, key)
      } else if (key === '$merge') {
        delete lastObj[lastKey]['$merge']
        lastObj[lastKey] = { ...lastObj[lastKey], ...val }
      }
      return val
    }
  }
  return obj
}

const isObj = val => typeof val === 'object' && val !== null
const getKeys = obj => Object.keys(obj)

function update(data, command) {
  let key = getKeys(command)[0]
  let val = command[key]
  if (key === '$push') {
    return [...data, ...val]
  } else if (Array.isArray(data)) {
    getKeys(val).forEach(item => {
      if (item === '$set') {
        data[key] = val[item]
      } else if (item === '$apply') {
        data[key] = val[item](data[key])
      }
    })
  } else {
    
  }
}

// update -> push {$push: array}
const arr = [1, 2, 3, 4]
const newArr = update(arr, { $push: [5, 6] })
console.log(newArr)
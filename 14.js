function memo(func, resolver = (...args) => args.join('-')) {
  let cache = new Map()
  return function(...args) {
    let key = resolver(...args)
    if (cache.has(key)) {
      return cache.get(key)
    } else {
      let result = func.apply(this, args)
      cache.set(key, result)
      return result
    }
  }
}
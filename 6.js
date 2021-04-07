// 在debounce之前如下的调用
// ─A─B─C─ ─D─ ─ ─ ─ ─ ─E─ ─F─G
// 经过3单位的debounce之后变为了
// ─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G

function debounce(func, wait) {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
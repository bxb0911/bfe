// ─A─B─C─ ─D─ ─ ─ ─ ─ ─ E─ ─F─G

// with {leading: false, trailing: true}, we get as below
// ─ ─ ─ ─ ─ ─ ─ ─D─ ─ ─ ─ ─ ─ ─ ─ ─ G

// with {leading: true, trailing: true}:
// ─A─ ─ ─ ─ ─ ─ ─D─ ─ ─E─ ─ ─ ─ ─ ─G

// with {leading: true, trailing: false}
// ─A─ ─ ─ ─ ─ ─ ─ ─ ─ ─E

function debounce(func, wait, option = { leading: false, trailing: true }) {
  let timer = null
  return function(...args) {
    let isInvoked = false
    if (option.leading && timer === null) {
      isInvoked = true
      func.apply(this, args)
    }
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      option.trailing && !isInvoked && func.apply(this, args)
      timer = null
    }, wait)
  }
}

function debounce1() {
  let timer = null

  return function(...args) {

    let isInvoked = false
    // if not cooling down and leading is true, invoke it right away
    if (timer === null && option.leading) {
      func.call(this, ...args)
      isInvoked = true
    }

    // no matter what, timer needs to be reset
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      if (option.trailing && !isInvoked) {
        func.call(this, ...args)
      }

      timer = null
    }, wait)
  }
}
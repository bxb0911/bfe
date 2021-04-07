function throttle(func, wait, option = { leading: true, trailing: true }) {
  let waiting = false, timer = null, lastArgs
  const timeoutFn = () => {
    timer = setTimeout(() => {
      if (option.trailing && lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
        if (timer) timer = null;
        timeoutFn.apply(this, lastArgs)
      } else {
        waiting = false;
      }
    }, wait);
  };
  return function (...args) {
    if (!waiting) {
      waiting = true
      option.leading && func.apply(this, args)
      timer.apply(this)
    } else {
      lastArgs = args
    }
  }
}
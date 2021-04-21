function $(el) {
  return {
    css: function(attr, val) {
      el.style[attr] = val
      return this
    }
  }
}
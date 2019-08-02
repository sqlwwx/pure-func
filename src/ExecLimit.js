module.exports = class ExecLimit {
  constructor () {
    this.history = new Set()
  }

  isExeced (key) {
    if (this.history.has(key)) {
      return false
    }
    this.history.clear()
    this.history.add(key)
    return true
  }

  async exec (key, fn) {
    if (this.isExeced(key)) {
      return fn()
    }
    return Promise.resolve()
  }
}

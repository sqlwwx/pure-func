module.exports = class ExecLimit {
  #namespaces = Object.create(null)

  get namespacesCount () {
    return Object.keys(this.#namespaces).length
  }

  clear (namespace) {
    if (namespace) {
      delete this.#namespaces[namespace]
    } else {
      this.#namespaces = Object.create(null)
    }
  }

  getHistory (namespace) {
    if (!this.#namespaces[namespace]) {
      this.#namespaces[namespace] = new Set()
    }
    return this.#namespaces[namespace]
  }

  isExeced (key, namespace) {
    const history = this.getHistory(namespace)
    if (history.has(key)) {
      return true
    }
    history.clear()
    history.add(key)
    return false
  }

  async exec (key, fn, namespace = 'default') {
    if (!this.isExeced(key, namespace)) {
      return fn()
    }
    return Promise.resolve()
  }
}

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
      this.#namespaces[namespace] = new Map()
    }
    return this.#namespaces[namespace]
  }

  async exec (key, fn, namespace = 'default') {
    const history = this.getHistory(namespace)
    if (history.has(key)) {
      return history.get(key)
    }
    history.clear()
    const ret = fn()
    history.set(key, ret)
    return ret
  }
}

const got = require('got')
const assert = require('assert')

const isIp = /\d+\.\d+\.\d+\.\d+/

// https://raw.githubusercontent.com/rsp/scripts/master/externalip-benchmark
const defaultIpServers = [
  'http://whatismyip.akamai.com/',
  'http://ipecho.net/plain',
  'http://icanhazip.com/'
]
let v4ip

const loadData = (urls, index = 0) => {
  if (urls[index]) {
    return got(urls[index], {
      timeout: 1500,
      retryCount: 0,
      resolveBodyOnly: true
    }).then(ip => {
      assert.match(ip, isIp)
      return ip
    }).catch(() => loadData(urls, index + 1))
  }
  return Promise.reject(new Error('LOAD_PUBLIC_IP_FAILED'))
}

export const v4 = async ({ reload, urls } = {}) => {
  if (!v4ip || reload) {
    v4ip = loadData(urls || defaultIpServers)
  }
  return v4ip
}

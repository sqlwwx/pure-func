const got = require('got')

// https://raw.githubusercontent.com/rsp/scripts/master/externalip-benchmark
const defaultIpServer = 'http://whatismyip.akamai.com/'
let v4ip

export const v4 = async ({ reload, url } = {}) => {
  if (!v4ip || reload) {
    v4ip = await got(url || defaultIpServer, { resolveBodyOnly: true })
  }
  return v4ip
}

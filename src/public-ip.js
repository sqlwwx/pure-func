const axios = require('axios')
const adapterHttp = require('axios/lib/adapters/http')
axios.defaults.adapter = adapterHttp

// https://raw.githubusercontent.com/rsp/scripts/master/externalip-benchmark
let defaultIpServer = 'http://whatismyip.akamai.com/'
let v4ip

export const v4 = async ({ reload, url } = {}) => {
  if (!v4ip || reload) {
    v4ip = await axios.get(url || defaultIpServer)
      .then(ret => ret.data)
  }
  return v4ip
}

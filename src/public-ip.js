const axios = require('axios')
const adapterHttp = require('axios/lib/adapters/http')
axios.defaults.adapter = adapterHttp

// https://raw.githubusercontent.com/rsp/scripts/master/externalip-benchmark

export const v4 = (url) => axios.get(url || 'http://whatismyip.akamai.com/').then(ret => ret.data)

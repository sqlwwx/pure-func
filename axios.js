const axios = require('axios')

axios.loadBuffer = url => axios(url, {
  responseType: 'arraybuffer'
}).then(({ data }) => Buffer.from(data, 'binary'))

axios.loadBase64 = url => axios.loadBuffer(url)
  .then(buf => buf.toString('base64'))

module.exports = axios

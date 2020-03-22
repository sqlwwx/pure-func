const fs = require('fs')
const { getEtag, getEtagFromString } = require('./qetag')

/* eslint-env jest */
describe('qetag', () => {
  it('getEtag', async () => {
    expect(
      await getEtag(Buffer.from('wwx\n'))
    ).toEqual('Fp1v1rPlRuojgyH1hYd4ZNyCTaBe')
    expect(
      await getEtag('/tmp/qetag_100')
    ).toEqual('lsyDJxr2OTnEnUGbFq-hXQg_sBKo')
    expect(
      await getEtag('src/config/test')
    ).toEqual('FgITX_kTPbA6QKr_WGuxc-anppmP')
    expect(
      await getEtag(Buffer.from('wwx\n'))
    ).toEqual('Fp1v1rPlRuojgyH1hYd4ZNyCTaBe')
    expect(
      await getEtag(Buffer.from(''))
    ).toEqual('Fto5o-5ea0sNMlW_75VgGJCv2AcJ')
  })
  it('getEtagFromStream', async () => {
    expect(
      await getEtag(fs.createReadStream('/tmp/qetag_100'))
    ).toEqual('lsyDJxr2OTnEnUGbFq-hXQg_sBKo')
  })
  it('getEtagFromString', async () => {
    expect(
      await getEtagFromString('wwx\n')
    ).toEqual('Fp1v1rPlRuojgyH1hYd4ZNyCTaBe')
    expect(
      await getEtagFromString('')
    ).toEqual('Fto5o-5ea0sNMlW_75VgGJCv2AcJ')
  })
})

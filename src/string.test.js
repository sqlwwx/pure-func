require('./string')

/* eslint-env jest */
describe('string', () => {
  it('removeInvalideChars', () => {
    expect('abc'.removeInvalidChars()).toEqual('abc')
    expect('吴伟星💭'.removeInvalidChars()).toEqual('吴伟星')
    expect('吴伟😜😜星'.removeInvalidChars()).toEqual('吴伟星')
  })
})

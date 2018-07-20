const { dispatch } = require('./dispatcher')

/* eslint-env jest */
describe('dispatch', () => {
  describe('dispatch', () => {
    it('dispatch one', () => {
      expect(dispatch(1, ['a'])).toEqual('a')
      expect(dispatch(2, ['a'])).toEqual('a')
      expect(dispatch(3, ['a'])).toEqual('a')
    })
    it('dispatch two', () => {
      expect(dispatch(1, ['a', 'b'])).toEqual('b')
      expect(dispatch(2, ['a', 'b'])).toEqual('a')
      expect(dispatch(3, ['a', 'b'])).toEqual('b')
    })
    it('dispatch str', () => {
      expect(dispatch('a', ['a', 'b'])).toEqual('b')
      expect(dispatch('b', ['a', 'b'])).toEqual('a')
      expect(dispatch('c', ['a', 'b'])).toEqual('b')
    })
    it('dispatch number', () => {
      expect(dispatch('a', 2)).toEqual(1)
      expect(dispatch('b', 2)).toEqual(0)
      expect(dispatch('c', 2)).toEqual(1)
      expect(dispatch('d', 2)).toEqual(0)
      expect(dispatch(1, 2)).toEqual(1)
      expect(dispatch('1', 2)).toEqual(1)
      expect(dispatch(2, 2)).toEqual(0)
      expect(dispatch(3, 2)).toEqual(1)
      expect(dispatch(4, 2)).toEqual(0)
    })
  })
})

import { eq } from 'lodash'

/* eslint-env jest */
describe('lodash', () => {
  it('eq', async () => {
    expect(eq('a', 'a')).toEqual(true)
  })
})

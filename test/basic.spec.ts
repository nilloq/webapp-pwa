import { describe, test, expect } from 'vitest'
// import { setup, $fetch } from '@nuxt/test-utils'
describe('My test', async() => {
  // await setup({
  //   // test context options
  // })
  test('my test', () => {
    expect(1+2+3).toBe(6)
  })
})
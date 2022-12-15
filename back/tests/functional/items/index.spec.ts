import { test } from '@japa/runner'

test.group('Items index', () => {
  test('get all items', async ({ client }) => {
    const response = await client.get('/items')
    response.assertAgainstApiSpec()
  })
})

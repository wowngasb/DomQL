import { queryGql } from '../testUtils'

describe('Query Type', () => {
  describe('page field', () => {
    it('must reject invalid url format', async () => {
      const query = `
        {
          page(url:"ftp://example.com") {
            title
          }
        }
      `
      const mockHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Mock Title</title>
          </head>
        </html>
      `

      const result: any = await queryGql(query, mockHtml)

      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toEqual('ftp://example.com is not a valid URL')
    })
  })
})

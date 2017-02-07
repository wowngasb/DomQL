import { queryGql } from '../testUtils'

describe('Document Type', () => {
  it('can get title from webpage', async () => {
    const query = `
      {
        page(url:"http://www.sanook.com") {
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

    expect(result.data.page.title).toBe('Mock Title')
  })
})

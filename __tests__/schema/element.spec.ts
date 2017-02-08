import { queryGql } from '../testUtils'

describe('Element Type', () => {
  it('can visit link if element is a', async () => {
    const query = `
      {
        page(url:"http://www.sanook.com") {
          query(selector: "a") {
            visit {
              title
            }
          }
        }
      }
    `
    const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mock Title</title>
        </head>
        <body>
          <a href="http://news.sanook.com">News</a>
          <a href="http://men.sanook.com">Men</a>
          <a href="http://women.sanook.com">Women</a>
        </body>
      </html>
    `

    const result: any = await queryGql(query, mockHtml)

    expect(result.data.page.query).toEqual([
      {
        visit: { title: 'Mock Title' }
      },
      {
        visit: { title: 'Mock Title' }
      },
      {
        visit: { title: 'Mock Title' }
      }
    ])
  })
})

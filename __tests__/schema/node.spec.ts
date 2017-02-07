import { queryGql } from '../testUtils'

const query = `
  {
    page(url:"http://www.sanook.com") {
      title
      html(selector: "#container")
      content(selector: "#container")
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
      <div id="container">
        <h1>Title</h1>
        <h2>Subtitle</h2>
      </div>
    </body>
  </html>
`

let queryResult
beforeAll(async () => {
  queryResult = await queryGql(query, mockHtml)
})

describe('Node Type', () => {
  it('can get html of selector', () => {
    expect(queryResult.data.page.html).toBe('<div id="container">\n        <h1>Title</h1>\n        <h2>Subtitle</h2>\n      </div>')
  })

  it('can get inner html of selector', () => {
    expect(queryResult.data.page.content).toBe('\n        <h1>Title</h1>\n        <h2>Subtitle</h2>\n      ')
  })
})

import { queryGql } from '../testUtils'

const query = `
  {
    page(url:"http://www.sanook.com") {
      title
      html(selector: "#container")
      content(selector: "#container")
      text(selector: "#container > h1")
      tag(selector: "#container")
      attr(selector: "#container", name: "width")
      articles: query(selector: "#forQuery article") {
        h1: text(selector: "h1")
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
      <div id="container" width="50%">
        <h1>Title</h1>
        <h2 >Subtitle</h2>
      </div>
      <section id="forQuery">
        <article>
          <h1>Article 1</h1>
        </article>
        <article>
          <h1>Article 2</h1>
        </article>
        <article>
          <h1>Article 3</h1>
        </article>
      </section>
    </body>
  </html>
`

let queryResult
beforeAll(async () => {
  queryResult = await queryGql(query, mockHtml)
})

describe('Node Type', () => {
  it('can get html of selector', () => {
    expect(queryResult.data.page.html).toBe('<div id="container" width="50%">\n        <h1>Title</h1>\n        <h2>Subtitle</h2>\n      </div>')
  })

  it('can get inner html of selector', () => {
    expect(queryResult.data.page.content).toBe('\n        <h1>Title</h1>\n        <h2>Subtitle</h2>\n      ')
  })

  it('can get text of the selected DOM', () => {
    expect(queryResult.data.page.text).toBe('Title')
  })

  it('can get tag name of the selected dom', () => {
    expect(queryResult.data.page.tag).toBe('div')
  })

  it('can get specific attribute of selected dom', () => {
    expect(queryResult.data.page.attr).toBe('50%')
  })

  it('can query dom using selector', () => {
    expect(queryResult.data.page.articles).toEqual([
      {
        h1: 'Article 1'
      },
      {
        h1: 'Article 2'
      },
      {
        h1: 'Article 3'
      }
    ])
  })
})

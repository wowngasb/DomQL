import { merge } from 'lodash'
import { schema as documentSchema, resolvers as documentResolvers } from './document'
import { schema as elementSchema, resolvers as elementResolvers } from './element'
import { isURL } from 'validator'

export const schema: Array<string> = [`
  # The query root.
  type Query {
    # A webpage you would like to scrape.
    page(
      # The url of the webpage.
      url: String!
    ): Document
  }
`, ...documentSchema, ...elementSchema]

export const resolvers = merge({
  Query: {
    page: (parent, { url }, { cheerio, config, fetch }) => {
      if (!isURL(url, config.validateUrl)) {
        throw new Error(`${url} is not a valid URL`)
      }

      return fetch(url)
        .then((res) => {
          return res.text()
        })
        .then((html) => {
          let $ = cheerio.load(html, config.cheerio)
          return $('html')
        })
        .catch((err) => {
          throw new Error(`Cannot fetch ${url}, ${err}`)
        })
    }
  }
}, documentResolvers, elementResolvers)

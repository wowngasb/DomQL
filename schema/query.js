const merge = require('lodash').merge;
const documentSchema = require('./document').schema;
const documentResolvers = require('./document').resolvers;
const elementSchema = require('./element').schema;
const elementResolvers = require('./element').resolvers;
const isURL = require('validator').isURL;

const schema = [`
  # The query root.
  type Query {
    # A webpage you would like to scrape.
    page(
      # The url of the webpage.
      url: String!
    ): Document

    document: Document
    hello: String
  }
`, ...documentSchema, ...elementSchema]

const resolvers = merge({
  Query: {
    hello: (parent, args, context) => {
      return 'world';
    },
    document: (parent) => {
      return new Promise((resolve, reject) => {
        $(() => {
          resolve($('html'));
        });
      });
    },
    page: (parent, {
      url
    }, {
      cheerio,
      config,
      fetch
    }) => {
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

module.exports = {
  schema,
  resolvers,
}
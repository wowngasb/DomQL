const merge = require('lodash').merge;
const nodeContract = require('./contracts/node').contract;
const nodeFields = require('./contracts/node').fields;
const nodeResolvers = require('./contracts/node').resolvers;

const schema = [`
  # HTML Element
  type Element implements Node {
    # if the element is an <a>, will return the corresponding document
    visit: Document

    ${nodeFields}
  }
`, nodeContract]

const resolvers = {
  Element: merge({
    visit: (self, args, {
      fetch,
      config,
      cheerio
    }) => {
      if (!self.is('a')) {
        return null
      }

      const href = self.attr('href')
      return fetch(href)
        .then((res) => {
          return res.text()
        })
        .then((html) => {
          let $ = cheerio.load(html, config.cheerio)
          return $('html')
        })
        .catch((err) => {
          throw new Error(`Cannot fetch ${href}, ${err}`)
        })
    }
  }, nodeResolvers)
}

module.exports = {
  schema,
  resolvers,
}
const merge = require('lodash').merge;
const nodeContract = require('./contracts/node').contract;
const nodeFields = require('./contracts/node').fields;
const nodeResolvers = require('./contracts/node').resolvers;

const schema = [`
  # Loaded webpage from given url
  type Document implements Node {
    # The title of the document
    title: String

    ${nodeFields}
  }
`, nodeContract]

const resolvers = {
  Document: merge({
    title: (self) => {
      return self.find('title').text()
    }
  }, nodeResolvers)
}

module.exports = {
  schema,
  resolvers,
}
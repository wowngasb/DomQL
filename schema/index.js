const merge = require('lodash').merge;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const querySchema = require('./query').schema;
const queryResolvers = require('./query').resolvers;

const rootSchema = [`
  schema {
    query: Query
  }
`]

const rootResolvers = {}

const schema = [...rootSchema, ...querySchema]
const resolvers = merge(rootResolvers, queryResolvers)

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

module.exports = executableSchema
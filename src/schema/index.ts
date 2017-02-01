import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import { schema as querySchema, resolvers as queryResolvers } from './query'

const rootSchema: Array<string> = [`
  schema {
    query: Query
  }
`]

const rootResolvers = {}

const schema = [...rootSchema, ...querySchema]
const resolvers = merge(rootResolvers, queryResolvers)

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default executableSchema

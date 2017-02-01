import * as express from 'express'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import config from './config'
import schema from './schema'

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/graphql', graphqlExpress((req) => {
  return {
    schema
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
    demo {
      foo
    }
  }`
}))

app.listen(config.server.port, () : void => {
  console.log(`Server runing on port ${config.server.port}`)
})

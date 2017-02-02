import * as express from 'express'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import config from './config'
import schema from './schema'

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/graphql', graphqlExpress((req: express.Request) => {
  const MAXIMUN_QUERY_LENGTH: number = 2000
  const query = req.query.query || req.body.query

  if (query && query.length > MAXIMUN_QUERY_LENGTH) {
    throw new Error('Query too large.')
  }

  return {
    schema,
    context: {
      cheerio,
      config,
      fetch
    }
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
  page(url: "http://www.sanook.com") {
    title
  }
}`
}))

app.listen(config.server.port, () : void => {
  console.log(`Server runing on port ${config.server.port}`)
})

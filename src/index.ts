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

app.get('/', function (req, res) {
  res.redirect(301, '/graphiql')
})

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
  siamhtml: page(url: "http://www.siamhtml.com") {
    highlights: query(selector: ".section.section--highlight article") {
      title: text(selector:".post__title")
      thumbnail: attr(selector: ".post__image", name: "src")
      link: query(selector: ".post__title a") {
        url: attr(name: "href")
        content: visit {
          author: attr(selector: ".author meta", name: "content")
          publishedDate: text(selector: ".meta__item--pubDate time")
        }
      }
    }
  }

  sanook: page(url: "http://www.sanook.com") {
    news: query(selector: "#tab-news article") {
			title: text(selector: "h3")
      link: attr(selector: "a", name: "href")
      thumbnail: attr(selector: "img", name: "src")
    }
  }
}`
}))

app.listen(config.server.port, () : void => {
  console.log(`Server runing on port ${config.server.port}`)
})

app.use('*', function (req, res) {
  res.status(404).end()
})

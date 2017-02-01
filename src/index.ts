import * as express from 'express'
import config from './config'

const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) : void => {
  res.end('tatoonz')
})

app.listen(config.server.port, () : void => {
  console.log(`Server runing on port ${config.server.port}`)
})

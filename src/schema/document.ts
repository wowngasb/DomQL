import { merge } from 'lodash'
import {
  contract as nodeContract,
  fields as nodeFields,
  resolvers as nodeResolvers
} from './contracts/node'

export const schema = [`
  # Loaded webpage from given url
  type Document implements Node {
    # The title of the document
    title: String

    ${nodeFields}
  }
`, nodeContract]

export const resolvers = {
  Document: merge({
    title: (self) => {
      return self.find('title').text()
    }
  }, nodeResolvers)
}

export const schema: Array<string> = [`
  type Demo {
    foo: String!
  }

  type Query {
    demo: Demo
  }
`]

export const resolvers: Object = {
  Query: {
    demo: () => {
      return {
        foo: 'bar'
      }
    }
  }
}

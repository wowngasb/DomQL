"use strict";
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const query_1 = require("./query");
const rootSchema = [`
  schema {
    query: Query
  }
`];
const rootResolvers = {};
const schema = [...rootSchema, ...query_1.schema];
const resolvers = lodash_1.merge(rootResolvers, query_1.resolvers);
const executableSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: schema,
    resolvers
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = executableSchema;

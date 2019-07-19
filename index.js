// import {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
// } from 'graphql';
const _graphql = require("graphql");
const schema = require('./schema');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const graphql = _graphql.graphql;
const query = '{ hello }';

const config = {
  cheerio: {
    decodeEntities: true
  },
  validateUrl: {
    protocols: ['http', 'https'],
    require_protocol: true
  }
};



/* 
export interface GraphQLArgs {
    schema: GraphQLSchema;
    source: Source | string;
    rootValue?: any;
    contextValue?: any;
    variableValues?: Maybe<{ [key: string]: any }>;
    operationName?: Maybe<string>;
    fieldResolver?: Maybe<GraphQLFieldResolver<any, any>>;
}
*/
graphql({
  schema: schema,
  source: query
}).then(result => {
  console.log(`test query:${query}, result:`, JSON.stringify(result));
});


if (typeof window != 'undefined') {
  window.graphqlExec = (query, variables, operationName) => {
    return graphql({
      schema: schema,
      source: query,
      operationName: operationName
    });
  };
  const query3 = `{
    document {
      h1: text(selector: "h1")
    }
  }`
  graphql({
    schema: schema,
    source: query3
  }).then(result => {
    console.log('test query3:', query3, ', result:', JSON.stringify(result));
  });
} else {
  const query2 = `{
    page(url: "http://news.ycombinator.com") {
      items: query(selector: "tr.athing") {
        rank: text(selector: "td span.rank")
        title: text(selector: "td.title a")
        sitebit: text(selector: "span.comhead a")
      }
    }
  }`;

  graphql({
    schema: schema,
    source: query2,
    contextValue: {
      config,
      fetch,
      cheerio
    }
  }).then(result => {
    console.log('test query2:', query2, ', result:', JSON.stringify(result));
  });
}

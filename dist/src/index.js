"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const graphql_server_express_1 = require("graphql-server-express");
const cheerio = require("cheerio");
const node_fetch_1 = require("node-fetch");
const config_1 = require("./config");
const schema_1 = require("./schema");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.redirect(301, '/graphiql');
});
app.use('/graphql', graphql_server_express_1.graphqlExpress((req) => {
    const MAXIMUN_QUERY_LENGTH = 2000;
    const query = req.query.query || req.body.query;
    if (query && query.length > MAXIMUN_QUERY_LENGTH) {
        throw new Error('Query too large.');
    }
    return {
        schema: schema_1.default,
        context: {
            cheerio,
            config: config_1.default,
            fetch: node_fetch_1.default
        }
    };
}));
app.use('/graphiql', graphql_server_express_1.graphiqlExpress({
    endpointURL: '/graphql',
    query: `{
  page(url: "http://www.sanook.com") {
    title
  }
}`
}));
app.listen(config_1.default.server.port, () => {
    console.log(`Server runing on port ${config_1.default.server.port}`);
});
app.use('*', function (req, res) {
    res.status(404).end();
});

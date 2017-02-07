"use strict";
const lodash_1 = require("lodash");
const document_1 = require("./document");
const validator_1 = require("validator");
exports.schema = [`
  # The query root.
  type Query {
    # A webpage you would like to scrape.
    page(
      # The url of the webpage.
      url: String!
    ): Document
  }
`, ...document_1.schema];
exports.resolvers = lodash_1.merge({
    Query: {
        page: (parent, { url }, { cheerio, config, fetch }) => {
            if (!validator_1.isURL(url, config.validateUrl)) {
                throw new Error(`${url} is not a valid URL`);
            }
            return fetch(url)
                .then((res) => {
                return res.text();
            })
                .then((html) => {
                let $ = cheerio.load(html, config.cheerio);
                return $('html');
            })
                .catch((err) => {
                throw new Error(`Cannot fetch ${url}, ${err}`);
            });
        }
    }
}, document_1.resolvers);

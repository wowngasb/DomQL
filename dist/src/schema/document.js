"use strict";
const lodash_1 = require("lodash");
const node_1 = require("./contracts/node");
exports.schema = [`
  # Loaded webpage from given url
  type Document {
    # The title of the document
    title: String

    ${node_1.fields}
  }
`, node_1.contract];
exports.resolvers = {
    Document: lodash_1.merge(node_1.resolvers, {
        title: (self) => {
            return self.find('title').text();
        }
    })
};

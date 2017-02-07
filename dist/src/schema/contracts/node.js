"use strict";
exports.fields = `
  # The HTML representation of the selected DOM
  html(selector: String): String

  # The HTML representation of the subnodes for the selected DOM
  content(selector: String): String
`;
exports.contract = `
  # DOM Node
  interface Node {
    ${exports.fields}
  }
`;
function querySelector($, { selector }) {
    if (!selector) {
        return $;
    }
    return $.find(selector);
}
exports.resolvers = {
    html: (self, args, { cheerio }) => {
        return cheerio.html(querySelector(self, args));
    },
    content: (self, args) => {
        return querySelector(self, args).html();
    }
};

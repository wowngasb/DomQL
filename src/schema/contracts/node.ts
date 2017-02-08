export const fields = `
  # The HTML representation of the selected DOM
  html(selector: String): String

  # The HTML representation of the subnodes for the selected DOM
  content(selector: String): String

  # Get text of the selected DOM
  text(selector: String): String

  # Get tag name ot selected DOM
  tag(selector: String): String
`

export const contract = `
  # DOM Node
  interface Node {
    ${fields}
  }
`

function querySelector($, { selector }) {
  if (!selector) {
    return $
  }

  return $.find(selector)
}

export const resolvers = {
  html: (self, args, { cheerio }) => {
    return cheerio.html(querySelector(self, args))
  },

  content: (self, args) => {
    return querySelector(self, args).html()
  },

  text: (self, args) => {
    return querySelector(self, args).text()
  },

  tag: (self, args) => {
    const el = querySelector(self, args).get(0)

    if (!el) {
      return null
    }

    return el.tagName
  }
}

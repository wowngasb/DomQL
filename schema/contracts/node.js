 const fields = `
  # The HTML representation of the selected DOM
  html(selector: String): String

  # The HTML representation of the subnodes for the selected DOM
  content(selector: String): String

  # Get text of the selected DOM
  text(selector: String): String

  # Get tag name ot selected DOM
  tag(selector: String): String

  # Get specify attribute value
  attr(name: String!, selector: String): String

  # Find elements using selector
  query(selector: String): [Element]
`

 const contract = `
  # DOM Node
  interface Node {
    ${fields}
  }
`

 function querySelector($, {
   selector
 }) {
   if (!selector) {
     return $
   }

   return $.find(selector)
 }

 const resolvers = {
   html: (self, args, {
     cheerio
   }) => {
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
   },

   attr: (self, args) => {
     return querySelector(self, args).attr(args.name)
   },

   query: (self, args, {
     cheerio
   }) => {
     return querySelector(self, args).map(function () {
       return cheerio(this)
     })
   }
 }

 module.exports = {
   fields,
   contract,
   resolvers,
 }
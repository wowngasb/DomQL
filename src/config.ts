export default {
  server: {
    port: process.env.PORT || 3003
  },

  cheerio: {
    decodeEntities: true
  },

  validateUrl: {
    protocols: ['http', 'https'],
    require_protocol: true
  }
}

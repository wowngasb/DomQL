import { graphql } from 'graphql'
import * as cheerio from 'cheerio'
import config from '../src/config'
import schema from '../src/schema'

export async function queryGql(query: string, mockFetchResponseText: string) {
  return await graphql(schema, query, {}, getMockContext(mockFetchResponseText))
}

export function getMockFetch(mockFetchResponseText: string) {
  const mockResponse = {
    text: function() {
      return new Promise((resolve) => {
        resolve(mockFetchResponseText)
      })
    }
  }

  return function(url) {
    return new Promise((resolve) => {
      resolve(mockResponse)
    })
  }
}

export function getMockContext(mockFetchResponseText: string) {
  return {
    cheerio,
    config,
    fetch: getMockFetch(mockFetchResponseText)
  }
}

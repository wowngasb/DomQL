import * as assert from 'assert'
import { indexOf } from 'lodash'
import isValidUrl from './isValidUrl'

describe('isValidUrl', () => {
  it('should valid with these urls', () => {
    const validUrls = [
      'http://www.sanook.com',
      'http://news.sanook.com/2162839',
      'http://google.com/?foo=bar',
    ]

    const validate = validUrls.map((url) => {
      return isValidUrl(url)
    })

    assert(indexOf(validate, false) === -1)
  })
})

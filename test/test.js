/* global describe, beforeEach, it */
'use strict'
import convertVinylToVfile from '../lib/'
import {expect} from 'chai'
import {join} from 'path'
import Vinyl from 'vinyl'

describe('conver-vinyl-to-vfile', () => {
  let directory, extension, filename, vinylFile

  beforeEach(() => {
    const contents = 'abe lincoln'
    directory = join('users', 'dustin', 'project')
    extension = 'md'
    filename = 'awesome.project'

    vinylFile = new Vinyl({
      contents: new Buffer(contents),
      path: join(directory, `${filename}.${extension}`)
    })
  })

  it('should throw error if vinyl if not a Vinyl file', () => {
    const test = () => convertVinylToVfile()

    expect(test).to.throw(TypeError, /Expected a Vinyl file/)
  })

  describe('output', () => {
    let result

    beforeEach(() => {
      result = convertVinylToVfile(vinylFile)
    })

    it('should have a directory property', () => {
      expect(result.directory).to.eql(directory)
    })

    it('should have a filename property', () => {
      expect(result.filename).to.eql(filename)
    })

    it('should have an extension property', () => {
      expect(result.extension).to.eql(extension)
    })

    it('should have a contents property', () => {
      expect(result.contents).to.eql('abe lincoln')
    })
  })
})

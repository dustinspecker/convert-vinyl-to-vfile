/* global describe, beforeEach, it */
'use strict'
import convertVinylToVfile from '../lib/'
import {expect} from 'chai'
import {join} from 'path'
import {Stream} from 'stream'
import Vinyl from 'vinyl'

describe('convert-vinyl-to-vfile', () => {
  let vinylFile

  beforeEach(() => {
    vinylFile = new Vinyl({
      contents: new Buffer('abe lincoln'),
      path: join('users', 'dustin', 'project', 'awesome.project.md')
    })
  })

  it('should throw error if vinyl if not a Vinyl file', () => {
    const test = () => convertVinylToVfile()

    expect(test).to.throw(TypeError, /Expected a Vinyl file/)
  })

  it('should throw error if vinyl is a stream', () => {
    const file = new Vinyl({
      contents: new Stream.Readable(),
      path: 'awesome.project.md'
    })
    const test = () => convertVinylToVfile(file)

    expect(test).to.throw(TypeError, /Streams are not supported/)
  })

  describe('output', () => {
    let result

    beforeEach(() => {
      result = convertVinylToVfile(vinylFile)
    })

    it('should have a dirname property', () => {
      expect(result.dirname).to.eql(vinylFile.dirname)
    })

    it('should have a stem property', () => {
      expect(result.stem).to.eql(vinylFile.stem)
    })

    it('should have an extname property', () => {
      expect(result.extname).to.eql(vinylFile.extname)
    })

    it('should have contents', () => {
      expect(result.toString()).to.eql(vinylFile.contents.toString())
    })
  })
})

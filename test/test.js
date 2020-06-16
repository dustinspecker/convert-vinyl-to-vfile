/* global describe, beforeEach, it */
'use strict'
const convertVinylToVfile = require('../src')
const {expect} = require('chai')
const {join} = require('path')
const {Stream} = require('stream')
const Vinyl = require('vinyl')
const VFile = require('vfile')

describe('convert-vinyl-to-vfile', () => {
  let vinylFile

  beforeEach(() => {
    vinylFile = new Vinyl({
      contents: Buffer.from('abe lincoln'),
      path: join('users', 'dustin', 'project', 'awesome.project.md'),
      data: {custom: 'data'}
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

    it('should have custom data', () => {
      expect(result.data).to.eql(vinylFile.data)
    })

    it('should have default data if not defined', () => {
      const plainVinyl = new Vinyl({path: 'plain.txt'})
      const plainVfile = new VFile({path: 'plain.txt'})
      const defaultData = plainVfile.data
      expect(convertVinylToVfile(plainVinyl).data).to.deep.eql(defaultData)
    })
  })
})

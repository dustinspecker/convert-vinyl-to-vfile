'use strict'
import path from 'path'
import VFile from 'vfile'
import Vinyl from 'vinyl'

/**
 * Convert a Vinyl file to a VFile
 * @param {Vinyl} vinyl - a Vinyl file to convert
 * @throws {TypeError} - if vinyl is not a Vinyl file
 * @return {VFile} - VFile version of vinyl
 */
module.exports = function (vinyl) {
  let newVinyl

  // When a "Vinyl file" is passed from a Gulp stream
  // Vinyl.isVinyl(vinyl) returns false.
  // This forces a potential Vinyl file to be a Vinyl file.
  if (vinyl) {
    newVinyl = new Vinyl(vinyl)
  }

  if (!Vinyl.isVinyl(newVinyl)) {
    throw new TypeError('Expected a Vinyl file')
  }

  const contents = newVinyl.contents.toString()
  const directory = path.dirname(newVinyl.path)
  const extension = path.extname(newVinyl.path).replace('.', '')
  const filename = path.basename(newVinyl.path, `.${extension}`)

  return new VFile({
    directory,
    filename,
    extension,
    contents
  })
}

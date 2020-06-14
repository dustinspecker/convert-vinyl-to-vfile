'use strict'
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

  if (newVinyl.isStream()) {
    throw new TypeError('Streams are not supported')
  }

  const options = {}

  options.contents = newVinyl.contents
  options.path = newVinyl.path

  if (typeof newVinyl.data !== 'undefined') {
    options.data = newVinyl.data
  }

  return new VFile(options)
}

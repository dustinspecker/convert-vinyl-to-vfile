'use strict';
import path from 'path';
import VFile from 'vfile';
import Vinyl from 'vinyl';

/**
 * Convert a Vinyl file to a VFile
 * @param {Vinyl} vinyl - a Vinyl file to convert
 * @throws {TypeError} - if vinyl is not a Vinyl file
 * @return {VFile} - VFile version of vinyl
 */
export default function convertVinylToVfile(vinyl) {
  let contents, directory, extension, filename, newVinyl;

  // When a "Vinyl file" is passed from a Gulp stream
  // Vinyl.isVinyl(vinyl) returns false.
  // This forces a potential Vinyl file to be a Vinyl file.
  if (vinyl) {
    newVinyl = new Vinyl(vinyl);
  }

  if (!Vinyl.isVinyl(newVinyl)) {
    throw new TypeError('Expected a Vinyl file');
  }

  contents = newVinyl.contents.toString();
  directory = path.dirname(newVinyl.path);
  extension = path.extname(newVinyl.path).replace('.', '');
  filename = path.basename(newVinyl.path, `.${extension}`);

  return new VFile({
    directory,
    filename,
    extension,
    contents
  });
}

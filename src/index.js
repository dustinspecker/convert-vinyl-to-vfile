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
  let contents, directory, extension, filename;

  if (!Vinyl.isVinyl(vinyl)) {
    throw new TypeError('Expected a Vinyl file');
  }

  contents = vinyl.contents.toString();
  directory = path.dirname(vinyl.path);
  extension = path.extname(vinyl.path).replace('.', '');
  filename = path.basename(vinyl.path, `.${extension}`);

  return new VFile({
    directory,
    filename,
    extension,
    contents
  });
}

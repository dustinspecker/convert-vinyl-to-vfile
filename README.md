# convert-vinyl-to-vfile
[![NPM version](https://badge.fury.io/js/convert-vinyl-to-vfile.svg)](https://badge.fury.io/js/convert-vinyl-to-vfile) [![Build Status](https://travis-ci.org/dustinspecker/convert-vinyl-to-vfile.svg)](https://travis-ci.org/dustinspecker/convert-vinyl-to-vfile) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/convert-vinyl-to-vfile.svg)](https://coveralls.io/r/dustinspecker/convert-vinyl-to-vfile?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/convert-vinyl-to-vfile/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/convert-vinyl-to-vfile) [![Dependencies](https://david-dm.org/dustinspecker/convert-vinyl-to-vfile.svg)](https://david-dm.org/dustinspecker/convert-vinyl-to-vfile) [![DevDependencies](https://david-dm.org/dustinspecker/convert-vinyl-to-vfile/dev-status.svg)](https://david-dm.org/dustinspecker/convert-vinyl-to-vfile?type=dev)

> Convert a [Vinyl](https://github.com/wearefractal/vinyl) file to a [VFile](https://github.com/vfile/vfile)

## Install
```
npm install --save convert-vinyl-to-vfile
```

## Usage
```javascript
const convertVinylToVfile = require('convert-vinyl-to-vfile')
const {join} = require('path');
const VFile = require('vfile');
const Vinyl = require('vinyl');

const vinylFile = new Vinyl({
  contents: Buffer.from('abe lincoln'),
  path: join('users', 'dustin', 'project', 'awesome.project.md')
});

const vfile = convertVinylToVfile(vinylFile);
/* =>
 * new VFile({
 *   contents: <Buffer 61 62 65 20 6c 69 6e 63 6f 6c 6e>,
 *   path: 'users/dustin/project/awesome.project.md'
 * })
 */

vfile instanceof VFile;
// => true
```

## LICENSE
MIT © [Dustin Specker](https://github.com/dustinspecker)

'use strict'
const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')

const srcFiles = 'src/*.js'
    , testFiles = 'test/*.js'

gulp.task('test', cb => {
  gulp.src([srcFiles])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb)
    })
})

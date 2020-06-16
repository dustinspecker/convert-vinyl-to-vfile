'use strict'
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')

const configFiles = './gulpfile.js'
    , srcFiles = 'src/*.js'
    , testFiles = 'test/*.js'

gulp.task('lint', () => gulp.src([configFiles, srcFiles, testFiles])
  .pipe(eslint())
  .pipe(eslint.failOnError()))

gulp.task('test', gulp.series(['lint'], cb => {
  gulp.src([srcFiles])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb)
    })
}))

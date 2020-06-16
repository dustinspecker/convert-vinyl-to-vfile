'use strict'
const babel = require('gulp-babel')
const babelCompiler = require('babel-core')
const del = require('del')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')

const configFiles = './gulpfile.js'
    , srcFiles = 'src/*.js'
    , testFiles = 'test/*.js'

    , destDir = './lib/'

gulp.task('clean', () => del(destDir))

gulp.task('lint', ['clean'], () => gulp.src([configFiles, srcFiles, testFiles])
  .pipe(eslint())
  .pipe(eslint.failOnError()))

gulp.task('build', ['lint'], () => gulp.src(srcFiles)
  .pipe(babel())
  .pipe(gulp.dest(destDir)))

gulp.task('test', ['build'], cb => {
  gulp.src([`${destDir}*.js`])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha({
          compilers: {
            js: babelCompiler
          }
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb)
    })
})

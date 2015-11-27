var gulp      = require('gulp');
var size      = require('gulp-size');
var minifyCss = require('gulp-minify-css');
var config    = require('./config').optimize.css;

/**
 * Copy CSS files
 */
gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

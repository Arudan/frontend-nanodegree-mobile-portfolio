var gulp          = require('gulp');
var size          = require('gulp-size');
var minifyCss     = require('gulp-minify-css');
var autoprefixer  = require('gulp-autoprefixer');
var config        = require('./config');

/**
 * Copy CSS files
 */
gulp.task('optimize:css', function() {
  return gulp.src(config.optimize.css.src)
    .pipe(autoprefixer({browsers: config.autoprefixer.browsers}))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.optimize.css.dest))
    .pipe(size());
});

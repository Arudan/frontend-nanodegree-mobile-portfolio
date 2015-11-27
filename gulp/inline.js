var gulp    = require('gulp');
var inlinesource = require('gulp-inline-source');
var config  = require('./config').inline;

/**
 * Inline sources
 */
gulp.task('inline', function() {
  return gulp.src(config.src)
    .pipe(inlinesource())
    .pipe(gulp.dest(config.dest));
});

var gulp    = require('gulp');
var htmlmin = require('gulp-htmlmin');
var inlineCss = require('gulp-inline-css');
var config  = require('./config').optimize.html;
var inlineConfig = require('./config').inlinecss;

/**
 * Minimize HTML
 */
gulp.task('optimize:html', function() {
  return gulp.src(config.src)
    .pipe(htmlmin(config.options))
    .pipe(gulp.dest(config.dest));
});

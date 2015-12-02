var gulp   = require('gulp');
var config = require('./config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch:prod', ['browsersync:prod'], function() {
  gulp.watch(config.css,    ['optimize:css']);
  gulp.watch(config.js, ['optimize:js']);
  gulp.watch(config.images,  ['optimize:images']);
});

gulp.task('watch:dev', ['browsersync:dev'], function() {
  gulp.watch(config.css,    ['optimize:css']);
  gulp.watch(config.js, ['optimize:js']);
  gulp.watch(config.images,  ['optimize:images']);
});

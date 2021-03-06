var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build', function(callback) {
  runSequence(
    'delete',
    'optimize:css',
    'optimize:js',
    'optimize:images',
    'optimize:html',
    'inline',
    callback
  );
});

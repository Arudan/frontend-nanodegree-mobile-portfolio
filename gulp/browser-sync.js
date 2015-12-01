var gulp        = require('gulp');
var browsersync = require('browser-sync');
var config      = require('./config').browsersync;

/**
 * Start a server and watch changes with BrowserSync
 */
gulp.task('browsersync:prod', ['build'], function() {
  browsersync(config.production);
});

gulp.task('browsersync:dev', function(){
  browsersync(config.dev);
});

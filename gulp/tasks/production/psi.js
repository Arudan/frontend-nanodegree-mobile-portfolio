var gulp = require('gulp'),
  ngrok = require('ngrok'),
  psi = require('psi'),
  sequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  baseDir = require('../../config').production,
  site = '',
  portVal = 3020;

gulp.task('browser-sync-psi', ['build'], function() {
  browserSync({
    port: portVal,
    open: false,
    server: {
      baseDir: ''
    }
  });
});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(portVal, function(err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('desktop', function() {
  return psi(site, {
    nokey: 'true',
    // key: key,
    strategy: 'desktop',
  }).then(function(data) {
    console.log('DESKTOP - Speed score: ' + data.ruleGroups.SPEED.score);
  });
});

gulp.task('mobile', function() {
  return psi(site, {
    // key: key
    nokey: 'true',
    strategy: 'mobile',
  }).then(function(data) {
    console.log('MOBILE - Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('MOBILE - Usability score: ' + data.ruleGroups.USABILITY.score);
  });
});

gulp.task('psi-seq', function(cb) {
  return sequence(
    'browser-sync-psi',
    'ngrok-url',
    'desktop',
    'mobile',
    cb
  );
});

gulp.task('psi', ['psi-seq'], function() {
  process.exit();
});

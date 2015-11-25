/* globals require, process */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    ngrok = require('ngrok'),
    psi = require('psi'),
    sequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    site = '',
    portVal = 3020;

gulp.task('browser-sync-psi', function() {
  browserSync({
    port: portVal,
    open: false,
    server: {
      baseDir: ''
    }
  });
});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(portVal, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('desktop', function () {
    return psi(site, {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

gulp.task('mobile', function () {
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('psi-seq', function (cb) {
  return sequence(
    'browser-sync-psi',
    'ngrok-url',
    'desktop',
    'mobile',
    cb
  );
});

gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!');
  process.exit();
});

gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: false, interlaced: false })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('serve', ['sass'], function() {
    browserSync({
      port: portVal,
      server: {
        baseDir: ''
      }
    });
    //gulp.watch("app/scss/*.scss", ['sass']);
    //gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('ngrok-serve', function(cb){
  return sequence(
    'serve',
    'ngrok-url',
    cb
  );
});

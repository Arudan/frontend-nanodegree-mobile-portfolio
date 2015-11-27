// Gulp structure built following the Stefan Imhoff tutorial
// http://stefanimhoff.de/2014/gulp-tutorial-1-intro-setup/
// https://github.com/kogakure/gulp-tutorial

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp', { recurse: true });

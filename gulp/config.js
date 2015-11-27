var src               = 'src';
var build             = 'build';
var srcAssets         = 'src/assets';
var buildAssets       = 'build/assets';

module.exports = {
  browsersync: {
    production: {
      notify: false,
      server: {
        baseDir: [build]
      },
      port: 9998
    },
    psi: {
      port: 3020,
      open: false,
      notify: false,
      server: {
        baseDir: [build]
      }
    }
  },
  delete: {
    src: [build]
  },
  optimize: {
    css: {
      src:  srcAssets + '/css/*.css',
      dest: buildAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src:  srcAssets + '/js/*.js',
      dest: buildAssets + '/js/',
      options: {}
    },
    images: {
      src:  srcAssets + '/images/**/*.{jpg,jpeg,png,gif}',
      dest: buildAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    },
    html: {
      src: src + '/*.html',
      dest: build,
      options: {
        collapseWhitespace: true
      }
    }
  },
  inline: {
    src: build + '/index.html',
    dest: build,
    options: {}
  }
};

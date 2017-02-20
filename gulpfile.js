var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var del         = require('del');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var streamify   = require('gulp-streamify');
var server      = require('gulp-server-livereload');

/**
 * Paths
 */
var assets = [
  'src/img/*', 
  'src/fonts/*',
  'src/js/vendor/*',
  'src/index.html'
];

var paths = {
  npm: 'node_modules/',
  dist: 'dist/',
  css: {
    base: 'src/css/',
    vendor: 'src/css/vendor/',
    dist: 'dist/css/'
  },
  js: {
    base: 'src/js/',
    react: 'src/js/react/',
    vendor: 'src/js/vendor/',
    dist: 'dist/js/'
  },
  staticFiles: {
    images: 'src/img/',
    fonts: 'src/fonts/',
    index: 'src/index.html'
  }
}

var appJs = {
  source: 'app-react.jsx',
  name: 'app.js'
}

var vendorJs = [
  paths.npm + 'jquery/dist/jquery.js',
  paths.npm + 'foundation-sites/dist/foundation.js',
  paths.npm + 'fastclick/lib/fastclick.js'
];

var dependencies = [
    'react',
    'react-dom',
    'alt'
];

gulp.task('default', ['build', 'watch', 'browserify-watch', 'webserver']);
gulp.task('build', ['clean'], function(){
  gulp.start(
    'sass',
    'js-vendor',
    'browserify',
    'copy-assets'
  );
});


gulp.task('watch', function(){
  gulp.watch(paths.css.base + '**/*', ['sass']);
  gulp.watch(paths.js.base + '**/*', ['browserify-watch']);
  gulp.watch(paths.staticFiles.index, ['copy-assets']);
  gulp.watch(paths.staticFiles.fonts + '**/*', ['copy-assets']);
  gulp.watch(paths.staticFiles.images + '**/*', ['copy-assets']);
});


gulp.task('webserver', function(){
  gulp.src('dist/')
    .pipe(server({
      livereload: true,
      open: true,
      port: 8989
    }));
});


gulp.task('sass', function(){
  return sass(paths.css.base + 'main.scss', { style: 'compressed', sourcemap: true })
    .on('error', sass.logError)
    .pipe(rename('styles.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.css.dist));
});


gulp.task('js-vendor', function(){
  return gulp.src(vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dist));
});


/**
 * Bundle dependencies and app files together into a single app.min.js file
 */
gulp.task('browserify', function(){
  return browserify(paths.js.react + appJs.source)
    // .external(dependencies)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source(appJs.name))
    .pipe(streamify(uglify({ mangle: false })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dist))
});


/**
 * Bundle all the dependecies together
 */
gulp.task('browserify-vendor', function(){
  return browserify(paths.js.react + appJs.source)
    .require(dependencies)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('vendor.app.js'))
    .pipe(streamify(uglify({ mangle: false })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dist))
});


gulp.task('browserify-watch', ['browserify-vendor'], function(){
  var bundler = watchify(browserify(paths.js.react + appJs.source));
  // bundler.external(dependencies);
  bundler.transform(babelify, {presets: ['es2015', 'react']});
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle(){
    return bundler.bundle()
      .on('error', function(err) {
        console.log(err);
      })
      .on('end', function(){
        console.log('Finished rebundling');
      })
      .pipe(source(appJs.name))
      .pipe(rename({ suffix: '.min' }))
      .pipe(streamify(uglify({ mangle: false })))
      .pipe(gulp.dest(paths.js.dist));
  }
});


gulp.task('copy-assets', function(){
  return gulp.src(assets, { base: './src/'})
    .pipe(gulp.dest(paths.dist));
});


/**
 * Utility Functions
 */

gulp.task('clean', function(cb) {
    return del(['dist'], cb)
});

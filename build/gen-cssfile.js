const gulp = require('gulp');
const less = require('gulp-less');
const cssMin = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-px3rem');
const cssBase64 = require('gulp-css-base64');
// const cleanCSS = require('gulp-clean-css');
// const del = require('del');

const px2remOpts = {
  remUnit: 100,
  remPrecision: 5,
  minPixelValue: 2
}

const paths = {
  baseStyle: {
    src: './../src/styles/common/base.less',
    dest: './../lib/theme'
  },
  compsStyle: {
    src: './../src/styles/index.less',
    dest: './../lib/theme'
  },
}

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['assets']);
}

/**
 * 打包基础样式
 */
function geneBaseStyle() {
  return gulp.src(paths.baseStyle.src)
    .pipe(less())
    .pipe(rename({
      basename: 'base',
    }))
    .pipe(cssMin())
    .pipe(gulp.dest(paths.baseStyle.dest))
}


/**
 * 打包组件样式
 */
function geneCompsStyle() {
  return gulp.src(paths.compsStyle.src)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(px2rem(px2remOpts))
    // .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(cssBase64({
      baseDir: './../src/assets/',
      maxWeightResource: 20480,
      extensionsAllowed: ['.png', '.jpg', '.jpeg']
    }))
    .pipe(rename({
      basename: 'index'
    }))
    .pipe(cssMin())
    .pipe(gulp.dest(paths.compsStyle.dest));
}

function watch() {
  gulp.watch(paths.baseStyle.src, geneBaseStyle);
  gulp.watch(paths.compsStyle.src, geneCompsStyle);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.series(gulp.parallel(geneBaseStyle, geneCompsStyle));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
// exports.clean = clean;
exports.styles = geneCompsStyle;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
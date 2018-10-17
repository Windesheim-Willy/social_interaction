'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    css: 'public/css/',
    scss: 'public/scss/'
};

/**
 * Compile the scss code to css.
 *
 * @returns {*}
 */
function buildStyle() {
    return gulp.src(paths.scss + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.css));
}

/**
 * Watch if a file changes.
 *
 * @returns {*}
 */
function watch() {
  return gulp.watch(paths.scss + '**/*.scss', buildStyle);
}

exports.buildStyle = buildStyle;
exports.watch = watch;

// Define the gulp tasks.
gulp.task('build', buildStyle);
gulp.task('watch', watch);
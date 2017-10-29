var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

function bundleJavascriptsInDevMode() {
    console.log('Bundling JS files in development mode');
    gulp.src([
        'assets/js/jquery-3.2.1.js',
        'assets/js/angular-1.6.js',
        'assets/**/*.js'
    ])
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./dist/'))
}

function bundleJavascriptsInProdMode() {
    console.log('Bundling JS files in development mode');
    gulp.src([
        'assets/js/jquery-3.2.1.js',
        'assets/js/angular-1.6.js',
        'assets/js/select2.full.js',
        'assets/**/*.js'
    ])
        .pipe(concat('application.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
}

module.exports = {
  development: bundleJavascriptsInDevMode,
  production: bundleJavascriptsInProdMode
};
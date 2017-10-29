var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var sourcemaps = require('gulp-sourcemaps');

var sass_options = {
    development: {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    production: {
        errLogToConsole: true,
        outputStyle: 'compressed'
    },
    documentation: {
        dest: 'docs/sass',
        verbose: true,
        display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true
        },
        groups: {
            'undefined': 'Other styles',
            theme: 'Theme styles',
            mixins: 'Mixins'
        },
        basePath: '/assets/sass'
    }
};

function generateStylesDocumentation() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sassdoc(sass_options.documentation));
}

function compileInProdEnvironment() {

    console.log('Compiling styles in production mode...');

    gulp.src('assets/sass/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sass_options.production).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));

}

function compileInDevEnvironment() {

    console.log('Compiling styles in development mode...');

    gulp.src('assets/sass/styles.scss')
        .pipe(sass(sass_options.development).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));

}

module.exports = {
    development: compileInDevEnvironment,
    production: compileInProdEnvironment,
    documentation: generateStylesDocumentation
};
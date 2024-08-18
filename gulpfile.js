const gulp = require('gulp')
const path = require('path')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const postCssModules = require('postcss-modules')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')
const fs = require('fs');

const config = require('./config')
const modules = require('./src/js/modules')
const resourceManager = require('./src/js/resource-manager')

gulp.task('styles', () => {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('copyJs', function() {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.js'))
            .pipe(gulp.dest(config.paths.outputDir))
})


gulp.task('compile-pugs', function() {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.pug'))
        .pipe(pug({
            pretty: true,
            locals: {
                getResource: resourceManager.getResource,
                modules: modules.getModules()
            }
        }))
        .pipe(gulp.dest(config.paths.outputDir))
})


gulp.task('watch', function() {
    gulp.watch(path.join(config.paths.moduleDir, '**/*.pug'), gulp.series('compile-pugs', 'start'))
    gulp.watch(path.join(config.paths.moduleDir, '/**/*.scss'), gulp.series('styles', 'start'))
    gulp.watch(path.join(config.paths.moduleDir, '**/*.js'), gulp.series('copyJs', 'start'))
})

gulp.task('start', function (done) {
    nodemon({
        script: 'app.js',
        ext: 'js html css',
        env: { 'NODE_ENV': 'development' }
  , done: done
  })
    done()
})

gulp.task('build', function(done) {
    return gulp.series('compile-pugs', 'styles', 'copyJs', 'start', 'watch')(done)
})


const gulp = require('gulp')
const path = require('path')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const nodemon = require('gulp-nodemon')
const fs = require('fs');

const config = require('./config')
const modules = require('./src/js/modules')
const resourceManager = require('./src/js/resource-manager')
const cardManager = require('./src/js/card-manager')

gulp.task('styles', () => {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('copyJs', function() {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.js'))
            .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('copyAssets', () =>{
    return gulp.src(path.join(config.paths.srcDir, config.paths.assetsDir, '**/*.*'))
        .pipe(gulp.dest(path.join(config.paths.outputDir, config.paths.assetsDir)))
})

gulp.task('compilePugs', function() {
    return gulp.src(path.join(config.paths.moduleDir, '/**/*.pug'))
        .pipe(pug({
            pretty: true,
            locals: {
                getResource: resourceManager.getResource,
                getAsset: resourceManager.getAsset,
                modules: modules.getModules(),
                bigCards: cardManager.getBigCards(),
                smallCards: cardManager.getSmallCards(),
            }
        }))
        .pipe(gulp.dest(config.paths.outputDir))
})


gulp.task('watch', function() {
    gulp.watch(path.join(config.paths.moduleDir, '**/*.pug'), gulp.series('compilePugs'))
    gulp.watch(path.join(config.paths.moduleDir, '/**/*.scss'), gulp.series('styles'))
    gulp.watch(path.join(config.paths.moduleDir, '**/*.js'), gulp.series('copyJs'))
    gulp.watch(path.join(config.paths.srcDir, config.paths.assetsDir, '**/*.*'), gulp.series('copyAssets'))
    gulp.watch(['*.js', path.join(config.paths.srcDir, 'js', '*.js')], gulp.series('start'))
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
    return gulp.series('compilePugs', 'styles', 'copyJs', 'copyAssets', 'start', 'watch')(done)
})


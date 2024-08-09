const gulp = require('gulp')
const path = require('path')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const postCssModules = require('postcss-modules')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')

const config = require('./config')
const modules = require('./src/js/modules')
const resourceManager = require('./src/js/resource-manager')


function compileModule(module) {
    let cssExportMap = {}
    let src = path.join(config.paths.moduleDir, module.directory)
    let dest = path.join(config.paths.outputDir, module.directory)
    if (module.isHome) {
        dest = config.paths.outputDir
    }

    // CSS Modules options
    const cssModulesOptions = {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        getJSON: function(cssFileName, json) {
            // Save the mapping of original to scoped class names
            cssExportMap = json
        }
    }


    gulp.task('compilePug', () => {
        console.log(cssExportMap)
 
        return gulp.src(path.join(src, module.template))
            .pipe(pug({
                pretty: true,
                locals: {
                    styles: cssExportMap,
                    getResource: resourceManager.getResource,
                }
            }))
            .pipe(gulp.dest(dest))
    })

    // Compile SCSS, add dynamic prefix, and concatenate into single CSS file
    gulp.task('styles', () => {
        console.log(path.join(src, module.style))
        return gulp.src(path.join(src, module.style))
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([
                postCssModules(cssModulesOptions)
            ]))
            //.pipe(concat('style.css'))
            .pipe(gulp.dest(dest))
    })

    return gulp.series('styles', 'compilePug')
}

gulp.task('mainStyle', () => {
    return gulp.src(path.join(config.paths.srcDir, 'modules', 'main.scss'))
        .pipe(sass().on('error', sass.logError))
        //.pipe(rename({ basename: 'style', extname: '.css'}))
        //.pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('copyJs', function() {
    return gulp.src(path.join(config.paths.moduleDir, '//**/*.js'))
            .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('build', (done) => {
    const tasks = modules.getModules().map(module => compileModule(module))
    gulp.series('copyJs', 'mainStyle', ...tasks)(done)
})

gulp.task('watch', function() {
    gulp.watch(config.paths.srcDir, gulp.series('build'))
})


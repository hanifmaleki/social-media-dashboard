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
        return gulp.src(path.join(src, module.template))
            .pipe(pug({
                pretty: true,
                locals: {
                    styles: cssExportMap,
                    getResource: resourceManager.getResource,
                    modules: modules.getModules()
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

tempScssPath = path.join(config.paths.moduleDir, 'temp', 'style.scss')

// Task to create the temporary SCSS file with imports
gulp.task('create-temp-scss', function (done) {
    // Ensure the temp directory exists
    if (!fs.existsSync(path.dirname(tempScssPath))) {
        fs.mkdirSync(path.dirname(tempScssPath), { recursive: true });
    }

    // Write the @import statements to the temporary SCSS file
    var scssContent = modules.getModules().map(module => `@import "../${module.directory}/${module.style}";`).join('\n')
    scssContent += `\n@import "../main.scss";\n`
    fs.writeFileSync(tempScssPath, scssContent)

    done();
});

// Task to compile the temporary SCSS file using Sass
gulp.task('compile-scss', function () {
    console.log(tempScssPath)
    return gulp.src(tempScssPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.outputDir));
});

// Task to clean up the temporary SCSS file
gulp.task('clean-temp', function (done) {
    if (fs.existsSync(tempScssPath)) {
        fs.rmSync(tempScssPath)
    }

    if (fs.existsSync(path.dirname(tempScssPath))) {
        fs.rmdirSync(path.dirname(tempScssPath))
    }

    done()
});

gulp.task('process-styles', function(done){
    return gulp.series('create-temp-scss', 'compile-scss', 'clean-temp')(done)
})

gulp.task('compile-all-pugs', function() {
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
    gulp.watch(path.join(config.paths.moduleDir, '**/*.pug'), gulp.series('compile-all-pugs', 'start'))
    gulp.watch(path.join(config.paths.moduleDir, '/**/*.scss'), gulp.series('process-styles', 'start'))
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

gulp.task('build-all', function(done) {
    return gulp.series('compile-all-pugs', 'process-styles', 'copyJs', 'start', 'watch')(done)
})

// from course
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    })
    cb()
}
function browserSyncReload(cb) {
    browsersync.reload()
    cb
}

function watchTask() {
    watch('*.html', browserSyncReload)
    watch(
        ['src/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    )
}

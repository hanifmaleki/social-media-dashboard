const path = require('path')

const srcDir = path.join(__dirname, 'src')
const outputDir = path.join(__dirname, 'dist')
const moduleDirName = 'modules'
const assetsDir = 'assets'

module.exports = {
    paths: {
        srcDir: path.join(__dirname, 'src'),
        outputDir: path.join(__dirname, 'dist'),
        moduleDir: path.join(srcDir, moduleDirName),
        assetsDir: assetsDir,
    },
    server: {
        port: process.env.PORT || 3000,
        static: outputDir,
    }
}

const path = require('path')

const srcDir = path.join(__dirname, 'src')
const outputDir = path.join(__dirname, 'dist')
const moduleDirName = 'modules'

module.exports = {
    paths: {
        srcDir: path.join(__dirname, 'src'),
        outputDir: path.join(__dirname, 'dest'),
        moduleDir: path.join(srcDir, moduleDirName),
    },
    server: {
        port: process.env.PORT || 3000,
        static: outputDir,
    }
}

const path = require('path')
const config =  require('../../config')

function getAsset(assetPath) {
    return path.join('/assets', assetPath)
}

function getResource(resourcePath) {
    return path.join('/', resourcePath)
}

function getAsset(assetName) {
    return path.join(config.paths.assetsDir, assetName)
}

module.exports = {getAsset, getResource}

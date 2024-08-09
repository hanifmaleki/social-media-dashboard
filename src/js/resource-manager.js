const path = require('path')

function getAsset(assetPath) {
    return path.join('/assets', assetPath)
}

function getResource(resourcePath) {
    return path.join('/', resourcePath)
}

function getMainStyle() {
    return '/style.css'
}

module.exports = {getAsset, getMainStyle, getResource}

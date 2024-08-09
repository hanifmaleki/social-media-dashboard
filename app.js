const express = require('express')
const path = require('path')
const config = require('./config.js')

const app = express()

app.use(express.static(config.paths.outputDir))

app.listen(config.server.port)

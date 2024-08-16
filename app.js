const express = require('express')
const path = require('path')
const config = require('./config.js')

const app = express()

app.use(express.static(config.paths.outputDir))

app.get('*', (req, res) =>{
    res.sendFile(path.join(config.paths.outputDir, 'index.html'))
}) 

app.listen(config.server.port)

const express = require('express')
const path = require('path')
const config = require('./config.js')

const app = express()

app.use(express.static(config.paths.outputDir))

app.get('*.html', (req, res) =>{
    console.log(req.baseUrl)
    console.log(req.path)
    console.log('')
    if (req.url.endsWith('.html')) {
        res.sendFile(path.join(config.paths.outputDir, 'index.html'))
    }
}) 

app.listen(config.server.port)

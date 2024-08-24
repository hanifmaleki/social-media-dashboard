const express = require('express')
const path = require('path')
const config = require('./config.js')

const app = express()

app.use(express.static(config.paths.outputDir))

app.get('*', (req, res, next) =>{
    process.stdout.write(req.url + ' ')

    if (req.url.endsWith('.css') || req.url.endsWith('.js')) {
        next()
        return
    } else {
        if (req.url.endsWith('.html')) {
            res.sendFile(path.join(config.paths.outputDir, 'index.html'))
        } 
    }
}) 

app.listen(config.server.port)

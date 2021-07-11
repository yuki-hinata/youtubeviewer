const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()

const server = app.listen(3000, function(){
    console.log(`Node.js is listening to PORT: ${server.address().port}`)
})

app.use('/api', require('./api'))

router.use(express.static('public'))

router.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use('/', router)
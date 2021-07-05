const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()

const server = aoo.listen(3000, function(){
    console.log(`Node.js is listening to PORT: ${server.address().port}`)
})

router.use(express.static('public'))

router.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use('/', router)
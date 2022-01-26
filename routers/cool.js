const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/cool', (req, res) => {
    const dir = path.join(__dirname,"../templates/cool.html")
    res.sendFile(dir)
})

module.exports = router
const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/about', (req, res) => {
    const dir = path.join(__dirname,"../templates/about.html")
    res.sendFile(dir)
})

module.exports = router
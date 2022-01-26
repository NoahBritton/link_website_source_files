const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/thesecretpage', (req, res) => {
    const dir = path.join(__dirname,"../templates/game.html")
    res.sendFile(dir)
})

module.exports = router
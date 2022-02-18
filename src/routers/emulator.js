const express = require('express')
const router = express.Router()

router.get('/emulator', (req, res) => {
    res.render('emulator')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/cool', (req, res) => {
    res.render('cool')
})

module.exports = router
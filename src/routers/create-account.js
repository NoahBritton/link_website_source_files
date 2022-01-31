const express = require('express')
const router = express.Router()

router.get('/create-account', (req, res) => {
    res.render('create-account')
})

module.exports = router
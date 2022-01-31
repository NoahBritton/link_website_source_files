const express = require('express')
const router = express.Router()

router.get('/thesecretpage', (req, res) => {
    res.render('game')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {

    const token = req.query.token

    if (token === 'abc123') {
        res.render('main', { token: token })
    }
    else {
        res.render('login')
    }
})

module.exports = router
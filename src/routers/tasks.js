const express = require('express')
const router = express.Router()

router.get('/tasks', (req, res) => {
    res.render('tasks')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/drag-drop', (req, res) => {
    res.render('dragDrop')
})

module.exports = router
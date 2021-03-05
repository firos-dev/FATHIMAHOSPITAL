const express = require('express')

const router = new express.Router()

router.get('*', (req, res)=> {
    res.send('<h1>404 Not Found!</h1>')
})



module.exports = router
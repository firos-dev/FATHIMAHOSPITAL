const express = require('express')

const router = new express.Router()


router.get('/', (req, res)=> {
    res.render('index')
})
router.get('/treatment', (req, res) => {
    res.render('treatment')
})
router.get('/medicines', (req, res) => {
    res.render('medicines')
})
router.get('/contact', (req, res) => {
    res.render('contact')
})


module.exports = router
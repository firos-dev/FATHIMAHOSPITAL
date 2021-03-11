const express = require('express')
const Treatment = require('../model/treatment')

const router = new express.Router()


router.get('/', (req, res)=> {
    res.render('index')
})
router.get('/treatment', async(req, res) => {
    const treatment = await Treatment.find()
    res.render('treatment', {
        treatment: treatment
    })
})
router.get('/medicines', (req, res) => {
    res.render('medicines')
})
router.get('/contact', (req, res) => {
    res.render('contact')
})


module.exports = router
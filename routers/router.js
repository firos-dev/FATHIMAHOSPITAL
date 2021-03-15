const express = require('express')
const Treatment = require('../model/treatment')
const Medicine = require('../model/medicines')
const Contact = require('../model/contact')

const router = new express.Router()


router.get('/', (req, res)=> {
    res.render('index')
})
router.get('/treatment', async(req, res) => {
    const treatment = await Treatment.find().sort({index : 1})
    res.render('treatment', {
        treatment: treatment
    })
})
router.get('/medicines', async(req, res) => {
    const medicines = await Medicine.find().sort({index : 1})
    res.render('medicines', {
        medicines: medicines,
        msgSuccess: req.query.msgSuccess
    })
})
router.get('/contact', (req, res) => {
    res.render('contact', {
        msgSuccess: req.query.msgSuccess
    })
})

router.get('/branches', async (req, res) => {
    res.render('branches')
})

//POST Router

router.post('/new/enquiry', async (req, res) => {
    const contact = new Contact({
        ...req.body
    })

    try {
        contact.save()
        res.redirect('/contact?msgSuccess=Message send!')
    } catch (e) {
        console.log(e);
        res.redirect('/contact')
    }
})

module.exports = router
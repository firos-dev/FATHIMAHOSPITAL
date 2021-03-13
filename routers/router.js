const express = require('express')
const Treatment = require('../model/treatment')
const Medicine = require('../model/medicines')
const Enquery = require('../model/enquery')

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
        medicines: medicines
    })
})
router.get('/contact', (req, res) => {
    res.render('contact')
})


//POST Router

router.post('/new/enquiry', async (req, res) => {
    const enquery = new Enquery({
        ...req.body
    })

    try {
        enquery.save()
        res.redirect('/contact')
    } catch (e) {
        console.log(e);
        res.redirect('/contact')
    }
})

module.exports = router
const express = require('express')
const multer = require('multer')
const Account = require('../../model/account')
const Treatment = require('../../model/treatment')
const auth = require('../../middleware/auth')
const { update } = require('../../model/account')
const Medicene = require('../../model/medicines')
const router = new express.Router()

//Treatment Images

const tmtImg1Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'treatmentimage1.png')
    }
})

const tmtimg1 = multer({
    storage: tmtImg1Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/treatment/image1/:id/:name',tmtimg1.single('image1'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image1'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const treatment = await Treatment.findById(req.params.id)
        treatment['image1'] = req.file.filename 
        treatment.save()
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgErr='+ e.message)
    }

})


const tmtImg2Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'treatmentimage2.png')
    }
})

const tmtimg2 = multer({
    storage: tmtImg2Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/treatment/image2/:id/:name',tmtimg2.single('image2'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image2'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const treatment = await Treatment.findById(req.params.id)
        treatment['image2'] = req.file.filename 
        treatment.save()
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgErr='+ e.message)
    }

})

const tmtImg3Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'treatmentimage3.png')
    }
})

const tmtimg3 = multer({
    storage: tmtImg3Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/treatment/image3/:id/:name',tmtimg3.single('image3'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image3'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const treatment = await Treatment.findById(req.params.id)
        treatment['image3'] = req.file.filename 
        treatment.save()
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/treatment/images/'+req.params.id+'?msgErr='+ e.message)
    }

})

//Medicines Images

const medImg1Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'medicineimage1.png')
    }
})

const medImg1 = multer({
    storage: medImg1Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/medicine/image1/:id/:name',medImg1.single('image1'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image1'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const medicine = await Medicene.findById(req.params.id)
        medicine['image1'] = req.file.filename 
        medicine.save()
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgErr='+ e.message)
    }

})

const medImg2Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'medicineimage2.png')
    }
})

const medImg2 = multer({
    storage: medImg2Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/medicine/image2/:id/:name',medImg2.single('image2'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image2'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const medicine = await Medicene.findById(req.params.id)
        medicine['image2'] = req.file.filename 
        medicine.save()
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgErr='+ e.message)
    }

})

const medImg3Storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        cb(null, req.params.name+'medicineimage3.png')
    }
})

const medImg3 = multer({
    storage: medImg3Storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/edit/medicine/image3/:id/:name',medImg3.single('image3'), async (req, res) => {
    const updates = req.file.fieldname
    const isValidUpdate = updates === 'image3'

    if (!isValidUpdate) {
        res.status(400).send('invalid operation!')
    }


    try {
        const medicine = await Medicene.findById(req.params.id)
        medicine['image3'] = req.file.filename 
        medicine.save()
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgSuccess=Image changed successfully!')
    } catch (e) {
        res.redirect('/edit/medicine/images/'+req.params.id+'?msgErr='+ e.message)
    }

})

module.exports = router
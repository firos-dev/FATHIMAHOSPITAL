const express = require('express')
const multer = require('multer')
const Account = require('../../model/account')
const Treatment = require('../../model/treatment')
const auth = require('../../middleware/auth')
const { update } = require('../../model/account')
const Medicene = require('../../model/medicines')
const router = new express.Router()


router.get('/test', async (req, res) => {
    res.render('dashboard/treatment')
})

router.get('/dashboard/signin', (req, res) => {
    if (req.query.msg) {
        res.render('dashboard/dashboard', {
        msg: req.query.msg
        })
    }
    res.render('dashboard/dashboard')
    
})

router.get('/dashboard/home', (req, res) => {
    res.render('dashboard/home')
})

router.get('/view/treatment', async(req, res) => {
    const treatment = await Treatment.find().sort({index : 1})
    res.render('dashboard/viewTreatment', {
        treatment: treatment,
        msgSuccess: req.query.msgSuccess,
        msgErr: req.query.msgErr
    })
})
router.get('/view/medicines', async(req, res) => {
    const medicines = await Medicene.find().sort({index : 1})
    res.render('dashboard/viewMedicines', {
        medicines: medicines,
        msgSuccess: req.query.msgSuccess,
        msgErr: req.query.msgErr
    })
})


router.get('/create/treatment', (req, res) => {
    res.render('dashboard/createTreatment', {
        msgErr: req.query.msgErr
    })
})

router.get('/create/medicines', (req, res) => {
    res.render('dashboard/createMedicines', {
        msgErr: req.query.msgErr
    })
})

router.get('/edit/treatment/:id', async(req, res) => {
    if (req.params.id) {
        try {
            const treatment = await Treatment.findById(req.params.id)
            res.render('dashboard/editTreatment', {
                tmt: treatment,
                errMsg: req.query.errMsg,
                msgSuccess: req.query.msgSuccess
            })
        } catch (e) {
            res.send(e)
        }
        
    } else {
        res.redirect('/dashboard/login')
    }
})

router.get('/edit/medicine/:id', async(req, res) => {
    if (req.params.id) {
        try {
            const medicine = await Medicene.findById(req.params.id)
            res.render('dashboard/editMedicine', {
                med: medicine,
                errMsg: req.query.errMsg,
                msgSuccess: req.query.msgSuccess
            })
        } catch (e) {
            res.send(e)
        }
        
    } else {
        res.redirect('/dashboard/login')
    }
})


router.get('/edit/treatment/images/:id', async (req, res) => {
    const images = await Treatment.findOne({_id : req.params.id}, { image1: 1, image2: 1, image3: 1, name: 1 })
    res.render('dashboard/treatmentImages', {
        img: images,
        msgErr: req.query.msgErr,
        msgSuccess: req.query.msgSuccess
    })
})

router.get('/edit/medicine/images/:id', async (req, res) => {
    const images = await Medicene.findOne({_id : req.params.id}, { image1: 1, image2: 1, image3: 1, name: 1 })
    res.render('dashboard/medicineImages', {
        img: images,
        msgErr: req.query.msgErr,
        msgSuccess: req.query.msgSuccess
    })
})



// POST ROUTES


router.post('/account/key', async (req, res) => {
    const account = new Account({
        ...req.body
    })
    try {
        await account.save()
        res.status(200).send('Success !  '+token)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/dashboard/signin', async (req, res) => {
    try {
        const account = await Account.verifyUser(req.body.privateKey)
        req.session.loggedIn = account
        res.status(200).redirect('/dashboard/home')
    } catch (e) {
        console.log(e);
        res.status(400).redirect(`/dashboard/signin?msg=${e}`)
    }
    
})

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        let name
        switch (file.fieldname) {
            case 'image1':
                name = req.body.name+'treatmentimage1.png'
                break
            case 'image2':
                name = req.body.name+'treatmentimage2.png'
                break
            case 'image3':
                name = req.body.name+'treatmentimage3.png'
                break
        }
        cb(null, name)

    }
})

const tmtimg = multer({
    storage: storage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
const uploadImg = tmtimg.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }])

router.post('/create/treatment', uploadImg, async (req, res) => {
    const treatment = new Treatment({
        ...req.body,
        image1: req.files.image1[0].filename,
        image2: req.files.image2[0].filename,
        image3: req.files.image3[0].filename
    })
    try {
        await treatment.save()
        res.redirect('/view/treatment?msgSuccess=Treatment created successfully!')
    } catch (err) {
        console.log(err);
        res.redirect('/create/treatment?msgErr=' + err.message)
    }
})

const medStorage = multer.diskStorage({
    destination: 'public/uploads',
    filename(req, file, cb) {
        let name
        switch (file.fieldname) {
            case 'image1':
                name = req.body.name+'medicineimage1.png'
                break
            case 'image2':
                name = req.body.name+'medicineimage2.png'
                break
            case 'image3':
                name = req.body.name+'medicineimage3.png'
                break
        }
        cb(null, name)

    }
})

const medimg = multer({
    storage: medStorage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
const uploadMedImg = medimg.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }])

router.post('/create/medicines', uploadMedImg, async (req, res) => {
    const medicene = new Medicene({
        ...req.body,
        image1: req.files.image1[0].filename,
        image2: req.files.image2[0].filename,
        image3: req.files.image3[0].filename
    })
    try {
        await medicene.save()
        res.redirect('/view/medicines?msgSuccess=Treatment created successfully!')
    } catch (err) {
        console.log(err);
        res.redirect('/create/medicines?msgErr='+ err.message)
    }
})

router.post('/edit/treatment/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'index', 'pkgName', 'pkgDays', 'pkgDescription', 'pkgNote']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        throw new Error('invalid updates')
    }

    try {
        const treatment = await Treatment.findById(req.params.id)
        updates.forEach((update) => treatment[update] = req.body[update])
        treatment.save()
        res.redirect('/view/treatment?msgSuccess=Treatment updated successfully!')
    } catch (e) {
        res.redirect('/view/treatment?msgErr=' + e.message)
    }
    
})
router.post('/edit/medicine/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'index']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        throw new Error('invalid updates')
    }

    try {
        const medicine = await Medicene.findById(req.params.id)
        updates.forEach((update) => medicine[update] = req.body[update])
        medicine.save()
        res.redirect('/view/medicines?msgSuccess=Medicine updated successfully!')
    } catch (e) {
        res.redirect('/view/medicines?msgErr=' + e.message)
    }
    
})

router.post('/delete/treatment', async (req, res) => {  
    try {
        const tmt = await Treatment.findOneAndDelete({ _id: req.body.id })
        if (!tmt) {
            res.send('No treatment')
        }
        res.redirect('/view/treatment?msgSuccess=Treatment deleted successfully!')
    } catch (e) {
       res.redirect('/view/treatment?msgErr='+e.message)
    }
})
router.post('/delete/medicine', async (req, res) => {  
    try {
        const med = await Medicene.findOneAndDelete({ _id: req.body.id })
        if (!med) {
            res.send('No Medicine')
        }
        res.redirect('/view/medicines?msgSuccess=Medicine deleted successfully!')
    } catch (e) {
       res.redirect('/view/medicines?msgErr='+e.message)
    }
})


module.exports = router
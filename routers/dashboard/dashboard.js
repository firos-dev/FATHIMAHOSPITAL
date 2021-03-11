const express = require('express')
const multer = require('multer')
const Account = require('../../model/account')
const Treatment = require('../../model/treatment')
const auth = require('../../middleware/auth')
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
    const treatment = await Treatment.find()
    res.render('dashboard/viewTreatment', {
        treatment: treatment,
        msgSuccess: req.query.msgSuccess
    })
})

router.get('/create/treatment', (req, res) => {
    res.render('dashboard/createTreatment', {
        msgErr: req.query.msgErr
    })
})

router.get('/create/medicines', (req, res) => {
    res.render('dashboard/createMedicines')
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
    } catch(err) {
        res.redirect('/create/treatment?msgErr='+err)
    }
})  


module.exports = router
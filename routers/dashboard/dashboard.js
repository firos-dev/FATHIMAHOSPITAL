const express = require('express')
const Account = require('../../model/account')
const Treatment = require('../../model/treatment')
const router = new express.Router()


router.get('/test', async (req, res) => {
    res.render('dashboard/home')
})
router.get('/dashboard/signin', (req, res) => {
    res.render('dashboard/dashboard')
})
router.post('/account/key', async (req, res) => {
    const account = new Account({
        ...req.body
    })
    console.log(account);
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
        res.status(200).render('dashboard/dashboard', {
            msg: true
        })
    } catch (e) {
        res.status(400).render('dashboard/dashboard', {
            msg: false
        })
    }
    
})
router.post('/treatment', async (req, res) => {
    console.log(req.body);
    const treatment = new Treatment({
        ...req.body
    })
    console.log(treatment);
    try {
        await treatment.save()
        res.send('Success')
    } catch(err) {
        res.send(err)
    }
})

module.exports = router
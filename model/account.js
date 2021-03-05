const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const accountSchema = new mongoose.Schema({
    privateKey: {
        type: String,
        required: true,
        minlength:6
    }
}, {
    timestamps: true
})


// Hash the privateKey before saving
accountSchema.pre('save', async function(next){
    const account = this

    account.isModified('privateKey')
    account.privateKey = await bcrypt.hash(account.privateKey, 8)

    next()
})

accountSchema.statics.verifyUser = async (privateKey) => {
    const account = await Account.findOne()

    const isMatch = await bcrypt.compare(privateKey, account.privateKey)
    if (!isMatch) {
        throw new Error('Incorrect private key!')
    }

    return account
}


const Account = mongoose.model('Account',accountSchema)

module.exports = Account
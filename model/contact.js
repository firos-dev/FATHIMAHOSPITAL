const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    mobile: {
        type: Number,
        trim: true,
        minlength:10
    },
    email: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
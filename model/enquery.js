const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
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

const Enquery = mongoose.model('Enquery', enquirySchema)

module.exports = Enquery
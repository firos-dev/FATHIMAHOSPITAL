const mongoose = require('mongoose')

const medScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    index: {
        type: Number,
        required: true,
        trim: true,
    }


})

const Medicene = mongoose.model('Medicine', medScheme)

module.exports = Medicene
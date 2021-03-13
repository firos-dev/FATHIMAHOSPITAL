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
        unique: true,
        required: true,
        trim: true, 
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

medScheme.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('This index is already assigned!'))
    } else {
        next(error)
    }
})


const Medicene = mongoose.model('Medicine', medScheme)


module.exports = Medicene
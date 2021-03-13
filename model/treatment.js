const mongoose = require('mongoose')
const treatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    index: {
        type: Number,
        unique:true,
        required: true,
        trim: true
    },
    pkgName: {
        type: String,
        trim:true
    },
    pkgDays: {
        type: Number,
        trim: true
    },
    pkgDescription: {
        type: String,
        trim: true  
    },
    pkgNote: {
        type: String,
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

treatmentSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('This index is already assigned!'))
    } else {
        next(error)
    }
})




const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
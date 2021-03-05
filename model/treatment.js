const mongoose = require('mongoose')
const treatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
        trim: true,
        
    },
    pkgName: {
        type: String,
        trim:true
    },
    pkgDays: {
        type: Number,
        trim: true
    },
    pkgDiscription: {
        type: String,
        trim: true  
    },
    pkgMsg: {
        type: String,
    },
    image1: {
        buffer: Boolean
    },
    image2: {
        buffer: Boolean
    },
    image3: {
        buffer: Boolean
    }
}, {
    timestamps: true
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
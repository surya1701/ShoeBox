const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
    shoe_ID: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Posts', shoesSchema);
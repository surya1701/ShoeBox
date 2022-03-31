const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Shoes', shoesSchema);
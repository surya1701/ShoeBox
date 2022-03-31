const mongoose = require('mongoose')

const coupounsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Coupouns', coupounsSchema);
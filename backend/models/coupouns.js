const mongoose = require('mongoose')

const coupounsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    expirey: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Coupouns', coupounsSchema);
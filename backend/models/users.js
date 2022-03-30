const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,

    },
    address: {
        type: Array,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Users', usersSchema);
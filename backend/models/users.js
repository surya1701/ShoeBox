const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    givenName: {
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
    liked: {
        type: Array,
        required: true,
        default: []
    },
    followed: {
        type: Array,
        required: true,
        default: []
    },
    orders: {
        type: Array,
        required: true,
        default: []
    },
    since: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', usersSchema);
const mongoose = require('mongoose')

const brandsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Followers:{
        type: Number,
        required: true
    },
    Posts:{
        type: Number,
        required: true
    },
    logo:{
        type: String,
        required: true
    },

})
module.exports = mongoose.model('Brands', brandsSchema);
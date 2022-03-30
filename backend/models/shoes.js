const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
    // {
    //     "id": 1,
    //     "name": "Wild Rider Layers Unisex Sneakers",
    //     "brand": "Puma",
    //     "image": [],
    //     "price": "19999",
    //     "size": [],
    //     "type": "Sneakers",
    //     "comments": [],
    //     "rating": "4.0",
    //     "gender": "Men",
    //     "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family. We've layered a rich mix of premium leather, suede and hairy suede onto a nylon upper to create texture and a raw edgy look that is pure street. The IMEVA midsole and rubber outsole ensure combined lightweight comfort and great traction to take you forward, further and faster through your day and beyond.",
    //     "views": 2,
    //     "date": "2022-01-02"
    //   }
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
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Shoes', shoesSchema);
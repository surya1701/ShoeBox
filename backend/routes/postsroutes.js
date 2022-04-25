let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
let Post = require('../models/posts');
router.post('/postForm', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
        shoe_ID: req.body.shoe_ID,
        caption: req.body.caption,
        brand: req.body.brand,
        image: url + '/public/' + req.file.filename
    });
    post.save().then(result => {
        res.status(201).json({
            message: "Post created successfully!",
            postCreated: {
                shoe_ID: result.shoe_ID,
                caption: result.caption,
                brand: result.brand,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
router.get("/", async (req, res) => {
    try {
        const data = await Post.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;
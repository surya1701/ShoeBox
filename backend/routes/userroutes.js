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
let User = require('../models/users');
router.patch('/profileImg', upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const update = {
        profileImg: url + '/public/' + req.file.filename
    };
    console.log(update);
    try {
        const updatedUser = await User.findOneAndUpdate({"googleId": req.body.id},
        update, {new: true});
        res.status(200).json("User Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Get collection for Users
router.get("/", async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.post("/", async (req, res) =>{
    // console.log(req.body);
    const data = new User({
        name: req.body.name,
        givenName: req.body.givenName,
        email: req.body.email,
        profileImg: req.body.imageUrl,
        liked: req.body.liked,
        followed: req.body.followed,
        orders: req.body.orders,
        since: req.body.since
    })
    try {
        const newData = await data.save()
        res.status(200).json("New User Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get("/:id", getUser, (req, res) =>{
    res.status(200).json(res.user)
})

router.put("/:id", async (req, res) =>{
    // console.log(req.body);
    const update = {
        name: req.body.name,
        googleId: req.body.googleId,
        givenName: req.body.givenName,
        email: req.body.email,
        profileImg: req.body.imageUrl,
        liked: req.body.liked,
        followed: req.body.followed,
        orders: req.body.orders,
        since: req.body.since
    }
    try {
        const updatedUser = await User.findOneAndUpdate({"googleId": req.params.id},
        update, {new: true});
        res.status(200).json("User Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getUser(req,res,nxt) {
    let user
    try {
        user = await User.findOne({"googleId": req.params.id})
        if(! user){
            return res.status(400).json({message: "User does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.user = user
    nxt()
}

module.exports = router;

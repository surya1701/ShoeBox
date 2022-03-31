const Router = require("express");
const User = require("../models/users")

const router = Router()

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
router.get("/:name", getUser, (req, res) =>{
    res.status(200).json(res.user)
})

router.put("/:name", async (req, res) =>{
    // console.log(req.body);
    const update = {
        name: req.body.name,
        givenName: req.body.givenName,
        email: req.body.email,
        profileImg: req.body.imageUrl,
        liked: req.body.liked,
        followed: req.body.followed,
        orders: req.body.orders,
        since: req.body.since
    }
    try {
        const updatedUser = await User.findOneAndUpdate({"givenName": req.params.name},
        update, {new: true});
        res.status(200).json("User Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getUser(req,res,nxt) {
    let user
    try {
        user = await User.findOne({"givenName": req.params.name})
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

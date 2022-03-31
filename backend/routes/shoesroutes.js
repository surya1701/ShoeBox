const Router  = require("express");
const Shoes = require("../models/shoes")

const router = Router()

// Get collection for Shoes
router.get("/", async (req, res) =>{
    try {
        const data = await Shoes.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get("/:id", getUser, (req, res) =>{
    res.status(200).json(res.shoe)
})
router.put("/:id", async (req, res) =>{
    // console.log(req.body);
    const update = {
        name: req.body.name,
        brand: req.body.brand,
        image: req.body.image,
        size: req.body.size,
        comments: req.body.comments,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating,
        gender: req.body.gender,
        description: req.body.description,
        views: req.body.views,
        date: req.body.date
    }
    try {
        const updatedShoe = await Shoes.findByIdAndUpdate(req.body._id,
        update, {new: true});
        res.status(200).json("User Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getUser(req,res,nxt) {
    let shoe
    try {
        shoe = await Shoes.findById(req.params.id)
        if(! shoe){
            return res.status(400).json({message: "User does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.shoe = shoe
    nxt()
}

module.exports = router;

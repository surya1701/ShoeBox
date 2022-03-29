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

module.exports = router;

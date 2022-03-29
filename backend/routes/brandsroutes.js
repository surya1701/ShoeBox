const Router  = require("express");
const Brands = require("../models/brands")

const router = Router()

// Get collection for Brands
router.get("/", async (req, res) =>{
    try {
        const data = await Brands.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;

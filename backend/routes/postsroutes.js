const Router  = require("express");
const Posts = require("../models/posts")

const router = Router()

// Get collection for Shoes
router.get("/", async (req, res) =>{
    try {
        const data = await Posts.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;

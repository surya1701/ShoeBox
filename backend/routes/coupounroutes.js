const Router = require("express");
const Coupouns = require("../models/coupouns")

const router = Router()

// Get collection for Brands
router.get("/", async (req, res) => {
    try {
        const data = await Coupouns.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;

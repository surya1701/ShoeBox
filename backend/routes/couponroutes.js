const Router = require("express");
const Coupons = require("../models/coupons")

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
router.get("/:code", getCoupon, (req, res) =>{
    res.status(200).json(res.coupon)
})

async function getCoupon(req,res,nxt) {
    let coupon
    try {
        coupon = await Coupons.findOne({"name": req.params.code})
        if(! coupon){
            return res.status(400).json({message: "Coupon does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.coupon = coupon
    nxt()
}

module.exports = router;

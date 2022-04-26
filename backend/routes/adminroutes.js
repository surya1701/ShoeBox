const Admin = require("../models/admin")
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const Shoes = require("../models/shoes")
router.get("/", verifyToken, async (req, res) =>{
    try {
        const data = await Shoes.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post("/register", async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!(email && password && name)) {
        res.status(400).send("All input is required");
      }
      // check if user already exist
      const oldUser = await Admin.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await Admin.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await Admin.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
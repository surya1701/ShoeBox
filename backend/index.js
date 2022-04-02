const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
const port = process.env.port || 3001;

app.listen(port, console.log(`Server started on port ${port}`));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDb Connection is Successful");
});

app.use(express.json())

const BrandsRouter = require('./routes/brandsroutes')
app.use('/brands', BrandsRouter)

const ShoesRouter = require('./routes/shoesroutes')
app.use('/shoes', ShoesRouter)

const PostsRouter = require('./routes/postsroutes')
app.use('/posts', PostsRouter)

const CouponRouter = require('./routes/couponroutes')
app.use('/coupons', CouponRouter)

const UserRouter = require('./routes/userroutes')
app.use('/users', UserRouter)
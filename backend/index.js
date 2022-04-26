const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const morgan = require('morgan')
const fsr = require('file-stream-rotator');

require('dotenv').config();

const app = express();
let logsinfo = fsr.getStream({ filename: "logs/access.log", frequency: "1h", verbose: true });
app.use(morgan('dev', { stream: logsinfo })) //tiny,dev,common,combined
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use('/public', express.static('public'));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
const port = process.env.port || 3001;

app.listen(process.env.PORT || port, console.log(`Server started on port ${port}`));

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

const AdminRouter = require('./routes/adminroutes')
app.use('/admin', AdminRouter)

module.exports = app;
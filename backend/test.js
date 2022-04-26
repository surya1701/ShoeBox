process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Posts = require('./models/Posts');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();
var expect = chai.expect

chai.use(chaiHttp);

describe('Posts', () => {
  describe('/GET posts', () => {
    it('it should GET all the posts', (done) => {
      chai.request(server)
        .get('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST post', () => {
    it('it should not POST a post without all fields', (done) => {
      let post = {
        shoe_ID: "90987HGN836#95",
        brand: "PUMA",
        image: "post.jpg"
      }
      chai.request(server)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.include('views: Path `views` is required.');
          expect(res.body.message).to.include('caption: Path `caption` is required.');
          expect(res.body.message).to.include('date: Path `date` is required.');
          done();
        });
    });
  });
});


describe('Shoes', () => {
  describe('/GET Shoes', () => {
    it('it should GET all shoes', (done) => {
      chai.request(server)
        .get('/shoes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST shoes', () => {
    it('it should not POST a food item without all fields', (done) => {
      let shoe = {
        name: "Price Breakup Tub Italian Popcorn + 2 Large Coke(0) 720 COKE LARGE(2) ...",
        brand: "ADDIDAS",
        image: "1.jpg",
        price: 23400
      }
      chai.request(server)
        .post('/shoes')
        .send(shoe)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.include('size: Path `size` is required.');
          expect(res.body.message).to.include('comments: Path `comments` is required.');
          expect(res.body.message).to.include('type: Path `type` is required.');
          expect(res.body.message).to.include('rating: Path `rating` is required.');
          expect(res.body.message).to.include('gender: Path `gender` is required.');
          expect(res.body.message).to.include('description: Path `description` is required.');
          expect(res.body.message).to.include('views: Path `views` is required.');
          expect(res.body.message).to.include('date: Path `date` is required.');
          done();
        });
    });
  });
});



describe('User', () => {
  describe('/GET user', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST user', () => {
    it('it should not POST a user without all fields', (done) => {
      let user = {
        name: "7021904275",
        email: "user23@gmail.com",
        googleId: "987y2de"
      }
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.body.message).to.include('profileImg: Path `name` is required.');
          expect(res.body.message).to.include('givenName: Path `about` is required.');
          expect(res.body.message).to.include('liked: Path `image` is required.');
          done();
        });
    });
  });
});

describe('Coupouns', () => {
  describe('/GET coupouns', () => {
    it('it should GET all coupouns', (done) => {
      chai.request(server)
        .get('/coupouns')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/GET:code organizers', () => {
    it('it should GET all organizers', (done) => {
      chai.request(server)
        .get('/coupouns:code')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

describe('Brands', () => {
  describe('/GET brands', () => {
    it('it should GET all brands', (done) => {
      chai.request(server)
        .get('/brands')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

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
        .post('/posts/postForm')
        .send(post)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
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
          expect(res.body.message).to.include('givenName: Path `givenName` is required.');
          done();
        });
    });
  });
});

describe('Coupons', () => {
  describe('/GET coupons', () => {
    it('it should GET all coupons', (done) => {
      chai.request(server)
        .get('/coupons')
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
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Vendor = require('../models/vendor');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let data = require('../controllers/data/gendata');

var vendorCheck = function(res, vendor) {
  res.name.should.be.equal(vendor.name);
  res.spotifyUserId.should.be.equal(vendor.spotifyUserId);
  res.musicTaste.should.be.deep.equal(vendor.musicTaste);
  res.venueId.should.be.equal(vendor.venueId);
};

chai.use(chaiHttp);

describe('Vendors', () => {
  beforeEach((done) => {
    Vendor.remove({}, (err) => {
      done();
    });
  });

  // test /GET
  describe('/GET a valid vendor ID', () => {
  it('should return one vendor obejct', (done) => {
    let steve = data.getVendor();
    let vendor = new Vendor(steve);

    vendor.save()
      .then((vendor) => {
        chai.request(server)
          .get('/vendor?spotifyUserId=' + steve.spotifyUserId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            vendorCheck(res.body, steve);
            done();
          });
      });
    });
  });
  describe('/GET bad vendor ID', () => {
  it('should return null for bad IDs', (done) => {
    chai.request(server)
      .get('/vendor?spotifyUserId=3')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  // test /POST
  describe('/POST a valid vendor', () => {
    it('should return the created vendor object', (done) => {
    let steve = data.getVendor();

    chai.request(server)
      .post('/vendor')
      .send(steve)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

});

process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Vendor = require('../models/vendor');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var vendorCheck = function(res, vendor) {
  res.name.should.be.equal(vendor.name);
  res.spotifyUserId.should.be.equal(vendor.spotifyUserId);
  res.musicTaste.should.be.deep.equal(vendor.musicTaste);
  res.venueName.should.be.equal(vendor.venueName);
  res.lat.should.be.equal(vendor.lat);
  res.lng.should.be.equal(vendor.lng);
  res.address.should.be.equal(vendor.address);
};

describe('Vendors', () => {
  beforeEach((done) => {
    Vendor.remove({}, (err) => {
      done();
    });
  });

  // test /GET
  describe('/GET a valid vendor ID', () => {
  it('it should return one vendor obejct', (done) => {
    let steve = {
      name: "steve",
      spotifyUserId: "123",
      musicTaste: ["house"],
      venueName: "steves stakes",
      lat: 42.0,
      lng: 42.0,
      address: "123 AA road"
    };
    let vendor = new Vendor(steve);

    vendor.save()
      .then((vendor) => {
        chai.request(server)
          .get('/vendor?spotifyUserId=' + steve.spotifyUserId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.be.eql(1);
            vendorCheck(res.body[0], steve);
            done();
          });
      });
    });
  });
  describe('/GET bad vendor ID', () => {
  it('it should return null for bad IDs', (done) => {
    chai.request(server)
      .get('/vendor?spotifyUserId=3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  // test /POST
  describe('/POST a valid vendor', () => {
    it('it should return the created vendor object', (done) => {
    let steve = {
      name: "steve",
      spotifyUserId: "123",
      musicTaste: ["house"],
      venueName: "steves stakes",
      lat: 42.0,
      lng: 42.0,
      address: "123 AA road"
    };

    chai.request(server)
      .post('/vendor')
      .send(steve)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        vendorCheck(res.body, steve);
        done();
      });
    });
  });
  describe('/POST an vendor with extra fields', () => {
    it('it should return the created vendor object and ignore extra fields', (done) => {
    let steve = {
      name: "steve",
      spotifyUserId: "123",
      musicTaste: ["house"],
      venueName: "steves stakes",
      lat: 42.0,
      lng: 42.0,
      address: "123 AA road",
      religion: "GNU for life!!!!"
    };

    chai.request(server)
      .post('/vendor')
      .send(steve)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        vendorCheck(res.body, steve);
        done();
      });
    });
  });
  describe('/POST an vendor with empty optional fields', () => {
    it('it should return the created vendor object with optional fields empty', (done) => {
      let steve = {
        name: "",
        spotifyUserId: "123",
        musicTaste: [],
        venueName: "",
        lat: 42.0,
        lng: 42.0,
        address: "123 AA road",
      };

      chai.request(server)
        .post('/vendor')
        .send(steve)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            vendorCheck(res.body, steve);
            done();
        });
    });
  });
  describe('/POST an vendor with empty required fields', () => {
    it('it should return an error message', (done) => {
      let alice = {
        name: "steve",
        spotifyUserId: "",
        musicTaste: ["house"],
        venueName: "steves stakes",
        address: "",
      };

      chai.request(server)
        .post('/vendor')
        .send(alice)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('errors');
            done();
        });
    });
  });
  describe('/POST an empty vendor', () => {
    it('it should return an error message', (done) => {
      let alice = {};

      chai.request(server)
        .post('/vendor')
        .send(alice)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('errors');
            done();
        });
    });
  });

});

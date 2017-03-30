process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Venue = require('../models/venue');

let Q = require('q');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let data = require('../controllers/data/gendata');

chai.use(chaiHttp);

describe('Venues', () => {
  beforeEach((done) => {
    Venue.remove({}, (err) => {
      done();
    });
  });

  // test /GET
  describe('/GET all venues', () => {
    it('should a list of venues', (done) => {
      let v0 = data.getVenue();
      let v1 = data.getVenue();
      let v2 = data.getVenue();

      let venue0 = new Venue(v0);
      let venue1 = new Venue(v1);
      let venue2 = new Venue(v2);

      let p0 = venue0.save();
      let p1 = venue1.save();
      let p2 = venue2.save();

      Q.all([p0, p1, p2])
        .then(() => {
          chai.request(server)
            .get('/venues')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body.length.should.be.eql(3);
              done();
            });
        });
    });
  });
});

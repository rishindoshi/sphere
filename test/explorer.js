process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Explorer = require('../models/explorer');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var explorerCheck = function(res, explorer) {
  res.name.should.be.equal(explorer.name);
  res.spotifyUserId.should.be.equal(explorer.spotifyUserId);
  res.musicTaste.should.be.deep.equal(explorer.musicTaste);
};

describe('Explorers', () => {
  beforeEach((done) => {
    Explorer.remove({}, (err) => {
      done();
    });
  });

  // test /GET
  describe('/GET a valid explorer ID', () => {
  it('it should return one explorer obejct', (done) => {
    let steve = {
      name: "steve",
      spotifyUserId: "123",
      musicTaste: ["house"]
    };
    let explorer = new Explorer(steve);

    explorer.save()
      .then((explorer) => {
        chai.request(server)
          .get('/explorer?spotifyUserId=' + steve.spotifyUserId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.be.eql(1);
            explorerCheck(res.body[0], steve);
            done();
          });
      });
    });
  });
  describe('/GET bad explorer ID', () => {
  it('it should return null for bad IDs', (done) => {
    chai.request(server)
      .get('/explorer?spotifyUserId=3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  // test /POST
  describe('/POST a valid explorer', () => {
    it('it should return the created explorer object', (done) => {
      let rishin = {
        name: "rishin",
        spotifyUserId: "456",
        musicTaste: ["rock", "folk"]
      };

      chai.request(server)
        .post('/explorer')
        .send(rishin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          explorerCheck(res.body, rishin);
          done();
        });
    });
  });
  describe('/POST an explorer with extra fields', () => {
    it('it should return the created explorer object and ignore extra fields', (done) => {
      let rishin = {
        name: "rishin",
        spotifyUserId: "456",
        musicTaste: ["rock", "folk"],
        politics: "fucking loves trump"
      };

      chai.request(server)
        .post('/explorer')
        .send(rishin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          explorerCheck(res.body, rishin);
          done();
        });
    });
  });
  describe('/POST an explorer with empty optional fields', () => {
    it('it should return the created explorer object with optional fields empty', (done) => {
      let alice = {
        name: "",
        spotifyUserId: "12345",
        musicTaste: []
      };

      chai.request(server)
        .post('/explorer')
        .send(alice)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            explorerCheck(res.body, alice);
            done();
        });
    });
  });
  describe('/POST an explorer with empty required fields', () => {
    it('it should return an error message', (done) => {
      let alice = {
        name: "alice",
        spotifyUserId: "",
        musicTaste: [ "kpop" ]
      };

      chai.request(server)
        .post('/explorer')
        .send(alice)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('errors');
            done();
        });
    });
  });
  describe('/POST an empty explorer', () => {
    it('it should return an error message', (done) => {
      let alice = {};

      chai.request(server)
        .post('/explorer')
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

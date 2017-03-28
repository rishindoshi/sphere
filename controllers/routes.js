var request = require('request');
var Q = require('q');

var mapClient = require('./venues/map');
var explorer = require('./explorer');
var vendor = require('./vendor');
var explorerDB = require('../models/explorer');
var vendorDB = require('../models/vendor');

var maxRadius = 1000 // meters

module.exports = function(app, db) {
  app.get('/ping', function(req, res) {
    res.send('pong');
  });

  app.route('/explorer')
    .get(explorer.getExplorer)
    .post(explorer.postExplorer);

  app.route('/vendor')
    .get(vendor.getVendor)
    .post(vendor.postVendor);

  app.route('/venue')
    .get(venue.getVenue);
    .post(venue.postVenue);

  app.get('/userVerify', function(req, res) {
    var p1 = explorerDB.find({ spotifyUserId: req.query.userId });
    var p2 = vendorDB.find({ spotifyUserId: req.query.userId });

    Q.all([p1, p2]).spread(function(p1, p2) {
      if(p1[0]) {
        res.send(p1[0]);
      }
      else if(p2[0]) {
        res.send(p2[0]);
      }
      else {
        res.send("usernoexist");
      }
    }, function(err) {
      console.log(err);
      res.send(err);
    });
  });
    
  app.get('/venues', function(req, res) {
    if(!req.query.lat || !req.query.lng) {
      res.status(400).send();
      return;
    }

    var radius = req.query.radius || maxRadius;
    mapClient.getVenues(db, req.query.lat, req.query.lng, radius)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send("db error getting up venues");
		});
  });

  app.post('/venues', function(req, res) {
    if(!req.body.name || !req.body.lat ||
       !req.body.lng || !req.body.genres)
    {
      res.status(400).send();
      return;
    }

    var venue = {
      'name': req.body.name,
      'lat': req.body.lat,
      'lng': req.body.lng,
    };

    mapClient.updateVenues(db, venue, req.body.genres)
      .then(function(data) {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(500).send("db error updating venue");
      });
  });
};

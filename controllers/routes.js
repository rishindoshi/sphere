var request = require('request');
var Q = require('q');

var explorer = require('./explorer');
var vendor = require('./vendor');
var venue = require('./venue');

var explorerDB = require('../models/explorer');
var vendorDB = require('../models/vendor');

module.exports = function(app) {
  app.get('/ping', function(req, res) {
    res.send('pong');
  });

  app.route('/explorer')
    .get(explorer.getExplorer)
    .post(explorer.postExplorer);

  app.route('/vendor')
    .get(vendor.getVendor)
    .post(vendor.postVendor);

  app.route('/venues')
    .get(venue.getVenues);

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
      res.send(err);
    });
  });

};

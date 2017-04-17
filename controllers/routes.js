var request = require('request');
var Q = require('q');

var explorer = require('./explorer');
var vendor = require('./vendor');
var venue = require('./venue');
var user = require('./user');

var explorerDB = require('../models/explorer');
var vendorDB = require('../models/vendor');

var gen = require('./data_gen/gendata');
var spotify = require('./spotify');

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
  
  app.post('/venue', function(req, res) {
    venue.postVenue(req.body)
      .then(function(venue) {
        res.send(venue);
      })
      .catch(function(err) {
        res.send(err);
      });
  });

  app.get('/userVerify', function(req, res) {
    user.userVerify(req.query.userId)
      .then(function(stat) {
        res.send(stat);
      })
      .catch(function(err) {
        res.send(err)
      });
  });

  app.get('/populate', function(req, res) {
    var vendors = gen.getVendors();

    for (var i = 0; i < vendors.length; ++i) {
      var vendor = vendors[i];
      spotify.getUserGenres(vendor.spotifyUserId)
        .then(function(genres) {
          vendor.musicTaste = genres;
          var newVendor = new vendorDB(vendor);
          return newVendor.save();
        })
        .then(function(newVendor) {
          return venueClient.createOrUpdateVenueFromVendor(vendor);
        })
        .then(function(venue) {
          console.log("SUCCESS");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });

};

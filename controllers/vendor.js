var mongoose = require('mongoose');
var Vendor = require('../models/vendor');
var venueClient = require('./venues/venue');
var spotify = require('./spotify');

var getVendor = function(req, res) {
  Vendor.find({ spotifyUserId: req.query.spotifyUserId })
    .then(function(vendor) {
      res.json(vendor);
    })
    .catch(function(err) {
      res.send(err);
    });
}

// TODO: When a new vendor is created, we need to either
// create a new corresponding venue for that vendor, or
// if the venue already exists, add the new vendor's musicTaste
// to that already existing venue
var postVendor = function(req, res) {
  var vendorInfo = req.body;

  spotify.getUserGenres(req.body.spotifyUserId)
    .then(function(genres) {
      vendorInfo.musicTaste = genres;
      var newVendor = new Vendor(vendorInfo);
      return newVendor.save();
    })
    .then(function(vendor) {
      var coords = { lat: vendorInfo.lat, lng: vendorInfo.lng };
      var vendorId = vendorInfo.spotifyUserId;
      return venueClient.updateVenueVendors(coords, vendorId);
    })
    .then(function(venue) {
      // TODO: What object type is venue here? Test and find out
      res.send(venue);
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getVendor, postVendor };


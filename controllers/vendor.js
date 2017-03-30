var Vendor = require('../models/vendor');
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

var postVendor = function(req, res) {
  var vendorInfo = req.body;

  spotify.getUserGenres(req.body.spotifyUserId)
    .then(function(genres) {
      vendorInfo.musicTaste = genres;
      var newVendor = new Vendor(vendorInfo);
      return newVendor.save();
    })
    .then(function(vendor) {
      return venueClient.createOrUpdateVenueFromVendor(vendorInfo);
    })
    .then(function(venue) {
      res.status(200).send();
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getVendor, postVendor };


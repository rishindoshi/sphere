var mongoose = require('mongoose');
var Vendor= require('../models/vendor');
var spotify = require('./spotify');

mongoose.Promise = require('q').Promise;

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
  spotify.getUserGenres(req.body.spotifyUserId)
    .then(function(genres) {
      var info = req.body;
      info.musicTaste = genres;
      var newVendor = new Vendor(info);
      return newVendor.save(req.body);
    })
    .then(function(ven) {
      res.send(ven);
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getVendor, postVendor };


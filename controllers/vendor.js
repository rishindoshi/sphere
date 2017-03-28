var mongoose = require('mongoose');
var Vendor= require('../models/vendor');

mongoose.Promise = require('q').Promise;

var getVendor = function(req, res) {
  Vendor.findById(req.query.spotifyUserId)
    .then(function(vendor) {
      res.json(vendor);
    })
    .catch(function(err) {
      res.send(err);
    });
}

var postVendor = function(req, res) {
  var newVendor= new Vendor(req.body);

  newVendor.save(req.body)
    .then(function(exp) {
      res.send(exp);
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getVendor, postVendor };


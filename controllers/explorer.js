var mongoose = require('mongoose');
var Explorer = require('../models/explorer');

mongoose.Promise = require('q').Promise;

var getExplorer = function(req, res) {
  Explorer.find({ spotifyUserId: req.query.spotifyUserId })
    .then(function(exp) {
      res.json(exp);
    })
    .catch(function(err) {
      res.send(err);
    });
}

var postExplorer = function(req, res) {
  var newExplorer = new Explorer(req.body);

  newExplorer.save(req.body)
    .then(function(exp) {
      res.send(exp);
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getExplorer, postExplorer };

var Explorer = require('../models/explorer');
var spotify = require('./spotify');

var getExplorer = function(req, res) {
  Explorer.find({ spotifyUserId: req.query.spotifyUserId })
    .then(function(exp) {
      res.json(exp[0]);
    })
    .catch(function(err) {
      res.send(err);
    });
}

var postExplorer = function(req, res) {
  var explorerInfo = req.body;
  
  spotify.getUserGenres(explorerInfo.spotifyUserId)
    .then(function(genres) {
      explorerInfo.musicTaste = genres;
      var newExplorer = new Explorer(explorerInfo);
      return newExplorer.save();
    })
    .then(function(exp) {
      res.status(200).send();
    })
    .catch(function(err) {
      res.send(err);
    });
}

module.exports = { getExplorer, postExplorer };

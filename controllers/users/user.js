var Q = require('q');
var request = require('request');
var userMusic = require('./spotify')
var venueapi = require('../venues/venue');

exports.findUser = function(db, spotifyUserId) {
  var deferred = Q.defer();

  db.collection("users").findOne({"spotifyUserId": spotifyUserId}, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });

  return deferred.promise;
};

exports.createNewExplorer = function(db, userInfo) {
  var deferred = Q.defer();

  var doc = {
    "type": "explorer",
    "name": userInfo.name,
    "spotifyUserId": userInfo.spotifyUserId,
    "musicTaste": [],
  }
  db.collection("users").insertOne(doc, function(err, r) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        message: "success: createNewExplorer",
        newExplorer: doc
      });
    }
  });

  return deferred.promise;
}

exports.createNewVendor = function(db, userInfo) {
  var deferred = Q.defer();

  var doc = {
    "type": "vendor",
    "name": userInfo.name,
    "venueName": userInfo.venueName,
    "spotifyUserId": userInfo.spotifyUserId,
    "lat": userInfo.lat,
    "lng": userInfo.lng,
    "musicTaste": [],
    "address": userInfo.address,
    "currPlaylistId": userInfo.currPlaylistId,
  };
  userMusic.getUserGenres(doc.spotifyUserId)
    .then(function(genres) {
      doc.musicTaste = genres;
      db.collection("users").insertOne(doc, function(err, r) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve({
            message: "success: createNewVendor",
            newVendor: doc
          });
        }
      });
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

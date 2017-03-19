var Q = require('q');
var request = require('request');
var userMusic = require('./spotify')
// May want to just conflate the two below functions

exports.findUser = function(db, spotifyUserId) {
  var deferred = Q.defer();

  db.collection("users").findOne({"spotifyUserId": spotifyUserId}, function(err, doc) {
    if(err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(doc);
    }
  });

  return deferred.promise;
};

exports.createNewExplorer = function(db, userInfo) {
  var deferred = Q.defer();

  // TODO data validation / sanitization

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
      deferred.resolve("success: createNewExplorer");
    }
  });

  return deferred.promise;
}

exports.createNewVendor = function(db, userInfo) {
  var deferred = Q.defer();

  // TODO data validation / sanitization

  var doc = {
    "type": "vendor",
    "name": userInfo.name,
    "venueName": userInfo.venueName,
    "spotifyUserId": userInfo.spotifyUserId,
    "lat": userInfo.lat,
    "lng": userInfo.lng,
    "musicTaste": [],
    "currPlaylistId": userInfo.currPlaylistId,
  }

  userMusic.getUserGenres(doc.spotifyUserId)
    .then(function(genres) {
      doc.musicTaste = genres;
      db.collection("users").insertOne(doc, function(err, r) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve("success: createNewVendor");
        }
      });
    })
    .catch(function(err) {
      deferred.reject(err);
    })

  return deferred.promise;
}

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';
var userapi = require('./user.js');

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);
  else testInsertOneFindOne(db);
  // else clearUsers(db);
});

var testInsertOneFindOne = function(db) {
  testInsertExplorer(db)
    .then(function(status) {
      console.log(status);
      return testInsertVendor(db);
    })
    .then(function(status) {
      console.log(status);
      return testFindExplorer(db);
    })
    .then(function(results) {
      console.log(results);
      return testFindVendor(db);
    })
    .then(function(results) {
      console.log(results);
      db.close();
    })
    .catch(function(err) {
      console.log(err);
    });
}

var clearUsers = function(db) {
  db.collection("users").deleteMany({'type': 'explorer'}, function(err, r) {
    db.collection("users").deleteMany({'type': 'vendor'}, function(err, r) {
      db.close();
    });
  });
}

var testInsertVendor = function(db) {
  vendorObj = {
    "type": "vendor",
    "name": "Steve",
    "venueName": "Common Cup Coffee",
    "spotifyUserId": "sgodbold",
    "lat": 29348,
    "lng": 23123,
    "musicTaste": [],
    "currPlaylistId": "sdk98dfdj9",
  };

  return userapi.createNewVendor(db, vendorObj);
}

var testInsertExplorer = function(db) {
  explorerObj = {
    'type': 'explorer',
    'name': 'Rishin',
    'spotifyUserId': 'rdoshi023',
    'musicTaste': []
  };

  return userapi.createNewExplorer(db, explorerObj)
}

var testFindVendor = function(db) {
  var userId = "sgodbold";
  return userapi.findUser(db, userId);
}

var testFindExplorer = function(db) {
  var userId = "rdoshi023";
  return userapi.findUser(db, userId);
}

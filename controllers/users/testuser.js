var Q = require('q');
var userClient = require('../users/user');
var spotifyClient = require('../users/spotify');
var genClient = require('../data/gendata');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);
  else {
    testMain(db);
  }
});

var testMain = function(db){
  clearUserCollection(db)
    .then(function(status) {
      console.log(status);
      return testCreateNewExplorer(db);
    })
    .then(function(resObj) {
      console.log(resObj.message);
      console.log(resObj.newExplorer);
      return testCreateNewVendor(db);
    })
    .then(function(resObj) {
      console.log(resObj.message);
      console.log(resObj.newVendor);
      return testFindUser(db);
    })
    .then(function(values) {
      console.log("testFindUser results...")
      console.log(values);
      db.close();
    })
    .catch(function(err) {
      console.log("ERROR: testuser")
      console.log(err);
      db.close();
    });
}

var testFindUser = function(db) {
  var deferred = Q.defer();
  var promiseArray = [];
  var exp = genClient.getExplorer();
  var ven = genClient.getVendor();
  console.log("finding user..." + exp.name);
  console.log("finding user..." + ven.name);

  promiseArray.push(userClient.findUser(db, exp.spotifyUserId));
  promiseArray.push(userClient.findUser(db, ven.spotifyUserId));
  return Q.all(promiseArray);
}

var testCreateNewExplorer = function(db) {
  var explorer = genClient.getExplorer();
  return userClient.createNewExplorer(db, explorer);
}

var testCreateNewVendor = function(db) {
  var vendor = genClient.getVendor();
  return userClient.createNewVendor(db, vendor);
}

var clearUserCollection = function(db) {
  var deferred = Q.defer();
  db.collection("users").deleteMany({'type': 'explorer'}, function(err, r) {
    if (err) deferred.reject(err);
    else {
      db.collection("users").deleteMany({'type': 'vendor'}, function(err, r) {
        if (err) deferred.reject(err);
        else deferred.resolve("success: clearUsers");
      });
    }
  });
  return deferred.promise;
}

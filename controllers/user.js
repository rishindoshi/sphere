var Q = require('q');
var request = require('request');
// May want to just conflate the two below functions

exports.createNewExplorer = function(db, userCreds) {
  db.collection("explorer").insertOne(userCreds, function(err, r) {
    if (err) {
      console.log("ERROR IN CREATE EXPLORER");
      console.log(err);
    } else {
      console.log("SUCCESS");
    }
    db.close()
  });
}

// Need to run classification on vendor spotify account here
// Need OAuth for this :(
exports.createNewVendor = function(db, userCreds) {
  db.collection("explorer").insertOne(userCreds, function(err, r) {
    if (err) {
      console.log("ERROR IN CREATE EXPLORER");
      console.log(err);
    } else {
      console.log("SUCCESS");
    }
    db.close()
  });
}

exports.updateExplorer = function(db, newUserCreds) {

}

exports.updateVendor = function(db, newUserCreds) {

}

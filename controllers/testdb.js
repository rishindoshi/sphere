var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';
var userapi = require('./user.js');

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);
  else testMain(db);
});

var testMain = function(db) {
}

var testInsert = function(db) {
  explorerObj = {
    'name': 'Rishin',
    'spotifyId': 'rdoshi023',
    'musicTaste': [
      'jazz',
      'pop'
    ]
  };

  userapi.createNewExplorer(db, explorerObj);
}

var testFind = function(db) {
  var userId = "rdoshi023";
  db.collection("users").findOne({"spotifyUserId":  userId}, function(err, doc) {
    if(err) {
      console.log("BROKEN!");
    }
    else {
      console.log(doc);
    }
  });
}


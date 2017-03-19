var request = require('request');
var userClient = require('./user');
var mapClient = require('./map');

// TODO: move to a config file?
var maxRadius = 1000; // meters

module.exports = function(app, db) {
  app.get('/index', function(req, res) {
    res.send('<script>alert("hello, world!")</script>');
  });

  app.post('/createVendor', function(req, res) {
    var userInfo;
    userInfo.name = req.body.name;
    userInfo.venueName =  req.body.venueName;
    userInfo.spotifyUserId = req.body.spotifyUserId;
    userInfo.lat = req.body.lat;
    userInfo.lng = req.body.lng;
    // ?? currPlaylistId": userInfo.currPlaylistId,

    userClient.createNewVendor(db, userInfo)
      .then(function(val) {
        // ignore val
        res.send();
      })
      .catch(function(err) {
        res.send(500);
      });
  });

  app.post('/createExplorer', function(req, res) {
    var userInfo;
    userInfo.name = req.query.name;
    userInfo.spotifyUserId = req.query.spotifyUserId;

    userClient.createNewExplorer(db, userInfo)
      .then(function(val) {
        // ignore val
        res.send();
      })
      .catch(function(err) {
        res.start(500);
      });
  });

  app.get('/map', function(req, res) {
    if(!req.query.lat || !req.query.lng) {
      res.status(400).send();
      return;
    }

    var radius = req.query.raidus || maxRadius;
    mapClient.getVenues(db, req.query.lat, req.query.lng, radius)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send("db error looking up venues");
      });
  });

  app.post('/userInfo', function(req, res) {
    var userId = req.body.userId;

    userClient.findUser(db, spotifyUserId)
      .then(function(doc) {
        if(doc.length == 0) {
          // send 'user doesn't exist'
          // wait for frontend to call a 'create' route
        }
        // send user type {vendor / explorer}
      })
      .catch(function(err) {
    });
  });
};

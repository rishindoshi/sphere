var request = require('request');
var userClient = require('./user');
var mapClient = require('./map');

module.exports = function(db) {
  app.post('/userInquiry', function(req, res) {
    var spotifyUserId = req.body.spotifyUserId;

    userClient.findUser(db, spotifyUserId)
      .then(function(doc) {
        if(doc.length == 0) {
          // send 'user doesn't exist'
          // wait for frontend to call a 'create' route
        }
        // send user type {vendor / explorer}
      }
    })
    .catch(function(err) {
    });

  });

  app.get('/map', function(req, res) {
    var lat = req.query.lat;
    var lng = req.query.lng;

    var locationInfo = {
      "lat": lat,
      "lng": lng,
    }

    mapClient(db, locationInfo)
      .then(function(data) {
        // res.send MAP
      })
      .catch(function(err) {
        res.send(500);
      });
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
};

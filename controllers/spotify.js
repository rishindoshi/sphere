var Q = require('q');
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : 'a21eb5ea7b434b80acd97c263cdd6726',
  clientSecret : '60a4adbdfbca4977a4996487735db319',
  redirectUri : 'http://localhost:8888/callback'
});

exports.getAuthToken = function(){
  var deferred = Q.defer();
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(spotifyApi.clientId +
         ':' + spotifyApi.clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(err, res, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(body.access_token);
    }
  });

  return deferred.promise;
}






exports.



exports.getUserTaste = function(uId) {
  request.post(authOptions)
    .then(function(error, response, body) {
      if (error) console.log(error);

      var token = body.access_token;
      var options = {
        url: 'GET https://api.spotify.com/v1/users/' + uId + '/playlists',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      return request.get(options);
    });



}

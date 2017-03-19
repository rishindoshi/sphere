var Q = require('q');
var request = require('request-promise');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : 'a21eb5ea7b434b80acd97c263cdd6726',
  clientSecret : '60a4adbdfbca4977a4996487735db319',
  redirectUri : 'http://localhost:8888/callback'
});

var getPlaylistGenres = function(uid, pid) {
  var deferred = Q.defer();

  spotifyApi.getPlaylist(uid, pid)
    .then(function(plist) {
      var items = plist.body.tracks.items;
      return items.map(function(track) { return track.track.artists; })
    })
    .then(function(artistObjs) {
      return artistObjs.map(function(artist) { return artist[0].id; })
    })
    .then(function(aids) {
      aids = Array.from(new Set(aids));
      return spotifyApi.getArtists(aids.slice(0,10));
    })
    .then(function(data) {
      return data.body.artists.map(function(artist) { return artist.genres; });
    })
    .then(function(genres) {
      var allGenres = [];
      for (var i = 0; i < genres.length; ++i) {
        allGenres = allGenres.concat(genres[i]);
      }
      allGenres = Array.from(new Set(allGenres));
      deferred.resolve(allGenres);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
    return spotifyApi.getUserPlaylists('rdoshi023');
  })
  .then(function(data) {
    console.log('Successfully Retrieved Playlists');
    return data.body.items.map(function(plist) { return plist.id });
  })
  .then(function(pids) {
    // now extract artists from these playlists (choose 3-4 at random)
    // console.log(pids);
    getPlaylistGenres('rdoshi023', pids[0]);
  })
  .then(function(plist) {
    console.log(plist);
  })
  .catch(function(err) {
    console.log(err);
  });

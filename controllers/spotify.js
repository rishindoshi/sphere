var Q = require('q');
var request = require('request-promise');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : 'a21eb5ea7b434b80acd97c263cdd6726',
  clientSecret : '60a4adbdfbca4977a4996487735db319',
  redirectUri : 'http://localhost:8888/callback'
});

var shuffle = function(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

var mostFrequent = function(arr) {
  var freq = {};
  for (var i = 0; i < arr.length; ++i) {
    var elt = arr[i];
    freq[elt] = (elt in freq) ? freq[elt]+1 : 1;
  }
  var freqArr = [];
  for (elt in freq) {
    freqArr.push({ elt: elt, freq: freq[elt] });
  }
  freqArr.sort(function(a, b) {
    return b.freq - a.freq;
  });
  return freqArr;
} 

var getPlaylistGenres = function(uid, pids) {
  var deferred = Q.defer();
  var promises = [];
  
  for (var i = 0; i < pids.length; ++i) {
    promises.push(spotifyApi.getPlaylist(uid, pids[i]));
  }
 
  Q.all(promises)
    .then(function(values) {
      var items = [];
      console.log("USER PLAYLISTS:");
      for (var j = 0; j < values.length; ++j) {
        console.log(values[j].body.name);
        items = items.concat(values[j].body.tracks.items);
      }
      return items.map(function(track) { return track.track.artists; })
    })
    .then(function(artistObjs) {
      return artistObjs.map(function(artist) { return artist[0].id; })
    })
    .then(function(aids) {
      return mostFrequent(aids).map(function(obj) {
        return obj.elt;
      });
    })
    .then(function(aids){
      aids = (aids.length < 7) ? aids.slice(0, aids.length) : aids.slice(0, 7);
      return spotifyApi.getArtists(aids);
    })
    .then(function(data) {
      console.log("USER TOP ARTISTS:");
      return data.body.artists.map(function(artist) {
        console.log(artist.name);
        return artist.genres;
      });
    })
    .then(function(genres) {
      var allGenres = [];
      for (var i = 0; i < genres.length; ++i) {
        allGenres = allGenres.concat(genres[i]);
      }
      return mostFrequent(allGenres).map(function(obj) {
        return obj.elt;
      });
    })
    .then(function(genres) {
      genres = (genres.length < 7) ? genres.slice(0, genres.length) : genres.slice(0, 7);
      deferred.resolve(genres);
    })
    .catch(function(err) {
      console.log("caught error in playlist genre extraction");
      deferred.reject(err);
    });

  return deferred.promise;
}

exports.getUserGenres = function(uid) {
  var deferred = Q.defer();

  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      // console.log('The access token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getUserPlaylists(uid);
    })
    .then(function(data) {
      return data.body.items.filter(function(plist) {
        return plist.owner.id === uid;
      }).map(function(plist) {
        return plist.id
      });
    })
    .then(function(pids) {
      shuffle(pids); 
      return getPlaylistGenres(uid, pids.slice(0, 4));
    })
    .then(function(genres) {
      console.log("USER TOP GENRES:");
      console.log(genres);
      deferred.resolve(genres);
    })
    .catch(function(err) {
      console.log(err);
      deferred.reject(err);
    });

  return deferred.promise;
}


var Q = require('q');
var request = require('request');
var Explorer = require('../../models/explorer');

exports.constructExplorer = function(uid, name) {
	return new Explorer({
		name: name,
		spotifyUserId: uid,
		musicTaste: []
	});
}	

exports.findExplorer = function(spotifyUserId) {
  var deferred = Q.defer();

  return deferred.promise;
};

exports.createNewExplorer = function(uid, name) {
	var deferred = Q.defer();
	var newExplorer = exports.constructExplorer(uid, name);

	newExplorer.save()
		.then(function(res) {
			deferred.resolve("New Explorer Created!");
		})
		.catch(function(err) {
			deferred.reject(err);
		});

	return deferred.promise;
}



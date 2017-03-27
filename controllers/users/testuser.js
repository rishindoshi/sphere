var Q = require('q');
var explorerClient = require('./explorer');
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

mongoose.connect(mongoUrl);
mongoose.Promise = require('q').Promise;

var testMain = function() {
	explorerClient.createNewExplorer("platter", "Rishin Doshi")
		.then(function(status) {
			console.log(status);
			mongoose.connection.close();
		})
		.catch(function(err) {
			console.log(err);
			mongoose.connection.close();
		});
}

testMain();

// This module serves as a temp replacement for the AWS Database
var Q = require('q');
var fs = require('fs');

// Only need to run this once.
var convertTxtToJson = function() {
  var lineReader = require('readline').createInterface({
    input: fs.createReadStream('genres.txt')
  });

  lineReader.on('line', function (genre) {
    console.log("\"" + genre + "\"" + ",");
  });
}

module.exports = function() {
  var obj = JSON.parse(fs.readFileSync('./dummy_data/genres.json', 'utf8'));
  return obj;
}

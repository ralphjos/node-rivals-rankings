var log = require('captains-log')();
var http = require('http');
var https = require('https');

module.exports = function (options, callback) {
    var request = https.request(options, function (res) {
        var output = '';
        log("Beginning fetch");
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            callback(JSON.parse(output));
        });
    });


    request.on('error', function (err) {
        res.send('error: ' + err.message);
    });
    request.end();
};

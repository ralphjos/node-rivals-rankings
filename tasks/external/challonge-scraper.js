var http = require("http");
var https = require("https");

var log = require('captains-log')();

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
module.exports = function() {
    var api_key = process.env.CHALLONGE_KEY;
    var created_after = '2016-01-10';
    var options = {
        hostname: 'api.challonge.com',
        path: '/v1/tournaments?' + api_key + '?' + created_after,
        method: 'GET'
    };
    log("Beginning fetch");

    var req = https.request(options, function(res) {
        var output = '';
        log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
            log(output);
        });

        res.on('end', function() {
            log(res.statusCode, output);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
    log("Fetch ended");
};

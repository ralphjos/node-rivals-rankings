/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var log = require('captains-log')();
var http = require('http');
var https = require('https');
module.exports.bootstrap = function(cb) {

    // API Fetch Variable Setup
    var api_key = sails.config.challonge.key;
    var created_after = '2016-01-10';
    var options = {
        hostname: 'api.challonge.com',
        path: '/v1/tournaments.json?api_key=' + api_key + '&created_after=' + created_after,
        method: 'GET'
    };

    // API Fetch
    var req = https.request(options, function(res) {

          var output = '';
          log(options.hostname + ':' + res.statusCode);
          log("Beginning fetch");
          res.setEncoding('utf8');


          res.on('data', function (chunk) {
                output += chunk;
          });


          res.on('end', function() {

                var allTournaments = JSON.parse(output);

                // Model Setup
                allTournaments.forEach(function(listItem, index){
                      Tournament.findOne({
                            tournamentID: listItem.tournament.id
                      }).exec(function (err, record){

                      if (err) {
                            return;
                      }


                      // If not existing, add to database
                      if (!record) {
                            Tournament.create({
                                  tournamentID: listItem.tournament.id, 
                                  tournamentName: listItem.tournament.name,
                                  date: listItem.tournament.started_at,
                            }).exec(function createCB(err, created){
                                  log.info('"%s" Not Found In DB - Adding', listItem.tournament.name);
                            });
                            return;
                      }

                      log('%s" Already Exists In DB - Skipped', record.tournamentName);
                      return;
                      });
                });
          });
    });


    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });
    req.end();


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

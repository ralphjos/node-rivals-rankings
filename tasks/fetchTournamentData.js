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
var fetchMatches = require('./fetchMatches.js');
var simpleRequest = require('./simpleRequest.js');

var whiteList = ["west", "wcs", "central", "ccs", "east", "ecs", "getgood", "national", "ncs"];

function whiteListed(tournamentUrl) {
      tournamentUrl = tournamentUrl.toLowerCase();

      for(var i = 0; i < whiteList.length; i++) {
            if (tournamentUrl.includes(whiteList[i])) {
                  return true;
            }
      }

      return false;
}

module.exports = function () {

      // API Fetch Variable Setup
      var api_key = sails.config.challonge.key;
      var created_after = '2016-01-10';
      var options = {
            hostname: 'api.challonge.com',
            path: '/v1/tournaments.json?api_key=' + api_key + '&created_after=' + created_after,
            method: 'GET'
      };

      simpleRequest(options, function (allTournaments) {
            if (!allTournaments) {
                  log("Request to fetch all tournaments failed.")
            }

            allTournaments.forEach(function (listItem, index) {
                  log(listItem.tournament.url, whiteListed(listItem.tournament.url));
                  if (whiteListed(listItem.tournament.url)) {

                        Tournament.findOne({
                              tournamentID: listItem.tournament.id
                        }).exec(function (err, record) {

                              if (err) {
                                    return;
                              }


                              // If not existing, add to database
                              if (!record) {
                                    Tournament.create({
                                          tournamentID: listItem.tournament.id,
                                          tournamentName: listItem.tournament.name,
                                          date: listItem.tournament.started_at
                                    }).exec(function createCB(err, created) {
                                          log.info('"%s" Not Found In DB - Adding', listItem.tournament.name);
                                    });

                              }

                              fetchMatches(listItem.tournament.id);
                        });
                  }
            });
      });
};

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
var simpleRequest = require('./simpleRequest.js');

module.exports = function (tournamentID) {

      function determineRegion(tournamentName) {
            tournamentName = tournamentName.toLowerCase();
            if (tournamentName.includes("west") || tournamentName.includes("wcs")) {
                  return 'western';
            } else if (tournamentName.includes("cent") || tournamentName.includes("ccs")) {
                  return 'central';
            } else if (tournamentName.includes("east") || tournamentName.includes("ecs")) {
                  return 'eastern';
            } else {
                  return 'national';
            }
      };

      function parseScore(score_csv) {
            // Counts the number of hyphens - tells us if a negative score exists
            var count = (score_csv.match(/-/g) || []).length;
            var array;

            // No negative scores
            if (count == 1) {
                  array = score_csv.split("-");
            } else {
                  // Negative score

                  if (score_csv.startsWith("-")) {
                        score_csv = score_csv.replace('-', '');
                        array = score_csv.split("-");
                        array[0] = array[0] * -1;
                  } else {
                        score_csv = score_csv.replace('-', '');
                        array = score_csv.split("-");
                        array[1] = array[1] * -1;
                  }
            }

            // Output
            scores = {};
            if (array[0] > array[1]) {
                  scores.winnerScore = array[0];
                  scores.loserScore = array[1];
            } else {
                  scores.winnerScore = array[1];
                  scores.loserScore = array[0];
            }

            return scores;
      }

      // API Fetch Variable Setup
      Match.findOne({tournamentID: tournamentID}).exec(function (err, record) {
            if (err) {
                  return;
            }

            // If not existing, add matches to database
            if (!record) {
                  var api_key = sails.config.challonge.key;
                  var include_participants = 1;
                  var include_matches = 1;
                  var options = {
                        hostname: 'api.challonge.com',
                        path: '/v1/tournaments/' + tournamentID + '.json?api_key=' + api_key + '&include_participants=' +
                        include_participants + '&include_matches=' + include_matches,
                        method: 'GET'
                  };

                  simpleRequest(options, function (singleTournament) {
                        var matches = singleTournament.tournament.matches;
                        var participants = singleTournament.tournament.participants;

                        var playerIdToName = {};

                        participants.forEach(function (listItem, index) {
                              var playerId = listItem.participant.id;
                              var playerName = listItem.participant.challonge_username;
                              var region = determineRegion(singleTournament.tournament.url);

                              playerIdToName[playerId] = playerName;

                              Player.findOne({challongeUsername: playerName}).exec(function (err, record) {
                                    if (err) {
                                          return;
                                    }

                                    // If not existing, add matches to database
                                    if (!record) {
                                          Player.create({
                                                challongeUsername: playerName,
                                                regionName: region

                                          }).exec(function createCB(err, created) {
                                                log.info('Player "%s" Not Found In DB - Adding', playerName);
                                          });
                                    } else {
                                          if (region != "national") {
                                                Player.update({
                                                      challongeUsername: playerName
                                                }, {
                                                      regionName: region
                                                }).exec(function createCB(err, created) {
                                                      log.info('Updated player "%s" with region "%s"', playerName, region);
                                                });
                                          }
                                    }
                              });
                        });

                        matches.forEach(function (listItem, index) {
                              var winnerId = listItem.match.winner_id;
                              var loserId = listItem.match.loser_id;
                              var round = listItem.match.round;
                              var date = new Date(listItem.match.updated_at);
                              var scores = parseScore(listItem.match.scores_csv);

                              var winnerName = playerIdToName[winnerId];
                              var loserName = playerIdToName[loserId];

                              Match.create({
                                    tournamentID: tournamentID,
                                    round: round,
                                    winnerName: winnerName,
                                    loserName: loserName,
                                    winnerScore: scores.winnerScore,
                                    loserScore: scores.loserScore,
                                    date: date
                              }).exec(function createCB(err, created) {
                                    log.info('Match with "%s" winning against "%s" added',
                                          winnerName,
                                          loserName);
                              });
                        });
                  });
            }
      });
};

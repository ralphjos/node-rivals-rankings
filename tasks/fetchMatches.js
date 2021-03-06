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
var fetch = require('node-fetch');
var Promise = require('bluebird');

module.exports = function (tournamentID) {

      function determineRegion(tournamentName) {
            tournamentName = tournamentName.toLowerCase();
            if (tournamentName.includes("west") || tournamentName.includes("wcs")) {
                  return 'western';
            } else if (tournamentName.includes("cent") || tournamentName.includes("ccs")) {
                  return 'central';
            } else if (tournamentName.includes("east") || tournamentName.includes("ecs")) {
                  return 'eastern';
            } else if (tournamentName.includes("sunday") || tournamentName.includes("untamed") || tournamentName.includes("saturday")) {
                  return 'europe';
            } else {
                  return 'national';
            }
      }

      function parseScore(scores_csv) {
            if (!scores_csv || scores_csv === '' || scores_csv.includes(',')) {
                  return {
                        winnerScore: 2,
                        loserScore: 0
                  }
            }
            // Counts the number of hyphens - tells us if a negative score exists
            var count = (scores_csv.match(/-/g) || []).length;
            var array;

            // No negative scores
            if (count == 1) {
                  array = scores_csv.split("-");
            } else {
                  // Negative score

                  if (scores_csv.startsWith("-")) {
                        scores_csv = scores_csv.replace('-', '');
                        array = scores_csv.split("-");
                        array[0] = array[0] * -1;
                  } else {
                        scores_csv = scores_csv.replace('-', '');
                        array = scores_csv.split("-");
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
      const api_key = sails.config.challonge.key;
      const include_matches = 1;
      const include_participants = 1;

      var matches;
      var participants;
      var tournamentName;
      var tournamentURL;

      var playerIdToName = {};
      var playerNames = new Set();
      var matchResults = [];

      return Match.findOne({tournamentID: tournamentID}).then(function (match) {
            if (!match) {
                  return fetch('https://api.challonge.com/v1/tournaments/' + tournamentID +
                        '.json?api_key=' + api_key +
                        '&include_matches=' + include_matches +
                        '&include_participants=' + include_participants)
                        .then(function (res) {
                              return res.json();
                        }).then(function (singleTournament) {
                              matches = singleTournament.tournament.matches;
                              participants = singleTournament.tournament.participants;
                              tournamentName = singleTournament.tournament.name;
                              tournamentURL = singleTournament.tournament.full_challonge_url;

                              return Promise.map(participants, function (singleParticipant) {
                                    var playerId = singleParticipant.participant.id;
                                    var playerName = singleParticipant.participant.challonge_username;
                                    var alias = singleParticipant.participant.name;
                                    var finalRank = singleParticipant.participant.final_rank;

                                    playerIdToName[playerId] = playerName;

                                    return {
                                          playerId: playerId,
                                          playerName: playerName,
                                          alias: alias,
                                          region: determineRegion(singleTournament.tournament.url),
                                          finalRank: finalRank
                                    };
                              })
                        }).then(function (participants) {
                              return Promise.map(participants, function (participant) {
                                    if (participant.finalRank) {
                                          var playerName = participant.playerName;
                                          var alias = participant.alias;
                                          var regionName = participant.region;
                                          playerNames.add(playerName);
                                          Player.findOne({challongeUsername: playerName}).then(function (record) {
                                                if (!record) {
                                                      Player.create({
                                                            challongeUsername: playerName,
                                                            region: regionName
                                                      }).then(function (player) {

                                                      });
                                                } else {
                                                      var updateCriteria = {};
                                                      var shouldUpdate = false;
                                                      if (regionName != "national" && record.region != regionName) {
                                                            updateCriteria['region'] = regionName;
                                                            shouldUpdate = true;
                                                      }

                                                      if (alias && record.alias != alias) {
                                                            updateCriteria['alias'] = alias;
                                                            shouldUpdate = true;
                                                      }

                                                      if (shouldUpdate) {
                                                            Player.update({
                                                                  challongeUsername: playerName
                                                            }, updateCriteria).then(function (player) {

                                                            });
                                                      }
                                                }
                                          });
                                    }
                              });
                        }).then(function () {
                              return Promise.map(matches, function (matchItem) {
                                    var winnerId = matchItem.match.winner_id;
                                    var loserId = matchItem.match.loser_id;
                                    var round = matchItem.match.round;
                                    var date = new Date(matchItem.match.updated_at);
                                    var scores = parseScore(matchItem.match.scores_csv);
                                    var winnerName = playerIdToName[winnerId];
                                    var loserName = playerIdToName[loserId];

                                    return Match.create({
                                          tournamentID: tournamentID,
                                          tournamentName: tournamentName,
                                          tournamentURL: tournamentURL,
                                          round: round,
                                          winnerName: winnerName,
                                          loserName: loserName,
                                          winnerScore: scores.winnerScore,
                                          loserScore: scores.loserScore,
                                          date: date
                                    }).then(function (match) {
                                          matchResults.push(match);
                                    });
                              });
                        }).then(function () {
                              return {
                                    playerNames: playerNames,
                                    matchResults: matchResults
                              }
                        });
            }

            return {
                  playerNames: new Set(),
                  matchResults: []
            };
      });

};

/**
 * Runs TrueSkill given a list of matches.  Assumes the matches are ordered from earliest to latest, and that they have
 * not been run with TrueSkill
 */
var log = require('captains-log')();
var Promise = require('bluebird');
var glicko2 = require('glicko2');

var settings = {
      tau: 0.5,
      rating: 1500,
      rd: 200,
      vol: 0.06
};

var ranking = new glicko2.Glicko2(settings);

module.exports = function (tournamentInfo) {
      var allPlayers = tournamentInfo.playerNames;
      var playerRatings = {};
      var matches = [];

      return Promise.map(allPlayers, function (challongeUsername) {
            return Player.findOne({challongeUsername: challongeUsername}).then(function (player) {
                  playerRatings[challongeUsername] =
                        ranking.makePlayer(player.ratingMu, player.ratingSigma, player.ratingVol);
            });
      }).then(function () {
            return Promise.map(tournamentInfo.matchResults, function (matchResult) {
                  var winner = playerRatings[matchResult.winnerName];
                  var loser = playerRatings[matchResult.loserName];
                  matches.push([winner, loser, 1]);
            }).then(function () {
                  ranking.updateRatings(matches);
            });
      }).then(function () {
            return Promise.map(allPlayers, function (playerName) {
                  var playerRating = playerRatings[playerName];
                  Player.update({challongeUsername: playerName},
                        {
                              ratingMu: playerRating.getRating(),
                              ratingSigma: playerRating.getRd(),
                              ratingVol: playerRating.getVol(),
                              conservativeRating: playerRating.getRating() - 2 * playerRating.getRd()
                        }
                  ).then(function (player) {
                        // updated
                  });
            });
      });
};

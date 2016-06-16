/**
 * Runs TrueSkill given a list of matches.  Assumes the matches are ordered from earliest to latest, and that they have
 * not been run with TrueSkill
 */
var log = require('captains-log')();
var Promise = require('bluebird');
var trueskill = require('trueskill')

module.exports = function (match) {

      var winnerName = match.winnerName;
      var loserName = match.loserName;

      return Promise.all([
            Player.findOne({challongeUsername: winnerName}).then(function (player) {
                  return player;
            }),
            Player.findOne({challongeUsername: loserName}).then(function (player) {
                  return player;
            })
      ]).spread(function (winner, loser) {
            if (winnerName === 'ralphjos') {
                  log(winner);
            }
            var winnerTrueskillObj = {};
            var loserTrueSkillObj = {};

            winnerTrueskillObj.skill = [winner.ratingMu, winner.ratingSigma];
            loserTrueSkillObj.skill = [loser.ratingMu, loser.ratingSigma];

            winnerTrueskillObj.rank = 1;
            loserTrueSkillObj.rank = 2;

            // log("BEFORE: ", winnerTrueskillObj);
            trueskill.AdjustPlayers([winnerTrueskillObj, loserTrueSkillObj]);
            // log("AFTER: ", winnerTrueskillObj);
            return {
                  winnerMu: winnerTrueskillObj.skill[0],
                  winnerSigma: winnerTrueskillObj.skill[1],
                  loserMu: loserTrueSkillObj.skill[0],
                  loserSigma: loserTrueSkillObj.skill[1]
            };
      }).then(function (result) {
            // log("update: ", winnerName, loserName);
            // log("result: ", result);
            if (winnerName === 'ralphjos') {
                  log(result.winnerMu, result.winnerSigma);
            }
            return Player.update({challongeUsername: winnerName},
                  {ratingMu: result.winnerMu, ratingSigma: result.winnerSigma}
            ).then(function (winner) {
                  return Player.update({challongeUsername: loserName},
                        {ratingMu: result.loserMu, ratingSigma: result.loserSigma}
                  ).then(function (loser) {
                  });
            });
      });
};

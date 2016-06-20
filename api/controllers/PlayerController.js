/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var log = require('captains-log')();

module.exports = {
    getRankings: function(req, res) {
        var region = req.param('region', 'national');

        if (region === 'national') {
            return Player.find().sort('conservativeRating DESC').exec(function(err, players) {
                return res.view('leaderboard', {
                   players: players,
                   region: region
                });
            });
        }

        var criteria = {name: region};

        return Region.findOne(criteria)
        .populate('players', {sort: 'conservativeRating DESC'}).exec(function(err, players) {
            return res.view('leaderboard', {
                players: players.players,
                region: region
            });
        })
    },

    getPlayer: function(req, res) {
        var name = req.param('name');

        return Player.findOne({challongeUsername: name})
              .populate('matchWins')
              .populate('matchLosses')
              .exec(function(err, player) {
                  var allMatches = player.matchWins.concat(player.matchLosses);
                  allMatches.sort(function (match1, match2) {
                      return match2.date - match1.date;
                  });

                  player['allMatches'] = allMatches;
                  log (player);
                  return res.view('playerInfo', {player: player});
              });
    }
};
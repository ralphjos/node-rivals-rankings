/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    national: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('leaderboard', {
                players: players
            })
        })
    },
    western: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('leaderboard', {
                players: players
            })
        })
    },
    central: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('leaderboard', {
                players: players
            })
        })
    },
    eastern: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('leaderboard', {
                players: players
            })
        })
    },
};
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
            return res.view('national', {
                players: players
            })
        })
    },
    western: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('western', {
                players: players
            })
        })
    },
    central: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('central', {
                players: players
            })
        })
    },
    eastern: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('eastern', {
                players: players
            })
        })
    },
};
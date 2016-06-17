/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getPlayers: function(req, res) {
        Player.find()
        .sort('conservativeRating DESC').exec(function(err, players) {
            return res.view('national', {
                players: players
            })
        })
    } 
};
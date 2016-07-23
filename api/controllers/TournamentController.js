/**
 * TournamentController
 *
 * @description :: Server-side logic for managing tournaments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {
	autoseed: function(req, res) {
		  var tournament = req.param('tournament');
		  var password = req.query.password;
		  
		  return TournamentService.autoseed(tournament, password)
				.then(function(message) {
					res.send(message);
				});
	}
};


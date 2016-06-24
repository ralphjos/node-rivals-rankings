/**
 * setMatchAliasesAndMains
 *
 * Sets the alias and mains of the players in each match
 */
var Promise = require('bluebird');
var log = require('captains-log')();

module.exports = function () {


	  var allPlayers = Player.find().then(function (players) {
			return players;
	  });

	  return Promise.map(allPlayers, function (player) {
			var name = player.challongeUsername;
			var mains = player.mains;
			var alias = player.alias;

			return Match.update({winnerName: name},
				  {
						winnerMains: mains,
						winnerAlias: alias
				  })
				  .then(function (matches) {
						return Match.update({loserName: name},
							  {
									loserMains: mains,
									loserAlias: alias
							  }).then(function (matches) {
						});
				  });
	  });
};

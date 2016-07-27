/**
 * This module is called by config/bootstrap.js which is ran before sails lift completes
 */
var log = require('captains-log')();
var fetch = require('node-fetch');

const WHITE_LIST = ["west", "wcs", "central", "ccs", "east", "ecs", "getgood", "national", "ncs", "nas", "amateur"];

function whiteListed(tournamentUrl) {
	  tournamentUrl = tournamentUrl.toLowerCase();

	  for (var j = 0; j < WHITE_LIST.length; j++) {
			if (tournamentUrl.includes(WHITE_LIST[j])) {
				  return true;
			}
	  }

	  return false;
}

module.exports = function () {

	  // API Fetch Variable Setup
	  const apiKey = sails.config.challonge.key;
	  const state = 'pending';
	  const subdomain = 'narivals';
	  const createdAfter = '2016-02-01';

	  return UpcomingTournament.destroy().then(function () {
			return fetch('https://api.challonge.com/v1/tournaments.json?api_key=' + apiKey +
				  '&created_after=' + createdAfter +
				  '&subdomain=' + subdomain +
				  '&state=' + state)
				  .then(function (res) {
						return res.json();
				  })
				  .then(function (allTournaments) {
						var rankedTournaments = [];
						for (var i = 0; i < allTournaments.length; i++) {
							  var tournament = allTournaments[i];
							  if (whiteListed(tournament.tournament.url)) {
									rankedTournaments.push(tournament)
							  }
						}
						return rankedTournaments;
				  })
				  .then(function (rankedTournaments) {
						var findCriteria = rankedTournaments.map(function (rankedTournament) {
							  return {
									tournamentID: rankedTournament.tournament.id
							  }
						});

						var recordsToCreate = rankedTournaments.map(function (rankedTournament) {
							  return {
									tournamentID: rankedTournament.tournament.id,
									tournamentName: rankedTournament.tournament.name,
									url: rankedTournament.tournament.full_challonge_url,
									date: rankedTournament.tournament.start_at
							  }
						});

						return UpcomingTournament.findOrCreate(findCriteria, recordsToCreate).then(function (tournaments) {
							  return tournaments;
						});
				  });
	  });
};

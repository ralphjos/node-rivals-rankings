// Tournament.js - in api/services
var log = require('captains-log')();
var fetch = require('node-fetch');
var dict = require('dict');
var api_key = sails.config.challonge.key;
var FormData = require('form-data');
var Promise = require('bluebird');
// var form = new FormData();
// form.append('a', 1);

function getTournamentParticipants(tournamentName) {
	  return fetch('https://api.challonge.com/v1/tournaments/' + tournamentName + '/participants.json' +
			'?api_key=' + api_key)
			.then(function (res) {
				  return res.json();
			}).then(function (participants) {
				  return Promise.map(participants, function (participant) {
						return {
							  'challongeUsername': participant['participant']['challonge_username'],
							  'id': participant['participant']['id']
						}
				  });
			});
}
function seedParticipant(tournamentName, participantID, participantName, seed) {
	  var url = 'https://api.challonge.com/v1/tournaments/' + tournamentName +
			'/participants/' + participantID + '.json' +
			'?api_key=' + api_key;

	  var opts = {
			method: 'PUT',
			headers: {
				  'content-type': 'application/json'
			},
			body: JSON.stringify({seed: seed})
	  };

	  return fetch(url, opts)
			.then(function (res) {
				  return res.json();
			}).then(function (res) {
				  return "Participant " + participantName + " seeded to " + seed + ".";
			});
}

module.exports = {

	  autoseed: function (tournamentName, password) {
			if (password == sails.config.autoseed.password) {
				  return Player.find().sort('conservativeRating DESC').then(function (players) {
						var playerRatings = dict();
						for (var i = 0; i < players.length; i++) {
							  var player = players[i];
							  playerRatings.set(player.challongeUsername, player.conservativeRating);
							  playerRatings[player.challongeUsername] = player.conservativeRating;
						}

						return getTournamentParticipants(tournamentName)
							  .then(function (participants) {
									return participants.filter(function (participant) {
										  return playerRatings.has(participant.challongeUsername);
									});
							  })
							  .then(function (participants) {
									participants.sort(function (participant1, participant2) {
										  return playerRatings[participant2['challongeUsername']] -
												playerRatings[participant1['challongeUsername']];
									});

									return participants;
							  }).then(function (sortedParticipants) {
									var seed = 1;
									return Promise.mapSeries(sortedParticipants, function (participant) {
										  return seedParticipant(tournamentName, participant['id'], participant['challongeUsername'], seed++);
									}).then(function (results) {
										  return results;
									});
							  });
				  });
			} else {
				  return new Promise(function (resolve, reject) {
						resolve("Incorrect password.  Ask Ralph/Kenneth for teh secrets.");
				  });
			}
	  }

};
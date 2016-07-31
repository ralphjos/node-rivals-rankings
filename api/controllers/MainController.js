/**
 * MainController
 *
 * @description :: Shows homepage with info such as upcoming tournaments, rankings, and featured streams.
 */

var log = require('captains-log')();

module.exports = {
	  main: function (req, res) {
			return Player.find().sort('conservativeRating DESC').limit(10).exec(function (err, players) {
				  return UpcomingTournament.find().sort('date ASC').exec(function (err, upcomingTournaments) {
						log (upcomingTournaments);
						return res.view('homepage', {
							  players: players,
							  upcomingTournaments: upcomingTournaments,
							  region: 'national'
						});
				  });
			});
	  }
};
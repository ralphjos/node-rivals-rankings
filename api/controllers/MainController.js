/**
 * MainController
 *
 * @description :: Shows homepage with info such as upcoming tournaments, rankings, and featured streams.
 */

var log = require('captains-log')();

module.exports = {
	  main: function (req, res) {
			return Player.find().sort('conservativeRating DESC').limit(25).exec(function (err, players) {
				  return res.view('homepage', {
						players: players,
						region: 'national'
				  });
			});
	  }
};
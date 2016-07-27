/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var log = require('captains-log')();
var Promise = require('bluebird');
var setRegions = require('./../tasks/setRegions.js');
var fetchUpcomingTournaments = require('./../tasks/fetchUpcomingTournaments');
var fetchTournamentData = require('./../tasks/fetchTournamentData.js');
var fetchMatches = require('./../tasks/fetchMatches.js');
var runGlicko2 = require('./../tasks/runGlicko2.js');
var setMains = require('./../tasks/setMains.js');
var setMatchAliasesAndMains = require('./../tasks/setMatchAliasesAndMains.js');

module.exports.bootstrap = function (cb) {

      setRegions()
            .then(fetchTournamentData)
            .then(function (tournamentIDs) {
                  return Promise.mapSeries(tournamentIDs, fetchMatches);
            }).then(function (tournamentInfos) {
                  return Promise.each(tournamentInfos, runGlicko2);
            }).then(setMains)
            .then(setMatchAliasesAndMains)
            .then(function () {
                  log("Done fetching data!")
            });
      cb();
};

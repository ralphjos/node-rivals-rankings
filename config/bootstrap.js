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
var fetchTournamentData = require('./../tasks/fetchTournamentData.js');
var fetchMatches = require('./../tasks/fetchMatches.js');
var runTrueSkill = require('./../tasks/runTrueSkill.js');

module.exports.bootstrap = function (cb) {

      fetchTournamentData()
            .then(function (tournamentIDs) {
                  return Promise.map(tournamentIDs, fetchMatches)
                        .reduce(function (prev, cur) {
                              return prev.concat(cur);
                        }, []);
            }).then(function (addedMatches) {
                  addedMatches.sort(function compare(match1, match2) {
                        return match1.date - match2.date;
                  });
                  
                  return Promise.each(addedMatches, runTrueSkill);
            }).then(function () {
                  log("DONE!")
            });
      cb();
};

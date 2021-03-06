/**
 * UpcomingTournament.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	  attributes: {
			tournamentID: {
				  type: 'integer',
				  primaryKey: true
			},
			tournamentName: {
				  type: 'string'
			},
			region: {
				  model: 'region'
			},
			url: {
				  type: 'string'
			},
			date: {
				  type: 'date'
			}
	  }
};


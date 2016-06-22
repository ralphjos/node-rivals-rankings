/**
 * Match.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        matchID: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        tournamentID: {
            model: 'tournament'
        },
        tournamentURL: {
            type: 'string'
        },
        tournamentName: {
            type: 'string'
        },
        round: {
            type: 'integer'
        },
        winnerName: {
            model: 'player'
        },
        loserName: {
            model: 'player'
        },
        winnerScore: {
            type: 'integer'
        },
        loserScore: {
            type: 'integer'
        },
        date: {
            type: 'date'
        }
    }
};


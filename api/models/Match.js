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
        round: {
            type: 'integer'
        },
        winnerID: {
            model: 'player'
        },
        loserID: {
            model: 'player'
        },
        winnerScore: {
            type: 'integer'
        },
        loserScore: {
            type: 'date'
        },
        date: {
            type: 'date'
        }
        
        
    }
};


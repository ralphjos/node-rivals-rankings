/**
 * Player.js
 *
 * @description :: It's a Player
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var log = require('captains-log')();

module.exports = {

    attributes: {
        challongeUsername: {
            type: 'string',
            primaryKey: true
        },
        alias: {
            type: 'string'
        },
        mains: {
            type: 'array',
            defaultsTo: []
        },
        ratingMu: {
            type: 'float',
            defaultsTo: 1500
        },
        ratingSigma: {
            type: 'float',
            defaultsTo: 200
        },
        ratingVol: {
            type: 'float',
            defaultsTo: 0.06
        },
        conservativeRating: {
            type: 'float',
            defaultsTo: 0.0
        },
        region: {
            model: 'region'
        },
        lastMatchDate: {
            type: 'date'
        },
        matchWinsCount: {
            type: 'integer',
            defaultsTo: 0
        },
        matchLossesCount: {
            type: 'integer',
            defaultsTo: 0
        },
        winPercentage: {
            type: 'float',
            defaultsTo: 0
        },

        // references
        matchWins: {
            collection: 'match',
            via: 'winnerName'
        },
        matchLosses: {
            collection: 'match',
            via: 'loserName'
        },
        ratingHistory: {
            collection: 'ratingHistory',
            via: 'challongeUsername'
        }
    },

    beforeCreate: function (values, cb) {
        if(values.hasOwnProperty('challongeUsername') && !values.hasOwnProperty('alias')) {
            values.alias = values.challongeUsername;
        }

        cb();
    }
};


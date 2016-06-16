/**
 * Player.js
 *
 * @description :: It's a Player
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        challongeUsername: {
            type: 'string',
            primaryKey: true
        },
        ratingMu: {
            type: 'float',
            defaultsTo: 25.0
        },
        ratingSigma: {
            type: 'float',
            defaultsTo: 25.0/3.0
        },
        conservativeRating: {
            type: 'float',
            defaultsTo: 0.0
        },
        regionID: {
            model: 'region'
        },
        lastMatchDate: {
            type: 'date'
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
    }
};


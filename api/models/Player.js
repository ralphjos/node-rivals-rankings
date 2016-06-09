/**
 * Player.js
 *
 * @description :: It's a Player
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        playerID: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        challongeUsername: {
            type: 'string'
        },
        ratingMu: {
            type: 'float'
        },
        ratingSigma: {
            type: 'float'
        },
        conservativeRating: {
            type: 'float'
        },
        regionID: {
            model: 'region'
        },

        // references
        matchWins: {
            collection: 'match',
            via: 'winnerID'
        },
        matchLosses: {
            collection: 'match',
            via: 'loserID'
        }
    }
};


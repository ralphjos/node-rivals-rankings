/**
 * Player.js
 *
 * @description :: It's a Player
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        challongeUsername: {
            model: 'player'
        },
        ratingMu: {
            type: 'float',
            defaultsTo: 25.0
        },
        ratingSigma: {
            type: 'float',
            defaultsTo: 25.0/3.0
        },
        match: {
            model: 'match'
        }
    }
};


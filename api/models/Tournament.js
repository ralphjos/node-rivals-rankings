/**
 * Tournament.js
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
        regionID: {
            model: 'region'
        },
        date: {
            type: 'date'
        },
        
        // references
        matches: {
            collection: 'match',
            via: 'tournamentID'
        }
    }
};


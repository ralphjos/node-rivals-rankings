/**
 * setRegions
 *
 * A simple task that sets all the regions.
 */

module.exports = function () {

      const REGIONS = [{name: 'national'}, {name:'western'}, {name:'central'}, {name:'eastern'}];

      return Region.findOrCreate(REGIONS).then(function(regions) {
            return regions;
      });
};

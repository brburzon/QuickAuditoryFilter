'use strict';

/**
 * @ngdoc service
 * @name appApp.sampleFilesDataAccess
 * @description
 * # sampleFilesDataAccess
 * Factory in the appApp.
 */
angular.module('appApp')
    .factory('sampleFilesDataAccess', sampleFilesDataAccess);

function sampleFilesDataAccess($resource) {
    var resource =  $resource('SAMPLE_EXPERIMENTS_LIST.json');
    
    resource.getSamples = function(onSuccess) {
        return resource.query(onSuccess);
    };

    return resource;
}

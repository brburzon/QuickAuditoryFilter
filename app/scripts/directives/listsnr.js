'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:listSnr
 * @description
 * # listSnr
 */
angular.module('appApp')
    .directive('listSnr', listSnr);

function listSnr() {
    return {
        templateUrl: 'views/listsnr.html',
        scope: { snrList: '=', add: '&', remove: '&' },
        restrict: 'E',
        transclude: true,
        replace: true,
        controller: 'ListSnrCtrl',
        controllerAs: 'vm',
        bindToController: true
    };
}

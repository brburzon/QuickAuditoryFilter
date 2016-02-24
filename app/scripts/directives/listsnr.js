'use strict';

/**
 * @ngdoc directive
 * @name qafApp.directive:listSnr
 * @description
 * # listSnr
 */
angular.module('qafApp')
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

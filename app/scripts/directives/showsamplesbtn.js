(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name appApp.directive:showSamplesBtn
     * @description
     * # showSamplesBtn
     */
    angular.module('appApp')
        .directive('showSamplesBtn', function () {
            var templateStr =  "<input class='col-xs-12 pull-right btn " +
                    "btn-primary fixSmallDevicePadding' type='button' " +
                    "value='Sample' ng-click='vm.showSamplesOption()'>";

            return {
                template: templateStr,
                scope: { reset: '&', addSignal: '&', addNoSignal: '&' },
                restrict: 'E',
                controller: 'ShowSamplesCtrl',
                controllerAs: 'vm',
                bindToController: true
            };
        });
})();

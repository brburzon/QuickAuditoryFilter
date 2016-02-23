(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:signalConfig
     * @description
     * # signalConfig
     */
    angular.module('qafApp')
        .directive('signalConfig', signalConfig);

    /** @ngInject */
    function signalConfig() {
        return {
            templateUrl: 'views/signalconfig.html',
            scope: { label: '@', value: '=' },
            relplace: true,
            restrict: 'E',
            controllerAs: 'vm',
            controller: function() {},
            bindToController: true
        };
    }

}());

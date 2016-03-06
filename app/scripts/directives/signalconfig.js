(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:signalConfig
     * @description
     * # signalConfig
     * UI component that allows the user to set numeric properties.
     */
    angular.module('qafApp')
        .directive('signalConfig', signalConfig);

    /** @ngInject */
    function signalConfig() {
        return {
            templateUrl: 'views/signalconfig.html',
            scope: { label: '@', options: '=', selected: '=' },
            relplace: true,
            restrict: 'E',
            controllerAs: 'vm',
            controller: function() {},
            bindToController: true
        };
    }

}());

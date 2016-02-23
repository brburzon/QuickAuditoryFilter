(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:responseBtn
     * @description
     * # responseBtn
     */
    angular
        .module('qafApp')
        .directive('responseBtn', responseBtn);

    /** @ngInject */
    function responseBtn ($interval) {
        var isolatedScope = {
            text: '@',
            submit: '&',
            value: '@',
            blinkDuration: '@',
            activeBtn: '=',
            state: '=',
            isEnable: '='
        };

        return {
            scope: isolatedScope,
            templateUrl: 'views/responseBtn.html',
            restrict: 'E',
            controller: ResponseBtnCtrl,
            controllerAs: 'vm',
            bindToController: true
        };
    };
})();

(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.mathInstanceFactory
     * @description
     * # mathInstanceFactory
     * Factory in the qafApp.
     */
    angular.module('qafApp')
        .factory('mathInstanceFactory', mathInstanceFactory);

    function mathInstanceFactory() {
        var factory = {};

        factory.getInstance = getInstance;

        return factory;

        function getInstance() {
            return math;
        }
    }

}());

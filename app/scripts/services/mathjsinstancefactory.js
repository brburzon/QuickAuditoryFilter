(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.mathjsInstanceFactory
     * @description
     * # mathjsInstanceFactory
     * Factory in the qafApp.
     */
    angular.module('qafApp')
        .factory('mathjsInstanceFactory', mathjsInstanceFactory);

    function mathjsInstanceFactory() {
        var factory = {};

        factory.getInstance = getInstance;

        return factory;

        function getInstance() {
            return math;
        }
    }

}());

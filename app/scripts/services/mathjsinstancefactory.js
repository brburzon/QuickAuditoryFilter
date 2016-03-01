(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.mathjsInstanceFactory
     * @description
     * # mathjsInstanceFactory
     * Factory for getting an instance of mathjs library.
     */
    angular.module('qafApp')
        .factory('mathjsInstanceFactory', mathjsInstanceFactory);

    /** @ngInject */
    function mathjsInstanceFactory() {
        var factory = {};

        factory.getInstance = getInstance;

        return factory;

        /**
         * Returns an instance of mathjs library.
         * @return {object} math - mathjs
         */
        function getInstance() {
            return math;
        }
    }

}());

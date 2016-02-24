(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.qafCore
     * @description
     * # qafCore
     * Connects the main qaf algorithm (kalmal filter) with the signal processor.
     */
    angular
        .module('qafApp')
        .factory('qafCore', qafCore);

    /** @ngInject */
    function qafCore(mathInstanceFactory) {
        var core = {};


        return core;
    }
}());

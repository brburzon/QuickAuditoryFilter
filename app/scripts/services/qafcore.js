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
    function qafCore(kalmanFilter, maskerParams, mathjsInstanceFactory) {
        var mathjs = mathjsInstanceFactory.getInstance(),
            phi = [40, 40, -30, 5],
            covariance = mathjs.diag([40*40, 40*40, 40*40, 20*20]),
            cond,
            paramIndex;

        var core = {};

        core.updateParams = updateParams;
        core.calcEnthropy = calcEnthropy;
        core.getMaskerLevel = getMaskerLevel;
        core.getUpperNotch = getUpperNotch;
        core.getLowerNotch = getLowerNotch;

        return core;


        function updateParams(response) {
            var x = [getUpperNotch(), getLowerNotch(), getMaskerLevel()],
                responseVariance = kalmanFilter.expectedResponseVariance(phi, x, cond),
                jacobian = kalmanFilter.jacobian(phi, x, cond),
                K = kalmanFilter.calcKMatrix(covariance, jacobian, responseVariance);

            phi = kalmanFilter.getNextMean(phi, x, cond, K, response);
            covariance = kalmanFilter.getNextCovariance(covariance, K, jacobian);
        }

        function calcEnthropy(signalFrequency, sampleRate) {
            cond = [signalFrequency, sampleRate];
            paramIndex = kalmanFilter.findIndexOfMinimumTotalEntropy(phi, cond, covariance);
        }

        function getMaskerLevel() {
            return maskerParams.lookupMaskerLevel(paramIndex);
        }

        function getUpperNotch() {
            return maskerParams.lookupUpperNotch(paramIndex);
        }

        function getLowerNotch() {
            return maskerParams.lookupLowerNotch(paramIndex);
        }
    }
}());

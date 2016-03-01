(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.kalmanFilter
     * @description
     * # kalmanFilter
     * Uses the Kalman Filter Algorithm to find the masker, upper notch, and
     * lower notch that corresponds with minimum entropy for the next round.
     */
    angular.module('qafApp')
        .factory('kalmanFilter', kalmanFilter);

    function kalmanFilter(mathjsInstanceFactory) {
        var ALL_OF_MASKER_LVL = initMaskerLvl(),
            ALL_OF_GU = initGu(),
            ALL_OF_GL = initGl(),
            guSize = 7,
            glSize = 9,
            maskerLvlSize = 21;

        var mathjs = mathjsInstanceFactory.getInstance();

        var kalman = {};

        kalman.findIndexOfMinimumTotalEntropy = findIndexOfMinimumTotalEntropy;

        return kalman;

        /**
         * Initialize all the possible values for upper notch.
         */
        function initGu() {
            var possibleValues = [0, 0.0833, 0.1667, 0.25, 0.3333, 0.4167, 0.5],
                result = [],
                i = 0;

            for(var guIndex = 0; guIndex < guSize; guIndex++) {
                for(var glIndex = 0; glIndex < glSize; glIndex++) {
                    for(var maskerIndex = 0; maskerIndex < maskerLvlSize; maskerIndex++) {
                        result[i++] = possibleValues[guIndex];
                    }
                }
            }
            return result;
        }

        /**
         * Initialize all the possible values for lower notch.
         */
        function initGl() {
            var possibleValues = [0, 0.075, 0.15, 0.225, 0.3, 0.375, 0.45, 0.525, 0.6],
                result = [],
                i = 0;

            for(var guIndex = 0; guIndex < guSize; guIndex++) {
                for(var glIndex = 0; glIndex < glSize; glIndex++) {
                    for(var maskerIndex = 0; maskerIndex < maskerLvlSize; maskerIndex++) {
                        result[i++] = possibleValues[glIndex];
                    }
                }
            }
            return result;
        }

        /**
         * Initialize all the possible values for the masker level.
         */
        function initMaskerLvl() {
            var possibleValues = [-10, -6.5, -3, 0.5, 4, 7.5, 11,
                                  14.5, 18, 21.5, 25, 28.5, 32, 35.5,
                                  39, 42.5, 46, 49.5, 53, 56.5, 60],
                result = [],
                i = 0;

            for(var guIndex = 0; guIndex < guSize; guIndex++) {
                for(var glIndex = 0; glIndex < glSize; glIndex++) {
                    for(var maskerIndex = 0; maskerIndex < maskerLvlSize; maskerIndex++) {
                        result[i++] = possibleValues[maskerIndex];
                    }
                }
            }
            return result;
        }

        function psychometricFunction(phi, x, cond) {
            var f     = cond[0],
                Ps    = cond[1],
                beta  = 1,
                gamma = 1 / 3,
                BW    = 0.25 * f, // bandwidth of each noise
                pu    = phi[0],
                pl    = pu,
                t     = phi[1],
                w     = phi[2],
                K     = phi[3], // ratio between masker power at threshold

                gu        = x[0],
                gl        = x[1],
                maskerLvl = x[2],

                maxgl = 0.25 + gl,
                maxgu = 0.25 + gu,

                termLowerTip  = roundedExponentialInegral(pl, maxgl) - roundedExponentialInegral(pl, gl),
                termLowerTail = roundedExponentialInegral(t, maxgl) - roundedExponentialInegral(t, gl),
                termUpperTip  = roundedExponentialInegral(pu, maxgu) - roundedExponentialInegral(pu, gu),

                term1 = f * ((1 - Math.pow(10, w / 10)) * termLowerTip + Math.pow(10, w / 10) * termLowerTail + termUpperTip),
                N0    = Ps - 10 * Math.log10(term1) - K,
                p     = gamma + (1 - gamma - (1 * Math.pow(10, -10))) * Math.pow((1 + Math.exp((maskerLvl - N0) * beta)), -1);

            return p;
        }

        function roundedExponentialInegral(p, g) {
            return -(1 / p) * (2 + p * g) * Math.exp(-p * g);
        }

        function jacobian(phi, x, cond) {
            var jacobian   = [],
                currentPhi = phi.slice(0),
                h          = Math.pow(10, -6),
                previous   = psychometricFunction(phi, x, cond);

            for(var i = 0; i < 4; i++) {
                currentPhi    = phi.slice(0);
                currentPhi[i] = currentPhi[i] + h;
                jacobian[i]   = (psychometricFunction(currentPhi, x, cond) - previous) / h;
            }

            return jacobian;
        }

        function calcKMatrix(prevCovariance, J, responseVariance) {
            var JTranspose = mathjs.transpose(J),
                calcPrevCoTimesJTranspose = mathjs.multiply(prevCovariance, JTranspose),

                calcJTimesPrevCo      = mathjs.multiply(J, prevCovariance),
                timesJTranspose       = mathjs.multiply(calcJTimesPrevCo, JTranspose),
                addResponseVariance   = mathjs.add(timesJTranspose, responseVariance),
                inverse               = mathjs.inv(addResponseVariance),
                firstCalcTimesInverse = mathjs.multiply(calcPrevCoTimesJTranspose, inverse);

            return firstCalcTimesInverse;
        }

        function getNextMean(prevMean, x, cond, K, response) {
            var responseDifference = (response - psychometricFunction(prevMean, x, cond)),
                KTimesRes          = mathjs.multiply(K, responseDifference),
                prevMeanTimesAbove = mathjs.multiply(prevMean, KTimesRes);

            return prevMeanTimesAbove;
        }

        function getNextCovariance(prevCovariance, K, jacobian) {
            var calcKTimesJ      = mathjs.multiply(K, jacobian),
                timesPrevCo      = mathjs.multiply(calcKTimesJ, prevCovariance),
                prevCoMinusAbove = mathjs.subtract(prevCovariance, timesPrevCo);

            return prevCoMinusAbove;
        }

        function expectedResponseVariance(phi, x, cond) {
            var expectedResponse = psychometricFunction(phi, x, cond);
            return expectedResponse * (1 - expectedResponse);
        }

        function predictedEntropy(phi, cond, covariance, responseCorrectness) {
            var currentMean = phi.slice(0),
                x           = [],
                result      = [];

            for(var guIndex = 0; guIndex < ALL_OF_GU.length; guIndex++) {
                for(var glIndex = 0; glIndex < ALL_OF_GL.length; glIndex++) {
                    for(var mskrIndex = 0; mskrIndex < ALL_OF_MASKER_LVL.length; mskrIndex++) {
                        x[0] = ALL_OF_GU[guIndex];
                        x[1] = ALL_OF_GL[glIndex];
                        x[2] = ALL_OF_MASKER_LVL[mskrIndex];

                        currentMean = getNextMean(currentMean, x, cond, K, responseCorrectness);
                        jacobian    = jacobian(currentMean, x, cond);

                        var responseVariance  = expectedResponseVariance(currentMean, x, cond),
                            K                 = calcKMatrix(covariance, jacobian, responseVariance),
                            predictCovariance = getNextCovariance(covariance, K, jacobian);

                        result.push(2 * (1 + Math.log(2 * Math.PI)) + 0.5 * Math.log(mathjs.det(predictCovariance)));
                    }
                }
            }

            return result;
        }

        function totalPredictedEntropy(phi, cond, covariance) {
            var correctResponse   = 1,
                incorrectResponse = 0;

            var percentCorrect           = getAllPercentCorrect(phi, cond),
                correctResponseEntropy   = predictedEntropy(phi, cond, covariance, correctResponse),
                oneMinusPrecentCorrect   = 1 - percentCorrect,
                incorrectResponseEntropy = predictedEntropy(phi, cond, covariance, incorrectResponse);

            return mathjs.add(mathjs.multiply(percentCorrect, correctResponseEntropy),
                              mathjs.multiply(oneMinusPrecentCorrect, incorrectResponseEntropy));
        }

        function getAllPercentCorrect(phi, cond) {
            var x = [],
                result = [];

            for(var guIndex = 0; guIndex < ALL_OF_GU.length; guIndex++) {
                for(var glIndex = 0; glIndex < ALL_OF_GL.length; glIndex++) {
                    for(var mskrIndex = 0; mskrIndex < ALL_OF_MASKER_LVL.length; mskrIndex++) {
                        x[0] = ALL_OF_GU[guIndex];
                        x[1] = ALL_OF_GL[glIndex];
                        x[2] = ALL_OF_MASKER_LVL[mskrIndex];

                        result.push(psychometricFunction(phi, x, cond));
                    }
                }
            }

            return result;
        }

        function findIndexOfMinimumTotalEntropy(phi, cond, covariance) {
            var totalEntropy = totalPredictedEntropy(phi, cond, covariance),
                minIndex = 0,
                minValue = totalEntropy[0],
                i = 0;

            while(i < totalEntropy.length) {
                if(totalEntropy[i] < minValue) {
                    minValue = totalEntropy[i++];
                } else if(totalEntropy[i] === minValue) {
                    minValue = Math.random() > .5 ? totalEntropy[i] : minValue;
                }
            }

            return i;
        }
    }
}());

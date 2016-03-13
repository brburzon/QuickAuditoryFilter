'use strict';

describe('Service: kalmanFilter', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var kalmanFilter,
        phi,
        covariance,
        cond,
        x;

    beforeEach(inject(function (_kalmanFilter_) {
        kalmanFilter = _kalmanFilter_;
        phi = [40, 40, -30, 5],
        covariance = math.diag([40*40, 40*40, 40*40, 20*20]),
        cond = [1000, 41000],
        x = [0.0833, 0.075, -10];
    }));

    describe('when jacobian is called, it', function() {
        it('should return an array of numbers', function() {
            var result = kalmanFilter.jacobian(phi, x, cond);
            for(var i = 0; i < result.length; i++) {
                expect(isNaN(result[i])).toBe(false);
            }
        });
    });

    describe('when calcKMatrix is called, it', function() {
        it('should return a matrix of number', function() {
            var responseVariance = kalmanFilter.expectedResponseVariance(phi, x, cond);
            var jacobian = kalmanFilter.jacobian(phi, x, cond);
            var result = kalmanFilter.calcKMatrix(covariance, jacobian, responseVariance);
            // console.log(result);
            // for(var i = 0; i < result.length; i++) {
            //     expect(isNaN(result[i])).toBe(false);
            // }
        });
    });

    describe('when expectedResponseVariance is called, it', function() {
        it('should return a number', function() {
            var result = kalmanFilter.expectedResponseVariance(phi, x, cond);
            expect(isNaN(result)).toBe(false);
        });
    });
});

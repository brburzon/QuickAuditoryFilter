'use strict';

describe('Controller: SamplesModalInstanceCtrl', function () {

    beforeEach(module('appApp'));

    var SamplesModalInstanceCtrl,
        httpBackend,
        uibModalInstance,
        sampleExercises;

    uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

    sampleExercises = [{name: 'foo.wav'}];

    beforeEach(inject(function ($controller, $httpBackend) {
        httpBackend = $httpBackend;
        SamplesModalInstanceCtrl = $controller('SamplesModalInstanceCtrl', {
            $http: httpBackend,
            $uibModalInstance: uibModalInstance,
            sampleExercises: sampleExercises
        });
    }));

    it('should be able to get instance', function() {
        expect(SamplesModalInstanceCtrl).toBeDefined();
    });
});

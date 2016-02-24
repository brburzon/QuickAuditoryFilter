'use strict';

describe('Controller: ResultCtrl', function () {

    // load the controller's module
    beforeEach(module('qafApp'));

    var ResultCtrl,
        scope,
        location,
        resultRecorder,
        audioFilesCollector,
        records;

    records = [{
        filename: 'foo.wav',
        correctAnswer: 0,
        userResponse: 0,
        correctness: true,
        timer: '10ms'
    }];

    location = jasmine.createSpyObj('$location', ['path']);

    resultRecorder = jasmine.createSpyObj('resultRecorder', ['getRecords']);
    resultRecorder.getRecords.and.returnValue(records);

    audioFilesCollector = jasmine.createSpyObj('audioFilesCollector', ['resetAll']);

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, '$broadcast');
        ResultCtrl = $controller('ResultCtrl', {
            $scope: scope,
            $location: location,
            resultRecorder: resultRecorder,
            audioFilesCollector: audioFilesCollector
        });
    }));

    it('should be able to get an instance', function() {
        expect(ResultCtrl).toBeDefined();
    });

    describe('when exportTable is called, it', function() {
        function callExportTableWith(action) {
            ResultCtrl.exportAction = action;
            ResultCtrl.exportTable();
        }

        it('should broadcast export-pdf', function() {
            callExportTableWith('pdf');
            expect(scope.$broadcast).toHaveBeenCalledWith('export-pdf');
        });

        it('should broadcast export-excel', function() {
            callExportTableWith('excel');
            expect(scope.$broadcast).toHaveBeenCalledWith('export-excel');
        });

        it('should broadcast export-doc', function() {
            callExportTableWith('doc');
            expect(scope.$broadcast).toHaveBeenCalledWith('export-doc');
        });

        it('should broadcast export-csv', function() {
            callExportTableWith('csv');
            expect(scope.$broadcast).toHaveBeenCalledWith('export-csv');
        });
    });

    describe('when getRecords is called, it', function() {
        it('should return what the resultRecorder.getRecords returned', function() {
            var returnedRecords = ResultCtrl.getRecords();
            expect(returnedRecords).toBe(records);
        });
    });
});

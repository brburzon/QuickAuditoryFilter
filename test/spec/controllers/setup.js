'use strict';

describe('Controller: SetupCtrl', function () {

    // load the controller's module
    beforeEach(module('appApp'));

    var SetupCtrl,
        scope,
        location,
        window,
        audioFilesCollector,
        deferred;

    location = {
        path: function(url) {}
    };

    window = {
        alert: function(msg) {}
    };

    audioFilesCollector = {
        signalFiles: [],
        noSignalFiles: [],
        addSignalFile: function(file) {
            this.signalFiles.push(file);
        },
        addNoSignalFile: function(file) {
            this.noSignalFiles.push(file);
        },
        removeSignalByIndex: function(index) {
            this.signalFiles.splice(index, 1);
        },
        removeNoSignalByIndex: function(index) {
            this.noSignalFiles.splice(index, 1);
        },
        getSignalFiles: function() {
            return this.signalFiles;
        },
        getNoSignalFiles: function() {
            return this.noSignalFiles;
        },
        prepAudioData: function(nreps) {},
        resetAll: function() {
            this.signalFiles.length = 0;
            this.noSignalFiles.length = 0;
        }
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        audioFilesCollector.prepAudioData = function() {
            var deferred = $q.defer();
            deferred.resolve('foo');
            return deferred.promise;
        };
        SetupCtrl = $controller('SetupCtrl', {
            $scope: scope,
            $location: location,
            $window: window,
            audioFilesCollector: audioFilesCollector
        });
        deferred = $q.defer();
        spyOn(audioFilesCollector, 'prepAudioData').and.returnValue(deferred.promise);
        spyOn(audioFilesCollector, 'resetAll');
        spyOn(location, 'path');
        spyOn(window, 'alert');
    }));

    afterEach(function() {
        SetupCtrl.signalFiles = [];
        SetupCtrl.noSignaleFiles = [];
        audioFilesCollector.signalFiles = [];
        audioFilesCollector.noSignalFiles = [];
    });

    it('should be able to get an instance', function () {
        expect(SetupCtrl).toBeDefined();
    });

    describe('when signal files changes, it', function() {
        it('should update signalFiles when a signal file is added',
           function() {
               expect(SetupCtrl.signalFiles).toEqual([]);
               SetupCtrl.addSignalFile('mockedFile');
               scope.$apply();
               expect(SetupCtrl.signalFiles).toEqual(['mockedFile']);
           });
    });

    describe('when no signal files changes, it', function() {
        it('should only change when change in no signal files is detected',
           function() {
               expect(SetupCtrl.noSignalFiles).toEqual([]);
               audioFilesCollector.addNoSignalFile('mockedFile');
               scope.$apply();
               expect(SetupCtrl.noSignalFiles).toEqual(['mockedFile']);
           });
    });
    
    describe('when reset is called, it', function() {
        it('should reset nreps to its default value', function() {
            var defaultNreps = SetupCtrl.nreps;
            SetupCtrl.nreps++; 
            expect(SetupCtrl.nreps).toBe(defaultNreps + 1);
            SetupCtrl.reset();
            expect(SetupCtrl.nreps).toBe(defaultNreps);
        });

        it('should reset all collected files', function() {
            SetupCtrl.reset();
            expect(audioFilesCollector.resetAll).toHaveBeenCalled();
        });
    });


    describe('when save is called, it', function() {
        it('should call audioFilesCollector.prepAudioData', function() {
            SetupCtrl.save();
            expect(audioFilesCollector.prepAudioData).toHaveBeenCalled();
        });

        it('should call $window.alert if it failed prepairing data', function() {
            SetupCtrl.save();
            var onFailureTask = audioFilesCollector.prepAudioData(1);
            expect(typeof onFailureTask.then).toEqual('function');
            var err = 'some error';
            deferred.reject(err);
            onFailureTask.then(err);
            scope.$apply();
            expect(window.alert).toHaveBeenCalled();
        });

        it('should should change location if successful', function() {
            SetupCtrl.save();
            var onSuccessTask = audioFilesCollector.prepAudioData(1); 
            expect(typeof onSuccessTask.then).toEqual('function');
            var data = 'data';
            deferred.resolve(data);
            onSuccessTask.then(data);
            scope.$apply();
            expect(location.path).toHaveBeenCalled();
        });
    });
});

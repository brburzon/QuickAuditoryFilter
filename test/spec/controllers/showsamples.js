'use strict';

describe('Controller: ShowSamplesCtrl', function () {

    beforeEach(module('appApp'));

    var ShowSamplesCtrl,
        uibModal,
        sampleFilesDataAccess,
        deferred;

    uibModal = jasmine.createSpyObj('$uibModal', ['open']);
    sampleFilesDataAccess
        = jasmine.createSpyObj('sampleFilesDataAccess', ['getSamples']);

    beforeEach(inject(function ($controller, $q) {
        deferred = $q.defer();
        ShowSamplesCtrl = $controller('ShowSamplesCtrl', {
            $uibModal: uibModal,
            sampleFilesDataAccess: sampleFilesDataAccess
        });
    }));

    it('should be able to get an instance of my controller', function () {
        expect(ShowSamplesCtrl).toBeDefined();
    });

    describe('when showSamplesOption is called, it', function() {
        beforeEach(function() {
            deferred.resolve([]);
            uibModal.open.and.returnValue({result: deferred.promise});
        });

        it('should call open', function() {
            ShowSamplesCtrl.showSamplesOption();
            expect(uibModal.open).toHaveBeenCalled();
        });
    });
});

'use strict';

describe('Controller: FileReaderCtrl', function () {

    beforeEach(module('appApp'));

    var FileReaderCtrl,
        scope,
        Upload,
        fakeFile;

    function File(bytes, name) {
        this.bytes = bytes;
        this.name = name;
    }

    Upload = jasmine.createSpy();
    fakeFile = new File([0], 'foo.wav');

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FileReaderCtrl = $controller('FileReaderCtrl', {
            $scope: scope,
            Upload: Upload
        });
        spyOn(scope, '$digest');
    }));

    it('should be able to get an instance of my controller', function () {
        expect(FileReaderCtrl).toBeDefined();
    });

    describe('when uploadFiles is called, it', function() {
        it('should ignore null param', function() {
            FileReaderCtrl.uploadFiles(null);
            expect(scope.$digest).not.toHaveBeenCalled();
        });

        it('should ignore undefined param', function() {
            FileReaderCtrl.uploadFiles();
            expect(scope.$digest).not.toHaveBeenCalled();
        });
    });
});

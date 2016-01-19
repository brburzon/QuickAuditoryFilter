'use strict';

describe('Service: sampleFilesDataAccess', function () {

    // load the service's module
    beforeEach(module('appApp'));

    // instantiate service
    var sampleFilesDataAccess,
        $httpBackend;
    beforeEach(inject(function (_sampleFilesDataAccess_, _$httpBackend_) {
        sampleFilesDataAccess = _sampleFilesDataAccess_;
        $httpBackend = _$httpBackend_;
    }));

    it('should do something', function () {
        expect(!!sampleFilesDataAccess).toBe(true);
    });

    describe('when get is called, it', function() {
        it('should return a list of objects about the sample files', function() {
            var testUrl = 'SAMPLE_EXPERIMENTS_LIST.json',
                filesFromJson = [{ name: 'foo.wav', url: 'assets/samples/foo.wav' }];
            $httpBackend
                .expectGET(testUrl)
                .respond(filesFromJson);
            var result = sampleFilesDataAccess.getSamples();
            $httpBackend.flush();
            expect(result[0].name).toEqual(filesFromJson[0].name);
        });
    });
});

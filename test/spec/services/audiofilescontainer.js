'use strict';

describe('Service: audioFilesContainer', function () {

    // instantiate service
    var audioFilesContainer,
        fileDecoderMock;

    fileDecoderMock = {
        decode: function(filename, arrayBuffer) {
            //mock
        }
    };

    beforeEach(function() {
        module('appApp', function($provide) {
            spyOn(fileDecoderMock, 'decode');
            $provide.value('audioDataDecoder', fileDecoderMock);
        });
        inject(function (_audioFilesContainer_) {
            audioFilesContainer = new _audioFilesContainer_();
        });
    });

    it('should be able to get an instance of this service', function () {
        expect(!!audioFilesContainer).toBe(true);
    });

    describe('When add is called, it', function() {
        it('should add file to array', function() {
            var file = { name: 'foo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(file);
            var files = audioFilesContainer.getFiles();
            expect(files).toEqual([file]);
        });

        it('should keep the files sorted by name', function() {
            var filea = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileC = { name: 'cfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileB);
            audioFilesContainer.add(filea);
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileC);
            var shouldBeSorted = audioFilesContainer.getFiles();
            expect(shouldBeSorted).toEqual([filea, fileA, fileB, fileC]);
        });

        it('should throw error if file is null or undefined', function() {
            var emptyFile = undefined; // not defined
            function shouldThrowError() {
                audioFilesContainer.add(emptyFile);               
            }
            expect(shouldThrowError).toThrow(jasmine.any(String));
        });
    });

    describe('When removeByIndex is called, it', function() {
        it('should remove the file from the given index', function() {
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileC = { name: 'cfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileB);
            audioFilesContainer.add(fileC);
            audioFilesContainer.removeByIndex(1);
            var files = audioFilesContainer.getFiles();
            expect(files).toEqual([fileA, fileC]);
        });
    });

    describe('when getFiles is called, it', function() {
        it('should start empty', function() {
            var files = audioFilesContainer.getFiles();
            expect(files).toEqual([]);
        });

        it('should return the list of files', function() {
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileC = { name: 'cfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileB);
            audioFilesContainer.add(fileC);
            var files = audioFilesContainer.getFiles();
            expect(files).toEqual([fileA, fileB, fileC]);
        });
    });

    describe('when getDecodedAudioData is called, it', function() {
        it('should return all decoded files', function() {
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileB);
            var decodedFiles = audioFilesContainer.getDecodedAudioData();
            expect(fileDecoderMock.decode.calls.count()).toEqual(2);
        });
    });

    describe('when clearAll is called, it', function() {
        it('should clear all files', function() {
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileC = { name: 'cfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileB);
            audioFilesContainer.add(fileC);
            audioFilesContainer.clearAll();
            var files = audioFilesContainer.getFiles();
            expect(files).toEqual([]); 
        });

        it('should clear all decoded files', function() {
            var fileA = { name: 'afoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileB = { name: 'Bfoo.wav', arrayBuffer: new ArrayBuffer() };
            var fileC = { name: 'cfoo.wav', arrayBuffer: new ArrayBuffer() };
            audioFilesContainer.add(fileA);
            audioFilesContainer.add(fileB);
            audioFilesContainer.add(fileC);
            audioFilesContainer.clearAll();
            var decodedFiles = audioFilesContainer.getDecodedAudioData();
            expect(decodedFiles).toEqual([]); 
        }); 
    });
});

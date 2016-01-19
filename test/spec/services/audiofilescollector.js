'use strict';

describe('Service: audioFilesCollector', function () {

    var audioFilesCollector,
        decoderMock;

    decoderMock = {
        decode: function(filename, arrayBuffer) {
            //mock
        }
    };

    beforeEach(function() {
        module('appApp', function($provide) {
            spyOn(decoderMock, 'decode');
            $provide.value('audioDataDecoder', decoderMock);
        });
        inject(function (_audioFilesCollector_) {
            audioFilesCollector = _audioFilesCollector_;
        });
    });

    it('should do something', function () {
        expect(!!audioFilesCollector).toBe(true);
    });

    describe('when addSignalFile is called, it', function() {
        it('should add file to signal container', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(file);
            var files = audioFilesCollector.getSignalFiles();
            expect(files).toEqual([file]);
        });
   });

    describe('when removeSignalFileByIndex is called, it', function() {
        it('should remove signal file from signal container', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(fileA);
            audioFilesCollector.addSignalFile(fileB);
            audioFilesCollector.addSignalFile(fileC);
            audioFilesCollector.removeSignalFileByIndex(1);
            var files = audioFilesCollector.getSignalFiles();
            expect(files).toEqual([fileA, fileC]); 
        }); 
    });

    describe('when getSignalFiles is called, it', function() {
        it('should start empty', function() {
            var files = audioFilesCollector.getSignalFiles();
            expect(files).toEqual([]);
        });

        it('should return the list of signal file', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(fileA);
            audioFilesCollector.addSignalFile(fileB);
            audioFilesCollector.addSignalFile(fileC);
            var files = audioFilesCollector.getSignalFiles();
            expect(files).toEqual([fileA, fileB, fileC]);
        });
    });

    describe('when prepAudioData is called, it', function() {
        it('should resize decoded signal data before returning it', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(fileA);
            audioFilesCollector.addSignalFile(fileB);
            audioFilesCollector.addSignalFile(fileC);
            var nreps = 5,
                expextedLength,
                audioDataLength;
            audioFilesCollector.prepAudioData(nreps)
                .then(function() {
                    var  expextedLength
                            = nreps * audioFilesCollector.getSignalFiles().length,
                        audioDataLength
                            = audioFilesCollector.getSignalAudioData().length;
                    expect(audioDataLength).toBe(expextedLength);
                });
        });

        it('should shuffle decoded signal data before returning it', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(fileA);
            audioFilesCollector.addSignalFile(fileB);
            audioFilesCollector.addSignalFile(fileC);
            var nreps = 20,
                audioDataA,
                audioDataB,
                audioDataC;
            audioFilesCollector.prepAudioData(nreps)
                .then(function() {
                    audioDataA = audioFilesCollector.getSignalAudioData(),
                    audioDataB = audioFilesCollector.getSignalAudioData(),
                    audioDataC = audioFilesCollector.getSignalAudioData();
                    expect(audioDataA !== audioDataB).toBe(true);
                    expect(audioDataB !== audioDataC).toBe(true);
                    expect(audioDataC !== audioDataA).toBe(true);
                });
        });

        it('should not resize decoded no signal array (unlike signal files)', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(fileA);
            audioFilesCollector.addNoSignalFile(fileB);
            audioFilesCollector.addNoSignalFile(fileC);
            var nreps = 1;
            audioFilesCollector.prepAudioData(nreps)
                .then(function() {
                    var files = audioFilesCollector.getNoSignalAudioData();
                    expect(files.length).toBe(3);
                });
        });

        it('should shuffle the decoded no signal audio data', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(fileA);
            audioFilesCollector.addNoSignalFile(fileB);
            audioFilesCollector.addNoSignalFile(fileC);
            var nreps = 1;
            audioFilesCollector.prepAudioData(nreps)
                .then(function() {
                    var audioDataA = audioFilesCollector.getNoSignalAudioData(),
                        audioDataB = audioFilesCollector.getNoSignalAudioData(),
                        audioDataC = audioFilesCollector.getNoSignalAudioData();
                    expect(audioDataA !== audioDataB).toBe(true);
                    expect(audioDataB !== audioDataC).toBe(true);
                    expect(audioDataC !== audioDataA).toBe(true);
                });
       });
    });

    describe('when getSignalAudioData is called, it', function() {
        it('should be empty before data is preped', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addSignalFile(file);
            var audioData = audioFilesCollector.getSignalAudioData();
            expect(audioData).toEqual([]);
        });
    });

    describe('when getNoSignalAudioData is called, it', function() {
        it('should be empty before data is preped', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(file);
            var audioData = audioFilesCollector.getSignalAudioData();
            expect(audioData).toEqual([]);
        });
    });

    describe('when addNoSignalFile is called, it', function() {
        it('should add file to no signal container', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(file);
            var files = audioFilesCollector.getNoSignalFiles(); 
            expect(files).toEqual([file]);
        });
    });

    describe('when removeNoSignalFileByIndex is called, it', function() {
                it('should remove file from no signal container', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(fileA);
            audioFilesCollector.addNoSignalFile(fileB);
            audioFilesCollector.addNoSignalFile(fileC);
            audioFilesCollector.removeNoSignalFileByIndex(1);
            var files = audioFilesCollector.getNoSignalFiles();
            expect(files).toEqual([fileA, fileC]); 
        }); 
    });

    describe('when getNoSignalFiles is called, it', function() {
        it('should start empty', function() {
            var files = audioFilesCollector.getNoSignalFiles();
            expect(files).toEqual([]);
        });

        it('should return the list of signal file', function() {
            var fileA = { name: 'fooA', arrayBuffer: new ArrayBuffer() },
                fileB = { name: 'fooB', arrayBuffer: new ArrayBuffer() },
                fileC = { name: 'fooC', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(fileA);
            audioFilesCollector.addNoSignalFile(fileB);
            audioFilesCollector.addNoSignalFile(fileC);
            var files = audioFilesCollector.getNoSignalFiles();
            expect(files).toEqual([fileA, fileB, fileC]);
        });
    });

    describe('when  is called, it', function() {
       
    });

    describe('when resetAll is called, it', function() {
        it('should clear all files from signal container', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(file);
            audioFilesCollector.resetAll();
            var files = audioFilesCollector.getNoSignalFiles();
            expect(files).toEqual([]);
        });

        it('should clear all decoded files from signal container', function() {
            var file = { name: 'foo', arrayBuffer: new ArrayBuffer() };
            audioFilesCollector.addNoSignalFile(file);
            audioFilesCollector.resetAll();
            var files = audioFilesCollector.getNoSignalAudioData();
            expect(files).toEqual([]);
        });
        it('should clear all files from no signal container', function() {});
        it('should clear all decoded files from no signal container', function() {});
    });
});

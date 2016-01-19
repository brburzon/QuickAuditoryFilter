'use strict';

describe('Service: audioDataDecoder', function () {

    // instantiate service
    var audioDataDecoder,
        $q,
        $scope,
        audioContext,
        webAudioMock;

    webAudioMock = {
        getInstance: function() {
            return audioContext;
        }
    };

    audioContext = {
        decodeAudioData: function(arrayBuffer, onSuccess, onFail) {
            if(typeof arrayBuffer !== 'object')
                onFail('wrong type');
            var buffer = {
                duration: 1.0
            };
            onSuccess(buffer);
        }
    };

    beforeEach(function() {
        module('appApp', function($provide) {
            $provide.value('webAudioContextFactory', webAudioMock);
        });
        inject(function(_audioDataDecoder_) {
            audioDataDecoder = _audioDataDecoder_;
        });
        spyOn(audioContext, 'decodeAudioData');
    });
    
    

    it('should do something', function () {
        expect(!!audioDataDecoder).toBe(true);
    });

    describe('When decode is called, it', function() {
        it('should call audioContext.decodeAudioData', function() {
            var filename = 'foo',
                arrayBuffer = 'bar';
            audioDataDecoder.decode(filename, arrayBuffer);
            expect(audioContext.decodeAudioData.calls.any()).toBe(true);
        });

        it('should call context.decodeAudioData with the provided arrayBuffer', function() {
            var filename = 'foo',
                arrayBuffer = new ArrayBuffer(),
                callBack = jasmine.any(Function);
            audioDataDecoder.decode(filename, arrayBuffer);
            expect(audioContext.decodeAudioData).toHaveBeenCalledWith(arrayBuffer, callBack, callBack);
        });

        it('should ', function() {
            var filename = 'foo',
                arrayBuffer = new ArrayBuffer();
            // expect()
        });
    });
});

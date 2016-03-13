'use strict';

describe('Service: maskerParams', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var maskerParams,
        upperNotchSize = 7,
        lowerNotchSize = 9,
        maskerLvlSize = 21;

    beforeEach(inject(function (_maskerParams_) {
        maskerParams = _maskerParams_;
    }));

    describe('when maskerParams is initialized, it', function() {
        it('should initialize masker level array with the right size', function() {
            var expectedSize = (upperNotchSize * lowerNotchSize * maskerLvlSize) - 1;

            expect(maskerParams.lookupMaskerLevel(-1)).toBeUndefined();
            expect(maskerParams.lookupMaskerLevel(0)).toBeDefined();
            expect(maskerParams.lookupMaskerLevel(expectedSize)).toBeDefined();
            expect(maskerParams.lookupMaskerLevel(expectedSize + 1)).toBeUndefined();
        });

        it('should initialize upper notch array with the right size', function() {
            var expectedSize = (upperNotchSize * lowerNotchSize * maskerLvlSize) - 1;

            expect(maskerParams.lookupUpperNotch(-1)).toBeUndefined();
            expect(maskerParams.lookupUpperNotch(0)).toBeDefined();
            expect(maskerParams.lookupUpperNotch(expectedSize)).toBeDefined();
            expect(maskerParams.lookupUpperNotch(expectedSize + 1)).toBeUndefined();
        });

        it('should initialize lower notch array with the right size', function() {
            var expectedSize = (upperNotchSize * lowerNotchSize * maskerLvlSize) - 1;

            expect(maskerParams.lookupMaskerLevel(-1)).toBeUndefined();
            expect(maskerParams.lookupMaskerLevel(0)).toBeDefined();
            expect(maskerParams.lookupMaskerLevel(expectedSize)).toBeDefined();
            expect(maskerParams.lookupMaskerLevel(expectedSize + 1)).toBeUndefined();
        });

        it('should initialize masker level in the right order', function() {
            var intervalSize = maskerLvlSize,
                i;

            for(i = 0; i < intervalSize; i++) {
                expect(maskerParams.lookupMaskerLevel(i)).toBe(maskerParams.lookupMaskerLevel(i + maskerLvlSize));
            }

            expect(maskerParams.lookupMaskerLevel(i)).not.toBe(maskerParams.lookupMaskerLevel(i + 1));
        });

        it('should initialize upper notch in the right order', function() {
            var intervalSize = maskerLvlSize,
                i;

            for(i = 0; i < intervalSize; i++) {
                expect(maskerParams.lookupUpperNotch(i)).toBe(maskerParams.lookupUpperNotch(i + intervalSize));
            }

            expect(maskerParams.lookupUpperNotch(i)).not.toBe(maskerParams.lookupUpperNotch(1));
        });

        it('should initialize lower notch in the right order', function() {
            var intervalSize = maskerLvlSize * upperNotchSize,
                i;

            for(i = 0; i < intervalSize; i++) {
                expect(maskerParams.lookupMaskerLevel(i)).toBe(maskerParams.lookupMaskerLevel(i + intervalSize));
            }

            expect(maskerParams.lookupMaskerLevel(i)).not.toBe(maskerParams.lookupMaskerLevel(1));
        });
    });


});

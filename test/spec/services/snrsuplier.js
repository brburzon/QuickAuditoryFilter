'use strict';

describe('Service: snrSuplier', function () {

    // load the service's module
    beforeEach(module('appApp'));

    // instantiate service
    var snrSuplier,
        snrCollection;
    beforeEach(inject(function (_snrSuplier_, _snrCollection_) {
        snrSuplier = _snrSuplier_;
        snrCollection = _snrCollection_;
    }));

    it('should do something', function () {
        expect(!!snrSuplier).toBe(true);
    });

    beforeEach(function() {
        snrCollection.addSnr(1);
        snrCollection.addSnr(2);
        snrCollection.addSnr(3);
        snrCollection.addSnr(4);
        snrCollection.addSnr(5);
    });

    describe('when prepSnr is called, it', function() {
        it('should resize array according to nreps', function() {
            var nreps = 3;
            snrSuplier.prepSnr(nreps);
            var actualLength = nreps * snrCollection.getSnrList().length;
            var list = snrSuplier.getPreparedSnr();
            expect(list.length).toBe(actualLength);
        });

        it('should shuffle the array', function() {
            var nreps = 5;
            snrSuplier.prepSnr(nreps);
            var firstPrep = snrSuplier.getPreparedSnr();
            snrSuplier.prepSnr(nreps);
            var secodondPrep = snrSuplier.getPreparedSnr();
            snrSuplier.prepSnr(nreps);
            var thirdPrep = snrSuplier.getPreparedSnr();
            expect(firstPrep).not.toEqual(secodondPrep); 
            expect(secodondPrep).not.toEqual(thirdPrep); 
            expect(thirdPrep).not.toEqual(firstPrep); 
        });
    });

    describe('when getPreparedSnr is called, it', function() {
        it('should start empty', function() {
            var prepSnr = snrSuplier.getPreparedSnr();
            expect(prepSnr).toEqual([]);
        });

        it('should return the prepared list of snr', function() {
            var nreps = 5;
            snrSuplier.prepSnr(nreps);
            var prepSnr = snrSuplier.getPreparedSnr(),
                originalSnr = snrCollection.getSnrList();
            expect(prepSnr).not.toEqual(originalSnr); 
        });
    });
});

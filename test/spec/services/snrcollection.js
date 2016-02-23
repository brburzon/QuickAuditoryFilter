'use strict';

describe('Service: snrCollection', function () {

  // load the service's module
  beforeEach(module('qafApp'));

  // instantiate service
  var snrCollection;
  beforeEach(inject(function (_snrCollection_) {
    snrCollection = _snrCollection_;
  }));

  it('should do something', function () {
    expect(!!snrCollection).toBe(true);
  });

    describe('when addSnr is called, it', function() {
        function addSnrs(array) {
            for(var i = 0; i < array.length; i++) {
                snrCollection.addSnr(array[i]);
            }
        }

        it('should add to the list', function() {
            addSnrs([1]);
            var list = snrCollection.getSnrList();
            expect(list).toEqual([1]);
        });

        it('should keep sorted sorted', function() {
            addSnrs([2, 1, 3]);
            var list = snrCollection.getSnrList();
            expect(list).toEqual([1, 2, 3]);

        });
    });

    describe('when removeSnrByIndex is called, it', function() {
        beforeEach(function() {
            snrCollection.addSnr(0);
            snrCollection.addSnr(1);
            snrCollection.addSnr(2);
        });

        it('should remove snr from the list', function() {
            var list;
            snrCollection.removeSnrByIndex(1);
            list = snrCollection.getSnrList();
            expect(list).toEqual([0, 2]); 
        });
    });

    describe('when getSnrList is called, it', function() {
        it('should start empty', function() {
            var list = snrCollection.getSnrList();
            expect(list).toEqual([]);
        });

        it('should return the list of snr', function() {
            snrCollection.addSnr(1);
            snrCollection.addSnr(2);
            var list = snrCollection.getSnrList();
            expect(list).toEqual([1,2]);
        });

        it('should return a copy and not the reference for immutability', function() {
            snrCollection.addSnr(2);
            var list = snrCollection.getSnrList();
            list.push('foo');
            var immutable = snrCollection.getSnrList();
            expect(list).not.toEqual(immutable);
        });
    });

    describe('when resetAll is called, it', function() {
        it('should clear all arrays', function() {
            snrCollection.addSnr(1);
            var snrList = snrCollection.getSnrList();
            expect(snrList).toEqual([1]);

            snrCollection.resetAll();

            snrList = snrCollection.getSnrList();
            expect(snrList).toEqual([]);
        });
    });
});

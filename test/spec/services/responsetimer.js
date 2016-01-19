'use strict';

describe('Service: responseTimer', function () {

    // load the service's module
    beforeEach(module('appApp'));

    // instantiate service
    var responseTimer,
        $interval;
    beforeEach(inject(function (_responseTimer_, _$interval_) {
        responseTimer = _responseTimer_;
        $interval = _$interval_;
    }));

    it('should be able to get an instance of my factory', function () {
        expect(!!responseTimer).toBe(true);
    });

    describe('when restart is called, it', function() {
        it('should start timer', function() {
            responseTimer.restart();
            $interval.flush(1);            
            var time = responseTimer.getTime();
            expect(time).not.toEqual('0ms');
        });

        it('should always from zero', function() {
            responseTimer.restart();
            var time = responseTimer.getTime();
            expect(time).toEqual('0ms');

            $interval.flush(50);
            var laterTime = responseTimer.getTime();
            expect(laterTime).toEqual('50ms');

            responseTimer.restart();
            var restartedTime = responseTimer.getTime();
            expect(restartedTime).toEqual('0ms');
        });

        
        it('should increment timer every one milliseconds', function() {
            responseTimer.restart();
            var time = responseTimer.getTime();
            expect(time).toEqual('0ms');
            $interval.flush(1);

            time = responseTimer.getTime();
            expect(time).toEqual('1ms');
            $interval.flush(1);

            time = responseTimer.getTime();
            expect(time).toEqual('2ms');
        });
    });    

    describe('when getTime is called, it', function() {
        it('should start as 0ms', function() {
            var time = responseTimer.getTime();
            expect(time).toEqual('0ms');
        });

        it('should return current timer value', function() {
            responseTimer.restart();
            $interval.flush(10);
            var time = responseTimer.getTime();
            expect(time).toEqual('10ms');
        });
    }); 

    describe('when pause is called, it', function() {
        it('should pause timer', function() {
            responseTimer.restart();
            $interval.flush(10);
            var time = responseTimer.getTime();
            expect(time).toEqual('10ms');

            responseTimer.pause();
            var pausedTime = responseTimer.getTime();
            expect(pausedTime).toEqual('10ms');
        });
    });
});

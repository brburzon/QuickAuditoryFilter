'use strict';

describe('Directive: signalLevelInputBox', function () {

    var element,
        dom,
        scope,
        userConfig;

    beforeEach(module('qafApp'));
    beforeEach(inject(function ($rootScope, _userConfig_, $compile) {
        scope = $rootScope.$new();
        userConfig = _userConfig_;
        dom = angular.element('<signal-level-input-box class="foo bar"></signal-level-input-box>');
        dom = $compile(dom)(scope);
        element = dom.find('input');
    }));

    it('should make hidden element visible', function() {
        expect(dom.html()).toEqual('<input type="number" min="0" class="vm.class ng-pristine ng-untouched' +
                                       ' ng-valid" value="1" ng-model="vm.value" ng-change="vm.setSignalLevel()">');
    });

    describe('when initialized, it', function() {
        it('should start with a value 1', function() {
            var value = element.val();
            expect(parseFloat(value)).toBe(1);
        }); 
    });

    describe('when the signal level has change is called, it', function() {
        it('should increment the signal level from the view', function() {
            var currentVal = element.val();
            element.val(currentVal + 1);
            var newVal = element.val();
            expect(newVal).toBe(currentVal + 1);
        });

        it('should increment the signal level from the userConfig', function() {
            var currentVal = userConfig.getSignalLevel();
            element.controller('ngModel').$setViewValue(currentVal + 1);
            var newVal = userConfig.getSignalLevel();
            expect(newVal).toBe(currentVal + 1);
        });
    });
});

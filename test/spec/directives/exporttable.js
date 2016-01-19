'use strict';

describe('Directive: exportTable', function () {

    // load the directive's module
    beforeEach(module('appApp'));

    var element,
        scope,
        compile;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
        element = angular.element('<export-table></export-table>');
        element = compile(element)(scope);
    }));

    it('should stay hidden', function () {
        expect(element.text()).toBe('');
    });
});

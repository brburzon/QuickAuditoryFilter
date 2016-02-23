'use strict';

describe('Directive: keyboardListener', function () {

  // load the directive's module
  beforeEach(module('qafApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<keyboard-listener></keyboard-listener>');
    element = $compile(element)(scope);
      expect(element.text()).toBe('');
  }));
});

'use strict';

describe('Directive: responseBtn', function () {

  // load the directive's module
  beforeEach(module('qafApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<response-btn></response-btn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});

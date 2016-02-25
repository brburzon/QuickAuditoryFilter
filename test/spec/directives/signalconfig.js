'use strict';

describe('Directive: signalConfig', function () {

  // load the directive's module
  beforeEach(module('qafApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signal-freq-input-box></signal-freq-input-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});

'use strict';

describe('Directive: fileReader', function () {

    // load the directive's module
    beforeEach(module('appApp'));

    var element,
        scope,
        controllerMock;

    var templateStr = '<a ng-href="" class="text-center list-group-item"' +
            ' ngf-select="vm.uploadFiles($files, $invalidFiles)" multiple' +
            'accept="audio/*" ngf-max-size="1MB">Upload Files</a>';


    beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
        $httpBackend.expectGET('views/filereader.html').respond(templateStr);
        scope = $rootScope.$new();
        element = angular.element('<file-reader></file-reader>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should make hidden element visible', function () {
        expect(element.text()).toBe('');
    });

});

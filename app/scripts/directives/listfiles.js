'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:listFiles
 * @description
 * # listFiles
 */
angular.module('appApp')
    .directive('listFiles', listFiles);

function listFiles() {
    return {
        templateUrl: 'views/listfiles.html',
        scope: { files: '=', remove: '&' },
        restrict: 'E',
        transclude: true,
        replace: true,
        controller: ListFilesCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: link
    };

    function link(scope, elem, attr, ctrl, transclude) {
        elem.find('#place-holder').replaceWith(transclude());
    }

    function ListFilesCtrl() {}
}

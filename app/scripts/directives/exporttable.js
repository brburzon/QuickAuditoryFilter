(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:exportTable
     * @description
     * # exportTable
     */
    angular
        .module('qafApp')
        .directive('exportTable', exportTable);

    function exportTable() {
        return {
            restrict: 'AC',
            link: postLink
        };
    }

   function postLink(scope, element, attrs) {
        scope.$on('export-pdf', function(e, d){
            element.tableExport({ type:'pdf',
                                  escape:false,
                                  pdfFontSize: 12 });
        });
        scope.$on('export-excel', function(e, d){
            element.tableExport({ type:'excel', escape:false });
        });
        scope.$on('export-doc', function(e, d){
            element.tableExport({ type: 'doc', escape:false });
        });
    }


})();

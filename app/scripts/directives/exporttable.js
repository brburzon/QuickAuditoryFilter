(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:exportTable
     * @description
     * # exportTable
     * Responsible for exporting the result table into various formats.
     */
    angular
        .module('qafApp')
        .directive('exportTable', exportTable);

    /** @ngInject */
    function exportTable() {
        return {
            restrict: 'AC',
            link: postLink
        };

        /**
         * Listens for any export events and starts the export with some
         * configuration.
         * @param {object} scope - same as $scope
         * @param {object} element - directive element 
         * @param {object} attrs - directive attributes
         */
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
    }
})();

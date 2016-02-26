(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ResultCtrl
     * @description
     * # ResultCtrl
     * Responsible for user actions while in result page.
     */
    angular
        .module('qafApp')
        .controller('ResultCtrl', ResultCtrl);

    /** @ngInject */
    function ResultCtrl($scope, $location, resultRecorder) {
        var records = resultRecorder.getRecords();

        var vm = this;

        vm.exportAction = 'excel';
        vm.exportTable = exportTable;
        vm.getRecords = getRecords;
        vm.reset = reset;

        /**
         * Depending on the value of the vm.exportAction, exports the table
         * into pdf, excel, doc, and csv format.
         */
        function exportTable() {
            switch(vm.exportAction){
            case 'pdf':
                $scope.$broadcast('export-pdf');
                break;
            case 'excel':
                $scope.$broadcast('export-excel');
                break;
            case 'doc':
                $scope.$broadcast('export-doc');
                break;
            case 'csv':
                $scope.$broadcast('export-csv');
                break;
            }
        }

        /**
         * Returns the recorder response by the user.
         */
        function getRecords() {
            return records;
        }

        /**
         * Reloads the page and redirects to the setup page.
         */
        function reset() {
            location.reload();
            $location.path('/');
        }
    }
})();

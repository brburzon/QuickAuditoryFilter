(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ListSnrCtrl
     * @description
     * # ListSnrCtrl
     * Controller of the qafApp
     */
    angular.module('qafApp')
        .controller('ListSnrCtrl', ListSnrCtrl);

    /** @ngInject */
    function ListSnrCtrl($scope, $window, $timeout) {
        var vm = this;

        vm.selected = -1;
        vm.promptUser = promptUser;
        vm.highlightSelected = highlightSelected;
        vm.removeSnr = removeSnr;

        function highlightSelected(selected) {
            if(vm.selected === selected) {
                vm.selected = -1;
            } else {
                vm.selected = selected;
            }
        }

        function promptUser() {
            var input = $window.prompt('Enter a value:'),
                snr = Number(input);
            if(input && !isNaN(snr)) {
                $timeout(function() {
                    vm.add({value:snr});
                }, 0, 1);
            } else {
                $window.alert('Input must be a number');
            }
        }

        function removeSnr(index) {
            if(vm.selected === -1) return;
            vm.remove({index:vm.selected});
            vm.selected = -1;
        }
    }

}());

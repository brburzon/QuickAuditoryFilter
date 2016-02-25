(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:keyboardListener
     * @description
     * # keyboardListener
     * Allows the user to use the keyboard to submit their response.
     */
    angular
        .module('qafApp')
        .directive('keyboardListener', keyboardListener);

    /** @ngInject */
    function keyboardListener($location) {
        return {
            scope: { submit: '&', play: '&', isEnable: '=', forUrl: '@' },
            restrict: 'E',
            link: postLink
        };

        /**
         * Links properties to a directive element.
         * @param {object} scope - same as $scope
         * @param {object} element - directive element
         * @param {object} attrs - directive attributes
         */
        function postLink(scope, element, attrs) {
            var ONE_KEY_CODE = 49,
                TWO_KEY_CODE = 50,
                THREE_KEY_CODE = 51,
                ENTER_KEY_CODE = 13;

            angular
                .element(document)
                .on('keypress', keyPressedListener);

            /**
             * Listens for keyboard presses. If there are no sounds playing,
             * and the key is a valid response, then submits it to the parent
             * scope.
             * @param {object} event - keyboard event
             */
            function keyPressedListener(event) {
                var keyCode = event.which || event.keyCode || event.charCode;

                if(!isOkToPress(keyCode))
                    return;

                switch(keyCode) {
                case ONE_KEY_CODE:
                    submitResponse(0);
                    break;
                case TWO_KEY_CODE:
                    submitResponse(1);
                    break;
                case THREE_KEY_CODE:
                    submitResponse(2);
                    break;
                case ENTER_KEY_CODE:
                    scope.$apply(scope.play());
                    ENTER_KEY_CODE = 'user is only allowed to press this once';
                    break;
                }
            }

            /**
             * Returns true if the user is in exercise page and no sound is playing
             * or user press ENTER; otherwise return false.
             * @param {number} keyCode - key code
             */
            function isOkToPress(keyCode) {
                return $location.path().indexOf(scope.forUrl) != -1
                    && scope.isEnable
                    || keyCode === ENTER_KEY_CODE;
            }

            /**
             * Takes a user response, and submits it to the parent scope.
             * @param {number} response - 0, 1, or 2
             */
            function submitResponse(response) {
                scope.$apply(scope.submit({ response: response }));
            }
        }
    }

})();

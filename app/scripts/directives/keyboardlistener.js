(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name qafApp.directive:keyboardListener
     * @description
     * # keyboardListener
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

        function postLink(scope, element, attrs) {
            var ONE_KEY_CODE = 49,
                TWO_KEY_CODE = 50,
                THREE_KEY_CODE = 51,
                ENTER_KEY_CODE = 13;

            angular
                .element(document)
                .on('keypress', keyPressedListener);

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
                    ENTER_KEY_CODE = 'only allowed to be chosen once';
                    break;
                }
            }

            function isOkToPress(keyCode) {
                if($location.path().indexOf(scope.forUrl) != -1 && scope.isEnable || keyCode === ENTER_KEY_CODE) 
                    return true;
                else
                    return false;
            }

            function submitResponse(response) {
                scope.$apply(scope.submit({ response: response }));
            }
        }
    }

})();

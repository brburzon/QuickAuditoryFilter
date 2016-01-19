'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
    .module('appApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ngFileUpload',
        'AngularPrint'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/setup.html',
                controller: 'SetupCtrl',
                controllerAs: 'vm'
            })
            .when('/exercise', {
                templateUrl: 'views/exercise.html',
                controller: 'ExerciseCtrl',
                controllerAs: 'vm'
            })
            .when('/result', {
              templateUrl: 'views/result.html',
              controller: 'ResultCtrl',
              controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

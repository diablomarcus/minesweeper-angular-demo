'use strict';

/* App Module */

var minesweeperApp = angular.module('minesweeperApp', [
  'ngRoute',

  'minesweeperControllers',
  'minesweeperFilters',
  'minesweeperServices',
  'minesweeperDirectives'
]);

minesweeperApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

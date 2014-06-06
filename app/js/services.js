'use strict';

/* Services */

var minesweeperServices = angular.module('minesweeperServices', ['ngResource']);

minesweeperServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

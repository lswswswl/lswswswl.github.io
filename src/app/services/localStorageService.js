(function() {
  'use strict';

  angular
    .module('ladies')
    .factory('localStorageService', function(appTitle) {
      return {
        setKeyValue: function(key, value) {
          var localStorageObj = localStorage.getItem(appTitle);
          localStorageObj = angular.fromJson(localStorageObj);
          localStorageObj[key] = value;
          localStorageObj = angular.toJson(localStorageObj);
          localStorage.setItem('ladies', localStorageObj);

          return localStorageObj;
        },
        getKey: function(key) {
          var localStorageObj = localStorage.getItem(appTitle);
          localStorageObj = angular.fromJson(localStorageObj);
          return localStorageObj[key];

        }
      }
    })
})();

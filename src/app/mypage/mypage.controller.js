/*global Firebase */
(function() {
  'use strict';

  angular
    .module('ladies')
    .controller('MypageController', MypageController);

  /** @ngInject */
  function MypageController(
    $firebaseObject, $firebaseAuth, $log, $state, toastr, $scope, $timeout,
    localStorageService
  ) {
    var vm = this;
  }
})();

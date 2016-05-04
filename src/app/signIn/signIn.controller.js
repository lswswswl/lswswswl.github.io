/*global Firebase */
(function() {
  'use strict';

  angular
    .module('ladies')
    .controller('SignInController', SignInController);

  /** @ngInject */
  function SignInController(
    $firebaseObject, $firebaseAuth, $log, $state, toastr, $scope, $timeout,
    localStorageService
  ) {
    var vm = this;

    var ref = new Firebase("https://ladies.firebaseio.com");
    var auth = $firebaseAuth(ref);

    vm.signUp = signUp;
    vm.signIn = signIn;

    function signUp() {
      auth.$createUser({
        email: vm.signupId,
        password: vm.signupPw
      }).then(function(userData) {
        localStorageService.setKeyValue('uid', userData.uid);
        localStorageService.setKeyValue('userId', vm.signupId);
        $state.go('home');

      }).catch(function(error) {
        $log.debug('ERROR', error);
      });
    }

    function signIn() {
      auth.$authWithPassword({
        email: vm.signupId,
        password: vm.signupPw
      }).then(function(authData) {
        localStorageService.setKeyValue('uid', authData.uid);
        localStorageService.setKeyValue('userId', vm.signupId);
        $state.go('home');
      }).catch(function(error) {
        $log.debug("Authentication failed:", error.message);
        var toast = toastr.error('아이디 / 비밀번호를 확인해 주세요', '정보가 일치하지 않습니다.', {
          closeButton: true,
          progressBar: false,
          timeOut: 1000,
          extendedTimeOut: 0,
          positionClass: 'toast-top-center',
          hideDuration: 0
        });
        toastr.clear(toast);

      });

    }

  }
})();

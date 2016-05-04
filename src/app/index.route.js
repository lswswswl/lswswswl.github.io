(function() {
  'use strict';

  angular
    .module('ladies')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('signIn', {
        url: '/signIn',
        templateUrl: 'app/signIn/signIn.html',
        controller: 'SignInController',
        controllerAs: 'signIn'
      })
      .state('mypage', {
        url: '/mypage',
        templateUrl: 'app/mypage/mypage.html',
        controller: 'MypageController',
        controllerAs: 'Mypage'
      });

    //$urlRouterProvider.otherwise('/mypage');
    $urlRouterProvider.otherwise('/');
  }

})();

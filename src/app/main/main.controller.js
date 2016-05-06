/*global Firebase */
(function() {
  'use strict';

  angular
    .module('ladies')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(
    $firebaseAuth, $firebaseObject, $firebaseArray, $log, $state, $scope,
    localStorageService, MainModel, firebaseURL
  ) {

    // ----------------- Initialize ----------------------//
    var vm = this;

    vm.model = MainModel;
    vm.model.myId = localStorageService.getKey('userId');
    vm.navbarCollapsed = true;
    vm.randomAvatar = 'assets/images/avartar' + (Math.floor(Math.random() * 4) + 1) + '.png';

    var ref = new Firebase(firebaseURL);
    var restroomObj = $firebaseObject(ref.child('restroom'));
    vm.actionArray = $firebaseArray(ref.child('action'));

    restroomObj.$bindTo($scope, "restroom").then(function() {
      if($scope.restroom.status === angular.undefined) {
        $scope.restroom.status = false;
      }
      //$scope.data.foo = "baz";  // will be saved to the database
      //ref.set({ status: "true" });  // this would update the database and $scope.data
    });

    if(!localStorageService.getKey('uid')) {
      $log.debug('no uid');
      $state.go('signIn');
    } else {
      $log.debug(localStorageService.getKey('uid'));
      $state.go('home');
    }

    getTodayHistory();

    // ----------------- Declare ----------------------------//

    vm.useRestRoom = useRestRoom;
    vm.doneUsingRestRoom = doneUsingRestRoom;
    vm.leaveMessage = leaveMessage;
    //vm.test = test;
    //vm.test();

    // ----------------- Implement---------------------------//

    function getTodayHistory() {

      var ref = new Firebase(firebaseURL + '/action');
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      today = today.getTime();

      ref.orderByChild('startAt').startAt(today).on('value', function(snapshot) {
        vm.historyArray = [];
        snapshot.forEach(function(data) {
          $log.debug('data ::: ', data.val());
          vm.historyArray.push(data.val());
        });
      })

      $log.debug('vm.historyArray ::: ', vm.historyArray);
    }

    function useRestRoom() {
      /* update restroom */
      $scope.restroom.status = true;
      $scope.restroom.occupiedBy = localStorageService.getKey('userId');

      /* create new action item*/
      vm.actionArray.$add({
        user: localStorageService.getKey('userId'),
        startAt: Firebase.ServerValue.TIMESTAMP
      }).then(function(ref) {
        var id = ref.key();
        $scope.restroom.actionId = id;
      });
    }

    function doneUsingRestRoom() {
      /* update action item finishAt */
      var actionArrayIdx = vm.actionArray.$indexFor($scope.restroom.actionId);
      vm.actionArray[actionArrayIdx].finishAt = Firebase.ServerValue.TIMESTAMP;

      vm.actionArray.$save(actionArrayIdx)
      .then(function(ref) {
        ref.key() === vm.actionArray[actionArrayIdx].$id;
      })
      .then(function() {
        vm.actionArray[actionArrayIdx].useTime = vm.actionArray[actionArrayIdx].finishAt - vm.actionArray[actionArrayIdx].startAt;
        vm.actionArray.$save(actionArrayIdx);
      });

      /* update restroom */
      $scope.restroom.status = false;
      $scope.restroom.occupiedBy = '';
      $scope.restroom.message = '';
      $scope.restroom.actionId = '';
    }

    function leaveMessage(message) {

      if(message) {
        /* update restroom with message, when restroom.status is false*/
        if(!$scope.restroom.status) {
          $scope.restroom.status = true;
          $scope.restroom.occupiedBy = localStorageService.getKey('userId');
          $scope.restroom.message = message;

          vm.actionArray.$add({
            user: localStorageService.getKey('userId'),
            startAt: Firebase.ServerValue.TIMESTAMP,
            message: message
          }).then(function(ref) {
            var id = ref.key();
            $scope.restroom.actionId = id;
            vm.actionArray.$save(actionArrayIdx);
          });
        } else {
          /* update restroom with message, when restroom.status is true*/
          $scope.restroom.message = message;
          var actionArrayIdx = vm.actionArray.$indexFor($scope.restroom.actionId);
          vm.actionArray[actionArrayIdx].message = message;
          vm.actionArray.$save(actionArrayIdx).then(function(ref) {
            ref.key() === vm.actionArray[actionArrayIdx].$id;
          });
        }
        vm.message = '';
      }
    }

  }
})();

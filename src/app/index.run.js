(function() {
  'use strict';

  angular
    .module('ladies')
    .run(runBlock);

  /** @ngInject */
  function runBlock(
    localStorageService,
    $log
  ) {
    if(!localStorage.getItem('ladies')) {
      localStorage.setItem('ladies', '{}');
    }

    $log.debug('runBlock end');
  }

})();

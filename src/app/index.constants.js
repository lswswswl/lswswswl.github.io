/* global moment:false */
(function() {
  'use strict';

  angular
    .module('ladies')
    .constant('appTitle', 'ladies')
    .constant('firebaseURL', 'https://ladies.firebaseio.com')
    .constant('moment', moment);
})();

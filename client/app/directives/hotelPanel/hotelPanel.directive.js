'use strict';
const angular = require('angular');

export default angular.module('almundoApp.directives', [])
  .directive('hotelPanel', function() {
    return {
      template: require('./hotelPanel.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;

'use strict';

describe('Directive: hotelPanel', function() {
  // load the directive's module and view
  beforeEach(module('almundoApp.directives.hotelPanel'));
  beforeEach(module('app/directives/hotelPanel/hotelPanel.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<hotel-panel></hotel-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the hotelPanel directive');
  }));
});

'use strict';

describe('Service: hotel', function() {
  // load the service's module
  beforeEach(module('almundoApp.hotel'));

  // instantiate service
  var hotel;
  beforeEach(inject(function(_hotel_) {
    hotel = _hotel_;
  }));

  it('should do something', function() {
    expect(!!hotel).to.be.true;
  });
});

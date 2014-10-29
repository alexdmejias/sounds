'use strict';

describe('Service: Playing', function () {

  // load the service's module
  beforeEach(module('soundsApp'));

  // instantiate service
  var Playing;
  beforeEach(inject(function (_Playing_) {
    Playing = _Playing_;
  }));

  it('should do something', function () {
    expect(!!Playing).toBe(true);
  });

});

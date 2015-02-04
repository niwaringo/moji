var assert = require('assert');
var Hazec = require('../src/hazec.js');
describe('Hazec', function(){
  it('hello', function(){
    var hazec = new Hazec();
    assert.strictEqual(hazec.hello(), 'hello');
  });
});

var assert = require('assert');
var mojic = require('../src/mojic.js');
describe('mojic', function(){
  it('ztoh', function(){
    assert.strictEqual(
      mojic('１２３４５６７８９10').ztoh().toString(),
      '12345678910');
  });
});

var assert = require('assert');
var mojic = require('../src/hazec.js');
describe('mojic', function(){
  it('ftoh', function(){
    assert.strictEqual(
      mojic('１２３４５６７８９10').convert('ftoh').toString(),
      '12345678910');
  });
});

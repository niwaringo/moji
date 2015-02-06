var assert = require('assert');
var moji = require('../src/moji.js');
describe('moji', function(){
  it('zetohe', function(){
    assert.strictEqual(
      moji('ＡＢＣＤ０１２３４').convert('ze', 'he').toString(),
      'ABCD01234');
  });

  it('hetoze', function(){
    assert.strictEqual(
      moji('ABCD01234').convert('he', 'ze').toString(),
      'ＡＢＣＤ０１２３４');
  });

  it('hgtokk', function(){
    assert.strictEqual(
      moji('あいうえお').convert('hg', 'kk').toString(),
      'アイウエオ');
  });

  it('kktohg', function() {
    assert.strictEqual(
      moji('アイウエオ').convert('kk', 'hg').toString(),
      'あいうえお');
  });
});

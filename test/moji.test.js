var assert = require('assert');
var Moji = require('../src/moji.js');
describe('moji', function(){
  it('zetohe', function(){
    assert.strictEqual(
      new Moji('ＡＢＣＤ０１２３４').convert('ZE', 'HE').toString(),
      'ABCD01234');
  });

  it('hetoze', function(){
    assert.strictEqual(
      new Moji('ABCD01234').convert('HE', 'ZE').toString(),
      'ＡＢＣＤ０１２３４');
  });

  it('hgtokk', function(){
    assert.strictEqual(
      new Moji('あいうえお').convert('HG', 'KK').toString(),
      'アイウエオ');
  });

  it('kktohg', function() {
    assert.strictEqual(
      new Moji('アイウエオ').convert('KK', 'HG').toString(),
      'あいうえお');
  });

  it('zktohk', function() {
    var zk = Moji.mojisyu('ZK').list.join('');
    var hk = Moji.mojisyu('HK').list.join('');
    assert.strictEqual(
      new Moji(zk).convert('ZK', 'HK').toString(),
      hk);
  });

  it('hktozk', function() {
    var hk = Moji.mojisyu('HK').list.join('');
    var zk = Moji.mojisyu('ZK').list.join('');
    assert.strictEqual(
      new Moji(hk).convert('HK', 'ZK').toString(),
      zk);
  });

  it('複数の文字種を一括置換', function() {
    assert.strictEqual(
      new Moji('ｱｲｳｴｵ').convert(['HK', 'ZK'], ['KK', 'HG']).toString(),
      'あいうえお');
  });
});

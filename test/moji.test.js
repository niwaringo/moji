var assert = require('assert');
var Moji = require('../src/moji.js');
describe('moji', function(){
  it('全角英数から半角英数', function(){
    assert.strictEqual(
      new Moji('ＡＢＣＤ０１２３４').convert('ZE', 'HE').toString(),
      'ABCD01234');
  });

  it('全角スペースを半角スペースに', function() {
    assert.strictEqual(
      new Moji('　').convert('ZS', 'HS').toString(),
      ' ');
  });

  it('半角スペースを全角スペースに', function() {
    assert.strictEqual(
      new Moji(' ').convert('HS', 'ZS').toString(),
      '　');
  });

  it('半角英数から全角英数', function(){
    assert.strictEqual(
      new Moji('ABCD01234').convert('HE', 'ZE').toString(),
      'ＡＢＣＤ０１２３４');
  });

  it('ひらがなからカタカナ', function(){
    assert.strictEqual(
      new Moji('あいうえお').convert('HG', 'KK').toString(),
      'アイウエオ');
  });

  it('カタカナからひらがな', function() {
    assert.strictEqual(
      new Moji('アイウエオ').convert('KK', 'HG').toString(),
      'あいうえお');
  });

  it('全角カナから半角カナ', function() {
    var zk = Moji.mojisyu('ZK').list.join('');
    var hk = Moji.mojisyu('HK').list.join('');
    assert.strictEqual(
      new Moji(zk).convert('ZK', 'HK').toString(),
      hk);
  });

  it('半角カナから全角カナ', function() {
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

  it('trim', function() {
    assert.strictEqual(
      new Moji('　あ　あ　あ　').trim().convert('HG', 'KK').toString(),
      'ア　ア　ア');
  });

  it('filter range', function() {
    assert.strictEqual(
      new Moji('abcあいうアイウ123').filter('HG'),
      'あいう');
  });

  it('filter regexp', function() {
    var hk = Moji.mojisyu('HK').list.join('');
    var zk = Moji.mojisyu('ZK').list.join('');
    assert.strictEqual(
      new Moji(hk + 'abcあいう123' + zk).filter('ZK'),
      zk);
  });

  it('reject range', function() {
    assert.strictEqual(
      new Moji('abcあいうアイウ123').reject('HG'),
      'abcアイウ123');
  });

  it('reject regexp', function() {
    var hk = Moji.mojisyu('HK').list.join('');
    var zk = Moji.mojisyu('ZK').list.join('');
    assert.strictEqual(
      new Moji(hk + zk + 'abcあいう123').reject('ZK'),
      hk + 'abcあいう123');
  });
});

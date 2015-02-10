var Moji = require('../src/moji.core.js');
var assert = require('assert');

describe('moji.core', function(){
  it('set mojisyu', function() {
    var ze = {start:0xff01, end:0xff5e};
    Moji.mojisyu('ZE', ze);

    assert.strictEqual(ze.toString(), new Moji().MOJISYU.ZE.toString());
  });

  it('read mojisyu', function() {
    var ze = {start:0xff01, end:0xff5e};
    Moji.mojisyu('ZE', ze);

    assert.strictEqual(ze.toString(), Moji.mojisyu('ZE').toString());
  });

  it('read all mojisyu', function() {
    var ze = {start:0xff01, end:0xff5e};
    var he = {start:0x0021, end:0x007e};
    var obj = {ZE: ze, HE: he};

    Moji.mojisyu('ZE', ze);
    Moji.mojisyu('HE', he);

    assert.strictEqual(obj.toString(), Moji.mojisyu().toString());
  });
});

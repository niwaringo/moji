var moji = require("../src/moji");
var assert = require("assert");

describe("moji_str", function() {
    it('trim', function () {
        assert.strictEqual(
            moji('　あ　あ　あ　').trim().convert('HG', 'KK').toString(),
            'ア　ア　ア');
    });

    it('match', function () {
        assert.strictEqual(
            moji('あいうえおあ').convert('HG', 'KK').match("イウエオ").toString(),
            'イウエオ');

        assert.strictEqual(
            moji('あいうえおあ').convert('HG', 'KK').match("イウオ").toString(),
            'アイウエオア');

        assert.strictEqual(
            moji('あいうえおあ').convert('HG', 'KK').match("").toString(),
            'アイウエオア');
    });

    it('replace', function () {
        assert.strictEqual(
            moji('あああ').replace("あああ", "いいい").convert('HG', 'KK').toString(),
            'イイイ');
    });
});


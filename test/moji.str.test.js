var moji = require("../src/moji");
var assert = require("assert");

describe("moji_str", function() {
    it('trim', function () {
        assert.strictEqual(
            moji('　あ　あ　あ　').trim().convert('HG', 'KK').toString(),
            'ア　ア　ア');
    });

});

